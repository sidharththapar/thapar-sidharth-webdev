(function () {
    angular
        .module('wamDirectives',[])
        .directive('wamSortable', wamSortable);

    function wamSortable() {
        return{
            link: linkFunction
        }
    }
    function linkFunction(scope, element) {
        $(element).sortable({
            start: function(event, ui){
                var start = ui.item.index()},

            stop: function(event, ui) {
                var end = ui.item.index();
            }});
    }


})();