(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,
                                   currentUser,
                                   $location,
                                   websiteService) {
        var model = this;
        model.userId = currentUser._id;
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function createWebsite(newWebsite) {
            //newWebsite.developerId = model.userId;
            websiteService
                .createWebsiteForUser(model.userId, newWebsite)
                .then(function (status) {
                    $location.url('/website');
                });
        }
    }
})();