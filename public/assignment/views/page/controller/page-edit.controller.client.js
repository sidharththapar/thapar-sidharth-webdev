(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);
    
    function pageEditController($routeParams,
                                $location,
                                pageService) {
        var model = this;

        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(renderPages);

            pageService
                .findPageById(model.pageId)
                .then(renderPage);
        }
        init();

        function renderPage(page) {
            model.page = page;
        }

        function renderPages(pages) {
            model.pages = pages;
        }

        function deletePage(pageId) {
            pageService
                .deletePage(model.websiteId, pageId)
                .then(function () {
                    $location.url('/website/'+model.websiteId+'/page');
                });
        }

        function updatePage(isValid, page, pageId) {
            model.submitted = true;
            if (isValid) {
                pageService
                    .updatePage(pageId, page)
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