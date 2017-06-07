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


        function updateWidget(widget) {
            var url = "/api/assignment/widget/"+widget._id;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWidget(widget) {
            var url = "/api/assignment/page/"+widget.pageId+"/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });
            //     });
            // widget._id = (new Date()).getTime() + "";
            // widgets.push(widget);
        }

        function deleteWidget(widgetId) {
            var url = "/api/assignment/widget/"+widgetId;
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
