(function () {
    angular
        .module('wamDirectives',[])
        .directive('wamSortable', wamSortable);

    function wamSortable($http) {
        return{
            link: linkFunction
        }
    }
    function linkFunction(scope, element) {
        $(element)
            .sortable({
                start: function(event, ui){
                    var start = ui.item.index()},

                stop: function(event, ui) {
                    $http.put(ui.item.index());
                    }})
            .then()
    }


})();