const app = require('../../express');
var websiteModel = require('../model/website/website.model.server');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.get    ("/api/assignment/user/:userId/website", findAllWebsitesForUser);
app.get    ("/api/assignment/website/:websiteId", findWebsiteById);
app.post   ('/api/assignment/user/:userId/website', createWebsiteForUser);
app.put    ('/api/assignment/website/:websiteId', updateWebsite);
app.delete ('/api/assignment/user/:userId/website/:websiteId', deleteWebsite);

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var userId = req.params.userId;
    websiteModel
        .deleteWebsite(userId, websiteId)
        .then(function (status) {
            res.json(status);
        });
}

function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params.websiteId;
    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.json(status);
        });
}

function createWebsiteForUser(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website);
        });
}

function findAllWebsitesForUser(req, res) {
    websiteModel
        .findAllWebsitesForUser(req.params.userId)
        .then(function (websites) {
            res.json(websites);
        })
}


function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        })
}

