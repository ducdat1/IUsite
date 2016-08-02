myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/',{
    	templateUrl: 'main/main.html',
    	controller: 'mainController'
    })    
    .when('/new', {
      templateUrl: 'main/new.html',
      controller: 'newController'
    })
    .when('/gallery',{
      templateUrl: 'main/gallery.html',
      controller: 'galleryController'
    })
     .when('/video',{
      templateUrl: 'main/video.html',
      controller: 'videoController'
    })
     .when('/biography',{
      templateUrl: 'main/biography.html',
      controller: 'bioController'
    })
    .when('/about',{
      templateUrl: 'main/about.html',
      controller: 'aboutController'
    })
    .when('/forum',{
      templateUrl: 'main/about.html',
      controller: 'aboutController'
    })
}]);