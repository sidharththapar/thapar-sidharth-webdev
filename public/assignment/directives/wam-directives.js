(function () {
    angular
        .module('wamDirectives',[])
        .directive('wamSortable', wamSortable);

    function wamSortable($routeParams, widgetService) {
        return{
            link: linkFunction
        };
        function linkFunction(scope, element) {
            var pageId = $routeParams.pageId;
            var start = -1;
            var end = -1;
            $(element)
                .sortable({
                    start: function (event, ui) {
                        start = ui.item.index();
                    },

                    stop: function (event, ui) {
                        end = ui.item.index();
                        widgetService
                            .reorderWidget(pageId, start, end);
                    }
                });
        }
    }



})();