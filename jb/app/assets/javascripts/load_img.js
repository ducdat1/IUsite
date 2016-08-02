var photonum = 39;
var _randarr =[];
var _photolist = [];

function initimg(){
	randarr();
	getImage()
	for(i = 0;i<photonum;i++){
		$("#content").append("<div class = 'photo' id="+i+"><img src='"+(_photolist[_randarr[i]])+"' alt='test'></div>");
		// $("#"+i).css({top	: Math.random() * $( window ).height(),
		// 		  left	: Math.random() * $( window ).width()});
		
	}
	loadimg();
}
function randarr(){
	for(var i=0;i<photonum;i++){
		_randarr.push(i);
	}
	_randarr.sort(function() {
		return Math.random() - Math.random();
	});
}
function getImage(){
	for(var i = 1; i<= photonum;i++)
	{
		_photolist.push('IU/' +i+ '.jpg' );
	}
}
function loadimg() {
	$("#content .photo img").click(function() {
		var path = $(this).attr('src');
		$("#gallery #show-img .shadow").css("display","block");
		$("#gallery #show-img .box-img").css("display","block");
		$("#gallery #show-img .box-img").append("<img src='"+path+"' alt='test'>");
	});
	$("#show-img .shadow").click(function() {
		$("#gallery #show-img .box-img").css("display","none");
		$("#gallery #show-img .shadow").css("display","none");
		$("#gallery #show-img .box-img").find('img').remove();
	});
}	