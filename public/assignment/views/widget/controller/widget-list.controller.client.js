(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce, widgetService, $routeParams) {
        var model = this;

        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;
        //model.widgetEditUrl = widgetEditUrl;

        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(renderWidgets);
        }
        init();

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }

        function widgetUrl(widget) {
            var widgetType = widget.type;
            var url = 'views/widget/templates/widget-'+widgetType.toLowerCase()+'.view.client.html';
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