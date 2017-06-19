(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);
    
    function pageNewController($routeParams,
                               $location,
                               pageService) {
        var model = this;

        model.websiteId = $routeParams['websiteId'];
        model.createPage = createPage;

        function init() {

            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(renderPages);
        }
        init();

        function renderPages(pages) {
            model.pages = pages;
        }

        function createPage(isValid, newPage) {
            model.submitted = true;
            if (isValid) {
                pageService
                    .createPage(model.websiteId, newPage)
                    .then(function (page) {
                        $location.url('/website/'+model.websiteId+'/page');
                    });
            }
            else {
                model.error = 'One or more fields are required';
            }
        }
    }
})();