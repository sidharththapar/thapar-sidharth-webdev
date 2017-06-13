var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);
var websiteModel = require('../website/website.model.server');

// api

pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.createPage = createPage;
pageModel.findAllPages = findAllPages;
pageModel.findPageById = findPageById;
pageModel.deletePage = deletePage;
pageModel.updatePage = updatePage;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;

module.exports = pageModel;

function deleteWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}

// userId is the parent
// websiteId is the child
function addWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}

function updatePage(pageId, newPage) {
    return pageModel.update({_id: pageId}, {$set: newPage});
}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website')
        .exec();
}

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteId, page._id);
       })
}

function deletePage(websiteId, pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (status) {
            return websiteModel
                .deletePage(websiteId, pageId);
        })
}

function findAllPages() {
    return pageModel.find();
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}
