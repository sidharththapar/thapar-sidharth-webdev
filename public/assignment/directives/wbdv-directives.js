(function () {
    angular
        .module('wbdvDirectives',[])
        .directive('wdDraggable', wdDraggable);

    function wdDraggable() {
        return{
            link: linkFunction
        }
    }
    function linkFunction(scope, element) {
        $(element).sortable();
    }


})();