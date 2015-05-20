angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {


	$routeProvider

		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainController'
		})

		.when('/deal/:id', {
			templateUrl: 'views/deal.html',
			controller: 'DealController'
		})

		.when('/deals/', {
			templateUrl: 'views/deals.html',
			controller: 'DealsController'
		})

	$locationProvider.html5Mode(true);

}]);