(function() {

	angular.module('MainCtrl', []).controller('MainController', function($location, $http, $scope, sharedDeal) {

		$scope.doShuffle = function(){

			$http.post('/api/deals')
			.success(function(data) {
				sharedDeal.set(data);
				$location.path('/deal/' + data.id);
			})
			.error(function(data) {
				alert(data);
			});
		};

	});

})();
