(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams,
                                   $location,
                                   currentUser,
                                   websiteService) {
        var model = this;

        model.userId = currentUser._id;
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
                    $location.url('/website');
                });
        }

        function updateWebsite(isValid, website, websiteId) {
            model.submitted = true;
            if (isValid) {
                websiteService
                    .updateWebsite(websiteId, website)
                    .then(function (website) {
                        $location.url('/website');
                    });

            }
            else {
                model.error = 'One or more fields are required';
            }
        }
    }
})();