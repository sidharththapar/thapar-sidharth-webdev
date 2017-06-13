var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

// api

widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgets = findAllWidgets;
widgetModel.findWidgetById = findWidgetById;
widgetModel.deleteWidget = deleteWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function reorderWidget(pageId, start, end) {

    return widgetModel
        .find({order: start})
        .then(function (widget) {
            console.log(widget);
            widgetModel
                .updateMany({order: {$gt: end}}, {$inc: {order: 1}})
                .then(function (response) {
                    //console.log(response);
                    widgetModel
                        .updateMany({order: {$gt: start}}, {$inc: {order: -1}})
                        .then(function (response) {
                            //console.log(response);
                            widgetModel
                                .update({_id: widget._id}, {$set: {order: end}})
                        })
                })
        });
}


function updateWidget(widgetId, newWidget) {
    return widgetModel
        .update({_id: widgetId}, {$set: newWidget});
}

function findAllWidgetsForPage(pageId) {
    return widgetModel
        .find({_page: pageId})
        .sort( { order: 1 } );
}

function createWidget(pageId, widget) {
    widget._page = pageId;

    return widgetModel
        .count()
        .then(function (order) {
            widget.order = order;
            return widgetModel
                .create(widget)
                .then(function (widget) {
                    return pageModel
                        .addWidget(pageId, widget._id);
                    })
        });
}

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel
                .deleteWidget(pageId, widgetId);
        });
}

function findAllWidgets() {
    return widgetModel.find();
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}
