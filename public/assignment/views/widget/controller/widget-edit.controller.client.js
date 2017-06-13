(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($sce, widgetService, $routeParams, $location) {
        var model = this;

        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetEditUrl = widgetEditUrl;

        model.websiteId = $routeParams['websiteId'];
        model.userId = $routeParams['userId'];
        model.pageId = $routeParams['pageId'];
        if($routeParams.widgetId === undefined){
            model.widgetType = $routeParams['widgetType'];
        }else{
            model.widgetId = $routeParams['widgetId'];
        }

        model.createWidget = createWidget;
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;
        model.openFlickrSearch = openFlickrSearch;

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(renderWidgets);

            if(model.widgetId !== undefined){
                widgetService
                    .findWidgetById(model.widgetId)
                    .then(renderWidget)
            }
        }
        init();

        function openFlickrSearch() {
            $location.path("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/search");
        }

        function deleteWidget() {
            widgetService
                .deleteWidget(model.pageId, model.widgetId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }

        function updateWidget(widget, widgetId) {
            widget._page = model.pageId;
            widgetService
                .updateWidget(widgetId, widget)
                .then(function (page) {
                    $location.url('/user/'+ model.userId +'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }

        function createWidget(newWidget) {
            newWidget.type = model.widgetType.toUpperCase();
            widgetService
                .createWidget(model.pageId, newWidget)
                .then(function (widget) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+ model.pageId+'/widget');
                });
        }

        function renderWidget(widget) {
            model.widget = widget;
        }

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }

        function widgetEditUrl(widgetId) {
            if ($routeParams['widgetId'] === undefined){
                var url = 'views/widget/templates/widget-'+
                    model.widgetType.toLowerCase()+'-edit.view.client.html';
            }
            if($routeParams['widgetType'] === undefined){
                var url = 'views/widget/templates/widget-'+
                    model.widget.type.toLowerCase()+'-edit.view.client.html';
            }
            return url;
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }
    }
})();