(
  function () {
    angular
    .module('tokenLoan')
    .config(function($routeProvider, NotificationProvider){
      $routeProvider
      .when("/home", {
        controller: 'mainCtrl',
        templateUrl: 'partials/main.html'
      })
      .when("/loan-request/:id", {
          controller: 'loanRequestCtrl',
          templateUrl: 'partials/loan-request.html'
      })     
      .otherwise({
        redirectTo: '/home'
      });

      NotificationProvider.setOptions({
        delay: 3000,
        horizontalSpacing: 60
      });
    });
  }
)();
