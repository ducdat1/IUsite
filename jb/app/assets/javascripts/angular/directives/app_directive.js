myApp.directive("navBar", function(){
	return {
		restrict: 'E',
		templateUrl: 'core/navbar.html',
			link: function(){

			}
	};
});
myApp.directive("footer", function(){
	return{
		restrict: 'E',
		templateUrl: 'core/footer.html',
			link: function(){
				
			}
	}
})
myApp.directive("music", function(){
	return{
		restrict: 'E',
		templateUrl: 'core/music.html',
			link: function(){
				
			}
	}
})