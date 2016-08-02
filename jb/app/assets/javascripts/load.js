$(document).ready(function() {
	/*menu page ----------------------------------------*/
	$(".menu-page ul li").click(function(event) {		
		$(".menu-page ul li").removeClass('active');
		$(this).addClass('active');
		// $(".menu-page .logo").css({display: 'none'});	
		// $(".menu-page .logo-b").css({display: 'block'});	
	});	
	// $(".logo-b").click(function() {
	// 	$(".menu-page ul li").css({opacity:0.5});
	// });
});
// d$(document).ready(function() {
// 	var hg = new File("/IU").listFiles().length; 
// 	console.log(hg);
// });