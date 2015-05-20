angular.module('DealsCtrl', []).controller('DealsController', function($http, $scope) {

	$scope.deals = [];
	$scope.page = 0;

	$scope.loadDeals = function(page){

		page = page || 0;

		$http({
			url: '/api/deals/', 
			method: "GET",
			params: {page: page}
		})
		.success(function(deals){
			
			for(deal in deals){
				$scope.deals.push(deals[deal]);
			}

			$scope.page++;

		})
		.error(function(err){
			alert(err);
		});
		
	};

	$scope.loadDeals();

});