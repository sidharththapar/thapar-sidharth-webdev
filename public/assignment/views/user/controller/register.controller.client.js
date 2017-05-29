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

            var found = userService.findUserByUsername(username);

            if(found !== null) {
                model.error = "sorry, that username is taken";
            } else {
                var newUser = {
                    username: username,
                    password: password
                };
                newUser = userService.createUser(newUser);
                $location.url('/user/' + newUser._id);
            }
        }
    }
})();