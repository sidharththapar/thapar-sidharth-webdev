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

module.exports = widgetModel;

function updateWidget(widgetId, newWidget) {
    return widgetModel.update({_id: widgetId}, {$set: newWidget});
}

function findAllWidgetsForPage(pageId) {
    return widgetModel
        .find({_page: pageId});
}

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (widget) {
            return pageModel
                .addWidget(pageId, widget._id);
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
