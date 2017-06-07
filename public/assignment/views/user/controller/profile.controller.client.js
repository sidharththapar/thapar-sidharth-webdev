(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;

        model.userId = $routeParams.userId;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;


        userService
            .findUserById(model.userId)
            .then(renderUser, userError);

        function renderUser (user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found";
        }

        function updateUser(user) {
            userService
                .updateUser(model.userId, user)
                .then(function () {
                    model.message = 'User Updated Successfully!'
                });
        }

        function deleteUser(user) {
            userService
                .deleteUser(model.userId)
                .then(function() {
                    $location.url('/login');
                }, function() {
                    model.error = 'Unregister Failed!'
                });
        }
    }
})();