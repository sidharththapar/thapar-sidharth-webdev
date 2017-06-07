(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);
    
    function pageEditController($routeParams,
                                   $location,
                                   pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
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
                .deletePage(pageId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });
        }

        function updatePage(page, pageId) {
            page._id = pageId;
            page.websiteId = model.websiteId;
            pageService
                .updatePage(page)
                .then(function (website) {
                    $location.url('/user/'+ model.userId +'/website/'+model.websiteId+'/page');
                });
        }
    }
})();