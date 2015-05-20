

angular.module('DealCtrl', []).controller('DealController', function($routeParams, $http, $scope, $location, sharedDeal) {

	var suits = ['spades', 'diams', 'hearts', 'clubs'];

	if(!sharedDeal.get()){

		$http.get('/api/deals/' + $routeParams.id)
		.success(function(data){
			$scope.info = data;
			$scope.deal = data.configuration;
			instanciate();
		})
		.error(function(err){
			alert(err);
		});

	} else {
		$scope.deal = sharedDeal.get().configuration;
		$scope.info = sharedDeal.get();
		instanciate();
	}

	function instanciate(){

		$scope.calculateRightPos = function (row, col) {
			
			var index = row * 13 + col;

			if(index === $scope.deal[index]){
				return 'rightPos';
			}
			else if(Math.floor($scope.deal[index] / 13) === row){
				return 'rightRow';
			}
			else if($scope.deal[index] % 13 === col){
				return 'rightCol';
			}

		}

		$scope.calculateSuit = function (index) {
			var number = $scope.deal[index];
			return suits[Math.floor(number/13)]; 
		}

		$scope.toSymbol = function (index) {
			var number = $scope.deal[index];
			return suits[Math.floor(number/13)]; 
		}

		$scope.calculateValue = function (index) {

			var number = $scope.deal[index];
			number = (number % 13) + 1;

			switch(number){

				case 1:
					number = 'A';
					break;
				case 11:
					number = 'J';
					break;
				case 12:
					number = 'Q';
					break;
				case 13:
					number = 'K';
					break;
			}

			return number;
		}

		$scope.range = function(min, max){

			var input = [];
			for (var i = min; i <= max; i++){
				input.push(i);
			}

			return input;
		};

	}


});