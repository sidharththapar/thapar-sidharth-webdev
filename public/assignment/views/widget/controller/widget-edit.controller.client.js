(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($sce, widgetService, $routeParams) {
        var model = this;

        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetEditUrl = widgetEditUrl;

        model.websiteId = $routeParams['websiteId'];
        model.userId = $routeParams['userId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;


        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(renderWidgets);

            widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget)
        }
        init();

        function deleteWidget(widgetId) {
            widgetService
                .deleteWidget(widgetId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }

        function updateWidget(widget, widgetId) {
            widget._id = widgetId;
            widget.pageId = model.pageId;
            widgetService
                .updateWidget(widget)
                .then(function (page) {
                    $location.url('/user/'+ model.userId +'/website/'+model.websiteId+'/page'+model.pageId+'/widget');
                });
        }

        function renderWidget(widget) {
            model.widget = widget;
        }

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }

        function widgetEditUrl(widgetId) {
            var url = 'views/widget/templates/widget-'+
                    model.widget.widgetType.toLowerCase()+'-edit.view.client.html';
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