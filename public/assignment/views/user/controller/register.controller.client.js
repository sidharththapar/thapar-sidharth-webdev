(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;
        model.register = register;

        function register(isValid, username, password, password2) {
            model.submitted = true;
            if (isValid) {
                if(password !== password2) {
                    model.error = "passwords must match";
                    return;
                }

                userService
                    .findUserByUsername(username)
                    .then(
                        function (user) {
                            model.error = "Sorry, "+username+" is taken";
                        },
                        function (response) {
                            var newUser = {
                                username: username,
                                password: password
                            };
                            return userService
                                .register(newUser)
                                .then(function () {
                                    $location.url('/profile');
                                });
                        }
                    )
            }
            else {
                model.error = 'One or more fields are required';
            }
        }
    }
})();