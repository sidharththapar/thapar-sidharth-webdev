(function () {
    angular
        .module('newsApp', [])
        .controller('newsController', newsController);
    
    function newsController($http) {
        var model = this;

        model.searchByTitle = searchByTitle;
        model.searchNewsDetails = searchNewsDetails;
        model.searchNewsByCategory = searchNewsByCategory;


        function searchNewsDetails(article) {
            model.article = article;
        }

        function searchNewsByCategory(category) {
            var url = ' https://newsapi.org/v1/articles?source='
                +category
                +'&sortBy=top&apiKey=32fabf41cbef4019b7e8c4b278ca168d';
            $http.get(url)
                .then(renderNews);
        }

        function searchByTitle(title) {
            var url = "http://www.omdbapi.com/?apikey=852159f0&s=" + title;
            $http.get(url)
                .then(renderMovies);
        }

        function renderNews(response) {
            console.log(response);
            model.news = response.data.articles;
        }

        function renderMovieDetails(response) {
            model.movie = response.data;
        }
    }
})();