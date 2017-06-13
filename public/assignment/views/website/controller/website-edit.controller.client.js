(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);

            websiteService
                .findWebsiteById(model.websiteId)
                .then(renderWebsite);
        }
        init();

        function renderWebsite(website) {
            model.website = website;
        }

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(model.userId, websiteId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                });
        }

        function updateWebsite(website, websiteId) {
            websiteService
                .updateWebsite(websiteId, website)
                .then(function (website) {
                    $location.url('/user/'+ model.userId +'/website');
                });

        }
    }
})();