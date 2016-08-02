var myApp = angular.module("myApp", ['templates','ngRoute','angular-nicescroll']);
myApp.controller('myCtrl',function($scope, $http){
	$http.get('api/webticket.json').success(function(data){
		$scope.list = data.webticket;
	});
})	
////////////
myApp.controller('newController',function($scope, $http){
	$scope.test = "trang test"
})
////////////
myApp.controller('mainController',function($scope, $http){
	
})
myApp.controller('galleryController',function($scope, $http){
	$scope.$on('$viewContentLoaded', initimg);
})
myApp.controller('aboutController',function($scope, $http){
	
})

