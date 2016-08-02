/*
 *jQuery fullslider v1.0
*/

;(function($) {

    $.fn.fullslide = function(option) {
        var element=this;
        var timer;
        var options = $.extend({
            intval: 100,
            speed: 100
        }, option);
        $(element).html($(element).find('img').get());
        $(element).css({
            'position':'relative',
            'z-index':'-1',
            'height':'100%',
            'width':'100%',
            'overflow':'hidden'
        });
        $(element).find('img').css({
            'min-height':'100%',
            'min-width':'1024px',
            'width':'100%',
            'height':'auto',
            'position':'fixed',
            'top':'0',
            'left':'0',
            'z-index':'1',
            'opacity':'1'
        });
        
         
	       
        function resizer(){
            if(wW < 1024){
                $(element).find('img').css({
                    'width':'1024px',
                    'position':'fixed',
                    'margin-left':'-512px',
                    'left':'50%'
                });
            }else{
                $(element).find('img').css({
                    'width':'100%',
                    'position':'fixed',
                    'margin-left':'0',
                    'left':'0'
                });
            }
        }
        
        $.fn.stopslide = function() {
	        
	        $(element).find('img:last').stop();
	        $(element).find('img:last').css({'opacity':1});
            
            clearInterval(timer);
	        
	        $("#slide").empty();
	        
        }
        
        var wnum = $(window).width();
        //$(element).find('img:last').animate({'width':wnum+100+"px",top:"-50",left:"-50"},8000,"easeOutQuad");
        //$(element).find('img:last').animate({top:"-50"},8000,"linear");
        
        imgNum = $(element).find('img').length;
        
        timer = setInterval(
	        function(){
	            
	            $(element).find('img:last').delay(0).stop().animate({'opacity':'0'},
		                {duration:options.speed,complete:
		                function() {
		                    $(element).find('img:last').clone().prependTo(element);
		                    $(element).find('img:first').css({'opacity':'1','top':0});
		                    
               
		                    $(element).find('img:last').remove();
		                   // $(element).find('img:last').animate({top:"-120"},12000,"linear");
		                }
	                });        },(options.speed + options.intval)*imgNum,"easeOutQuad");
        

	        wW = $(window).width();
	        resizer();
	        $(window).resize(function(){
	        wW = $(window).width();
	        resizer();
        });
        
        return element;
    };
})(jQuery);