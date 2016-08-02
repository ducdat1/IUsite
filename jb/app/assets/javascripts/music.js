var audio;
var playlist;
var tracks;
var current;
$(document).ready(function() {
    init();
});
function init(){
    current = 0;
    audio = $('audio');
    playlist = $('#playlist');
    tracks = playlist.find('li a');
    len = tracks.length - 1;
    audio[0].volume = .30;
    audio[0].play();
    playlist.find("li").fadeOut();
    playlist.find("li.active").fadeIn();
    playlist.css({'margin-bottom': '10px' });
    audio.fadeOut();
    playlist.find('a').click(function(e){
        e.preventDefault();
        link = $(this);
        current = link.parent().index();
        run(link, audio[0]);
    });
    audio[0].addEventListener('ended',function(e){
        e.preventDefault();
        current++;
        if(current == len){
            current = 0;
            link = playlist.find('a')[0];
        }else{
            link = playlist.find('a')[current];    
        }
        run($(link),audio[0]);
        playlist.find("li").css({display: 'none' })
        playlist.find("li.active").css({display: 'list-item' });
    });
    playlist.hover(function() {
        playlist.css({'margin-bottom': '0px' });
        playlist.find("li").fadeIn();
        audio.fadeIn();
    }, function() {
         setTimeout(function(){ 
             playlist.find("li").fadeOut();
             playlist.find("li.active").fadeIn();
             playlist.css({'margin-bottom': '10px' });
             audio.fadeOut();
         }, 5000);
    });
}
function run(link, player){
        player.src = link.attr('href');
        par = link.parent();
        par.addClass('active').siblings().removeClass('active');
        audio[0].load();
        audio[0].play();
}