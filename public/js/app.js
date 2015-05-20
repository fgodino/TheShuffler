(function(){

	var app = angular.module('theshuffler', ['ngRoute', 'appRoutes', 'MainCtrl', 'DealCtrl', 'DealsCtrl']);

	app.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

    app.filter('percentage', ['$filter', function ($filter) {
        return function (input, decimals) {
            return $filter('number')(input * 100, decimals) + '%';
        };
    }]);

    app.service('sharedDeal', function () {

        var deal;

        return {
            get: function () {
                return deal;
            },
            set: function(value) {
                deal = value;
            }
        };
    });

})();
