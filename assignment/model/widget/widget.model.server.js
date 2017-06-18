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
    var widgetName = widgetModel.find({order: start})
        .then(function (res) {
            return res.name;
        });

    console.log(widgetName);
    if (start < end) {
        return widgetModel
            .updateMany({$and: [{order: {$gt: start}}, {order: {$lte: end}}]}, {$inc: {order: -1}})
            .then(function (res) {
                return widgetModel
                    .update({name: widgetName}, {$set: {order: end}})
            });
    } else {
        return widgetModel
            .updateMany({$and: [{order: {$gte: end}}, {order: {$lt: start}}]}, {$inc: {order: 1}})
            .then(function (res) {
                return widgetModel
                    .update({name: widgetName}, {$set: {order: end}})
            });
    }
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
