(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController(currentUser,
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

        function createWebsite(isValid, newWebsite) {
            model.submitted = true;
            if (isValid) {
                websiteService
                    .createWebsiteForUser(model.userId, newWebsite)
                    .then(function (status) {
                        $location.url('/website');
                    });
            }
            else {
                model.error = 'One or more fields are required';
            }
        }
    }
})();