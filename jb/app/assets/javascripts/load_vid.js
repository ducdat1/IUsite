function videoresize(){
    var vidwid = $(".video-content").width();
    var vidhei = 2/3*vidwid;
    $("#vid-content").css({'height': vidhei });
    $(".video-content").find("video").attr({ 'height': vidhei, 'width': '100%' });
}