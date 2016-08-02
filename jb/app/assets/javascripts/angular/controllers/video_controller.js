myApp.controller('videoController', function($scope,$route){
          $scope.playlist = function(){
		var video_player = $("#vid-content");
		var video = $("#vid-content video");
		var video_links = $("#listvideo li");
		var source = $("#vid-content video source");

		$("#listvideo li").on("click", function() {
		       video.removeAttr('src');
		       video.attr({src: "video/video/"+$(this).attr("title")});
		});		
     	};
     	$scope.$on('$viewContentLoaded', videoresize);		
 });