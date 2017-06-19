(function () {
    angular
        .module('WAM')
        .controller('FlickrImageSearchController', FlickrImageSearchController);


    function FlickrImageSearchController($sce, FlickrService, widgetService, $routeParams, $location) {

        var model = this;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.searchPhotos = searchPhoto;
        model.selectPhoto = selectPhoto;

        function searchPhoto(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var widget = {'url': url, 'type': 'IMAGE', width: '100%'};

            widgetService
                .createWidget(model.pageId, widget)
                .then(function () {
                    $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }
    }
})();
