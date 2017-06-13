(function () {
    angular
        .module('WAM')
        .service('widgetService', widgetService);

    function widgetService($http) {
        this.findAllWidgetsForPage = findAllWidgetsForPage;
        this.findWidgetById = findWidgetById;
        this.deleteWidget = deleteWidget;
        this.createWidget = createWidget;
        this.updateWidget = updateWidget;
        this.reorderWidget= reorderWidget;
        
        function reorderWidget(pageId, start, end) {
            var url = "/api/assignment/page/"
                +pageId
                +"/widget?index1="
                +start
                +"&index2="
                +end;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function updateWidget(widgetId, widget) {
            var url = "/api/assignment/widget/"+widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWidget(pageId, widget) {
            var url = "/api/assignment/page/"+pageId+"/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }


        function deleteWidget(pageId, widgetId) {
            var url = "/api/assignment/page/"+pageId+"/widget/"+widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(widgetId) {
            var url = "/api/assignment/widget/"+widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWidgetsForPage(pageId) {
            var url = "/api/assignment/page/"+ pageId + "/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
