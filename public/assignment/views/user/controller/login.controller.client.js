(function() {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService, $scope) {

        var model = this;

        model.login = login;

        //model.submitForm = submitForm;

        function login(isValid) {
            model.submitted = true;
            if (isValid) {
                userService
                    .login(model.username, model.password)
                    .then(function (found) {
                        $location.url('/profile');
                        }, function () {
                        model.error = "Wrong Credentials!";
                    });
            }
            else {
                model.error = 'One or more fields are required';
            }
        }

        // function submitForm(isValid) {
        //     if (isValid) {
        //         model.error = 'One or more fields are required';
        //     }
        //
        // }
        //
        // function login(isValid, username, password) {
        //     if (isValid) {
        //         model.error = 'One or more fields are required';
        //     }
        //     else{
        //         userService
        //             .login(username, password)
        //             .then(function (found) {
        //                 if(found !== null) {
        //                     $location.url('/profile');
        //                 } else {
        //                     model.message = "sorry, " + username + " not found. please try again!";
        //                 }
        //             },function(){
        //                 model.message = "Wrong Credentials!";
        //             });
        //     }
        //
        // }

    }
})();