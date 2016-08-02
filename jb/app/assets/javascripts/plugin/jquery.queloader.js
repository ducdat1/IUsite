;(function( $ ) {
	var name_space = 'queload';
	$.fn[name_space] = function(
		files,
		progress,
		complete
	){
		var _t = this;	
		var _count = 0;	
		var _countMax = 0;
		var _dataarray = [];
		//
		var exLoad = function(imageSrc,callback){
		var img = $( new Image() );
			img.bind('load', function(){
				callback(this);
			});
			img.attr('src',imageSrc);
		};
		//
		var countLoaded = function(img){
			_count --;
			_dataarray.push(img);
			progress((_countMax-_count)/_countMax);
			if(_count < 1){
				complete(_dataarray);
			};
		};
		//
		for (var i in files){
			_count ++;
			_countMax = _count;
			exLoad(files[i],countLoaded);
		};
		return this;
	};  
})(jQuery);
