(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, currentUser, userService) {

        var model = this;

        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.unregisterUser = unregisterUser;


        // userService
        //     .findUserById(model.userId)
        //     .then(renderUser, userError);
        
        function init() {
            renderUser(currentUser);
        }
        init();

        function unregisterUser() {
            userService
                .unregister()
                .then(function () {
                    $location.url('#!/');
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function renderUser (user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found";
        }

        function updateUser(userId, user) {
            userService
                .updateUser(userId, user)
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