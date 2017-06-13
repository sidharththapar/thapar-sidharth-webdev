(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);
    
    function pageNewController($routeParams,
                                   $location,
                                   pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
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

        function createPage(newPage) {
            pageService
                .createPage(model.websiteId, newPage)
                .then(function (page) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });
        }
    }
})();