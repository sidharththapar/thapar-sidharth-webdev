(function () {
    angular
        .module('WAM')
        .controller('adminUsersController', adminUsersController);

    function adminUsersController(userService){
        var model = this;

        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.editUser = editUser;
        model.updateUser = updateUser;

        function init() {
            findAllUsers()
        }
        init();

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }

        function editUser(user) {
            model.user = angular.copy(user);
        }

        function createUser(user) {
            userService
                .createUser(user)
                .then(findAllUsers);
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(findAllUsers);
        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                });
        }
    }
})();
