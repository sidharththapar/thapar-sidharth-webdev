(function () {
    angular
        .module('WAM')
        .service('FlickrService', FlickrService);

    function FlickrService($http) {

        var key = "5d9ceb4fcf06d8143c1a140728c9ffbb";
        var secret = "c190b419d87ceb5e";
        var urlBase = "https://api.flickr.com/services/rest/" +
            "?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
        this.searchPhotos = searchPhotos;

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();
