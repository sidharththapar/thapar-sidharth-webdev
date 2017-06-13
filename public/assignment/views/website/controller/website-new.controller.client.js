(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
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
                    $location.url('/user/'+ model.userId +'/website');
                });
        }
    }
})();