const app = require('../../express');
var widgetModel = require('../model/widget/widget.model.server');

var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

app.post   ("/api/upload", upload.single('myFile'), uploadImage);
app.get    ('/api/assignment/page/:pageId/widget', findAllWidgetsForPage);
app.get    ("/api/assignment/widget/:widgetId", findWidgetById);
app.post   ('/api/assignment/page/:pageId/widget', createWidget);
app.put    ('/api/assignment/widget/:widgetId', updateWidget);
app.delete ('/api/assignment/page/:pageId/widget/:widgetId', deleteWidget);
app.put    ('/api/assignment/page/:pageId/widget', reorderWidget);

function reorderWidget(req, res) {
    var start = req.query.index1;
    var end = req.query.index2;
    var pageId = req.params.pageId;
    widgetModel
        .reorderWidget(pageId, start, end)
        .then(function (response) {
            res.json(response)
        });
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.json(status);
        });
}

function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widgetModel
        .createWidget(pageId,widget)
        .then(function (widget) {
            res.json(widget);
        });
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        });
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params.pageId;
    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
        });
}

function deleteWidget(req, res) {
    var widgetId= req.params.widgetId;
    var pageId = req.params.pageId;
    widgetModel
        .deleteWidget(pageId, widgetId)
        .then(function (status) {
            res.json(status);
        });
}

function uploadImage(req, res) {
    var widget = req.body;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var userId = req.body.userId;
    if(req.body.widgetId === null){
        var widgetId = (new Date()).getTime() + "";
    } else{
        var widgetId = req.body.widgetId;
    }

    var width         = req.body.width;
    var myFile        = req.file;

    var originalname  = myFile.originalname; // file name on user's computer

    var mimetype      = myFile.mimetype;
    console.log(mimetype.split('-')[1]);
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;

    var url = '/assignment/uploads/'+filename;
    widget.type = "IMAGE";
    widget.width = '100%';
    widget.url =  url;

    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            res.json(widget);
        });

    var callbackUrl   = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
    res.redirect(callbackUrl);
}
