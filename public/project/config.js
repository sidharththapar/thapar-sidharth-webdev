(function() {
    angular
        .module('WAM')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/templates/home.html',
                controller: 'mainController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/user', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminUsersController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'websiteListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId', {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'model'
            })
            .when('/website/:websiteId/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'pageNewController',
                controllerAs: 'model'
            })
            .when('/website/:websiteId/page/:pageId', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'pageEditController',
                controllerAs: 'model'
            })
            .when("/website/:websiteId/page/:pageId/widget/search", {
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'FlickrImageSearchController',
                controllerAs: 'model'
            })
            .when('/website/:websiteId/page/:pageId/widget', {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model'
            })
            .when('/website/:websiteId/page/:pageId/widget/new', {
                templateUrl: 'views/widget/templates/widget-choose.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model'
            })
            .when('/website/:websiteId/page/:pageId/widget/:widgetId', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'model'
            })
            .when('/website/:websiteId/page/:pageId/widget/new/:widgetType', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'model'
            });
    }

        function checkLoggedIn(userService, $q, $location) {
            var deferred = $q.defer();

            userService
                .loggedIn()
                .then(function (user) {
                    if(user === '0') {
                        deferred.reject();
                        $location.url('/login');

                    } else {
                        deferred.resolve(user);
                    }
                });

            return deferred.promise;
        }
    function checkCurrentUser($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .loggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(currentUser)
                }
            });
        return deferred.promise;
    }

    function checkAdmin($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkAdmin()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                    $location.url('/');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
})();
