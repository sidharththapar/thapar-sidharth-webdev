(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);
    
    function pageListController($routeParams, pageService) {
        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            model.pages = pageService.findAllPagesForWebsite(model.webId);
        }
        init();
    }
})();