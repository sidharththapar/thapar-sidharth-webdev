(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        model.register = register;

        function register(username, password, password2) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if(password === null || password === '' || typeof password === 'undefined'){
                model.error = 'password is required';
                return;
            }

            if(password2 === null || password2 === '' || typeof password2 === 'undefined'){
                model.error = 'please enter the password again for confirmation';
                return;
            }

            if(password !== password2) {
                model.error = "passwords must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(
                    function () {
                        model.error = "sorry, that username is taken";
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password
                        };
                        return userService
                            .createUser(newUser);
                    }
                )
                .then(function (user) {
                    $location.url('/user/' + user._id);
                });
        }
    }
})();