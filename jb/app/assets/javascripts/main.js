var _img = ["1.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg"]
$(function() {
	load1();
});
function load1(){
	var imgarray = [
				'img/'+ _img[0],
				'img/'+ _img[1],
				'img/'+ _img[2],
				'img/'+ _img[3],
				'img/'+ _img[4],
				'img/'+ _img[5],
				'img/'+ _img[6],
				'img/'+ _img[7],
				'img/'+ _img[8]
				];
	$("window").queload(imgarray,
		function(progress){

		},
		function(data_array){
			for(var i in data_array)
			{
				var tgurl = "img/"+_img[i];				
				$("#slide").append("<img src='"+tgurl+"' />");
			}
			slideStart(2000);
		});
}
function slideStart(time){
					$('#slide').fullslide({
					intval: 1000,
					speed: time
				});
	load2();
}
function load2(){
	$('#webTicker').webTicker();
}
function menubar(){
	
}