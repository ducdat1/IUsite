/**
 * common.js
 *
 */

window.onunload = function(){};

if ( typeof window.console != 'object' ){window.console = {log:function(){},debug:function(){},info:function(){},warn:function(){},error:function(){},assert:function(){},dir:function(){},dirxml:function(){},trace:function(){},group:function(){},groupEnd:function(){},time:function(){},timeEnd:function(){},profile:function(){},profileEnd:function(){},count:function(){}};}


/*############################################################

 [user agent]

 ############################################################*/

function UA()
{
	this.os = {
		Win			: new RegExp( /win/i ).test( navigator.userAgent ),
		Mac			: new RegExp( /mac/i ).test( navigator.userAgent ),
		Ios			: new RegExp( /iphone|ipad|ipod/i ).test( navigator.userAgent ),
		Android	: new RegExp( /android/i ).test( navigator.userAgent )
	};

	this.browser = {
		lteIE6	: typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined",
		lteIE7	: typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined",
		lteIE8	: typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined",
		IE			: Boolean( document.uniqueID ),
		Firefox	: Boolean( window.sidebar ),
		Opera		: Boolean( window.opera ),
		Webkit	: !document.uniqueID && !window.opera && !window.sidebar && window.localStorage && typeof window.orientation == "undefined",
		sp			: typeof window.orientation != "undefined"
	};
}


var ua = new UA();


/*############################################################

 [utility]

 ############################################################*/

function Utility(){};

/**
 * get root path
 * @param url
 * @return {*}
 */
Utility.prototype.getRootPath = function( url, filename )
{
	filename = ( filename !== undefined ) ? filename : false;

	// remove "#***"
	if ( url.indexOf( '#' ) != -1 ) url = url.split( '#' )[0];

	if ( filename )
	{
		// add "index"
		if ( !new RegExp( /(\.html?$|\/$)/i ).test( url ) ) url = url + '/';
		if ( !new RegExp( /\.html?$/i ).test( url ) ) url = url + 'index.html';
	}
	else
	{
		// remove file name
		//		if ( new RegExp( /\.html?$/i ).test( url ) ) url = url.split( '/' ).slice( 0, -1 ).join( '/' ) + '/';
		if ( new RegExp( /\.html?$/i ).test( url ) ) url = url.replace( /[\w\-\.]+?\.html?$/, '' )
	}

	// remove domain
	if ( url.indexOf( 'http://' ) != -1 ) url = '/' + url.split( '/' ).slice( 3 ).join( '/' );

	return url;
};

/**
 * get directory
 * @param url
 * @return {String}
 */
Utility.prototype.getDirectory = function( url )
{
	var n = ( url.indexOf( 'http://' ) == -1 ) ? 1 : 3;
	url = '/' + url.split( '/' ).slice( n, n + 1 ).join() + '/';

	return url;
};

/**
 * click link
 * @param url
 * @param target
 * @param rel
 * @param object
 * @return {window}
 */
Utility.prototype.clickLink = function( url, target, rel, object )
{
	if ( url != "" )
	{
		if ( rel && ( /external/ig ).test( rel ) ) return window.open( url, "" );

		switch ( true )
		{
			case ( /top/ig ).test( target )		: { top.location.href = url; break; }
			case ( /blank/ig ).test( target )	: { window.open( url, "" ); break; }
			default														: { location.href = url; break; }
		}
	}
}


/**
 * set css 3 with vender prefix
 * @param $object
 * @param property
 * @param value
 */
/*Utility.prototype.setCss3 = function( $object, property, value )
 {
 var prefix;
 switch( true )
 {
 case ua.browser.Firefox	: { prefix = '-moz-'; break; }	// firefox
 case ua.browser.Opera		: { prefix = '-o-'; break; }		// opera
 case ua.browser.IE			: { prefix = '-ms-'; break; }	// ie9
 case ua.browser.Webkit	:
 case ua.browser.sp			: { prefix = '-webkit-'; break; }
 }

 if ( prefix )
 {
 var browser_property = prefix + property;
 $object.css( property, value );
 $object.css( browser_property, value );
 }
 }*/


/**
 * check image
 * @param url
 * @return {Boolean}
 */
Utility.prototype.isImage = function( url )
{
	return /\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i.test( url );
}


/**
 *
 * @return {Boolean}
 */
Utility.prototype.isOpener = function()
{
	if ( ua.browser.lteIE8 && !ua.browser.lteIE7 )
	{
		if ( window.opener ) return typeof window.opener.document == 'object';
		else return false
	}
	else return window.opener && !window.opener.closed;
}

/**
 * opener location
 * @param url
 */
Utility.prototype.openerLocation = function( url )
{
	if ( util.isOpener() )
	{
		window.opener.location.href = url;
		window.opener.focus();
	}
	else
	{
		var win = window.open( url, null );
		win.focus();
	}
}


/**
 * open pop up window
 * @param url
 * @param name
 * @param options
 */
Utility.prototype.popWin = function popWin( url, winname, options )
{
	options = options || {};

	var setting = {
		width: options.width || 500,
		height: options.height || 500,
		menubar: options.menubar || 'no',
		location: options.location || 'no',
		directories: options.directories || 'no',
		scrollbars: options.scrollbars || 'no',
		toolbar: options.toolbar || 'no',
		status: options.status || 'no',
		resizable: options.resizable || 'no',
		centering: options.centering || 'no'
	};

	winname = winname || 'win';

	var option = 'width=' + setting.width + ', height=' + setting.height + ', ';

	if ( setting.centering == 'yes' )
	{
		var _left = ( screen.availWidth - setting.width ) >> 1;
		var _top = ( screen.availHeight - setting.height) >> 1;

		option += 'top=' + _top + ', left=' + _left + ', ';
	}

	option += 'menubar='+ setting.menubar +',';
	option += 'location='+ setting.location +',';
	option += 'directories='+ setting.directories +',';
	option += 'scrollbars='+ setting.scrollbars +',';
	option += 'toolbar='+ setting.toolbar +',';
	option += 'status='+ setting.status +',';
	option += 'resizable='+ setting.resizable;

	var win;
	win = window.open( url, winname, option );
	win.focus();
}


var util = new Utility();




/*############################################################

 [ArrayUtility]

 ############################################################*/
function ArrayUtility(){};

ArrayUtility.prototype.shuffle = function( arr )
{
	var _index;
	var _obj;

	var i = arr.length;
	while ( --i >= 0 )
	{
		_index = ( Math.random() * ( arr.length - 1 ) ) | 0;
		_obj = arr[ i ];
		arr[ i ] = arr[ _index ];
		arr[ _index ] = _obj;
	}

	return arr;
}


var arrayUtil = new ArrayUtility();


/*############################################################

 [stage property]

 ############################################################*/
function StageUtility(){};
var stageUtil = new StageUtility();


/*############################################################

 [jQuery extends]

 ############################################################*/

$.fn.extend({

	//change rollover image
	switchBtImg: function( area, suffix )
	{
		return this.each( function()
		{
			area = area || $( this );
			suffix = suffix || '_on';

			var $img = ( $( this ).is( 'img' ) ) ? $( this ) : $( this ).find( 'img[class!=nomotion]' );

			var $target = ( !$img.attr( 'vml' ) ) ? $img : $( $img[0].vml.image.fill );
			var _src = $img.attr( 'src' );

			if ( _src && $img.not( '[ src *= "' + suffix + '." ]' ).length )
			{
				var _on = [
					_src.substr( 0, _src.lastIndexOf( '.' ) ),
					_src.substring( _src.lastIndexOf( '.' ) )
				].join( suffix );

				$( '<img>' ).attr( 'src', _on );

				area.hover(
					function(){ $target.attr( 'src', _on ); },
					function(){ $target.attr( 'src', _src ); }
				);
			}
		});
	},

	// fade rollover image
	fadeBtImg: function( area, alpha )
	{
		return $( this ).each( function()
		{
			var $img = ( $( this ).is( 'img' ) ) ? $( this ) : $( this ).find( 'img[class!=nomotion]' );
			area = area || $( this );
			alpha	= alpha || .6;

			area.hover(
				function(){ $img.stop().fadeTo( 100, alpha ); },
				function(){ $img.stop().fadeTo( 100, 1 ); }
			);
		});
	},

	// smooth scroll
	smoothScroll: function()
	{
		var $link = ( $( this ).is( 'a' ) ) ? $( this ) : $( 'a:first', this );
		if ( location.pathname.replace( /^\//, '' ) == $link[0].pathname.replace( /^\//, '' ) && location.hostname == $link[0].hostname )
		{
			var target = $( $link[0].hash );
			target = target.length && target || $( '[name=' + $link[0].hash.slice(1) + ']' );
			if ( $( target ).length )
			{
				$( this ).bind( 'click', function( e )
				{
					e.preventDefault();
					var ypt = ( $( target ).offset().top <= $( document ).height() - $( window ).height() ) ? $( target ).offset().top : $( document ).height() - $( window ).height();
					if ( ypt == $( window ).scrollTop() ) return;

					$( 'html, body' ).stop().animate({ scrollTop: ypt }, 1200, 'easeOutExpo' );
				});
			}
		}
	},

	// clickable
	clickable	: function()
	{
		return $( this ).each( function()
		{
			if ( $( this ).is( '.fade, .switch' ) )
			{
				( $( this ).is( '.fade' ) ) ? $( this ).fadeBtImg() : $( this ).switchBtImg( $( this ), '-on' );
			}

			// setting
			$( this ).hover(
				function(){ $( this ).addClass( "over" ); },
				function(){ $( this ).removeClass( "over" ); }
			);

			// link
			if ( $( this ).is( ':not( .notlink )' ) )
			{
				var $link = ( $( this ).is( 'a' ) ) ? $( this ) : $( 'a:first', this );

				if ( new RegExp( /^\#/ ).test( $link.attr( 'href' ) ) || ( new RegExp( /\#/ ).test( $link.attr( 'href' ) ) && ( util.getRootPath( $link.attr( 'href' ) ) == project.property.currentPath ) ) )
				{
					// page scroll
					$( this ).smoothScroll();
				}
				else
				{
					// link
					$( this ).bind( 'click', function( e )
					{
						e.preventDefault();
						var href = $link.attr( "href" );
						if ( !href ) return;
						if ( $( $link ).is( '[rel=opener]' ) ) util.openerLocation( href );
						else util.clickLink( href, $link.attr( "target" ), $link.attr( "rel" ), $( this ) );
					});
				}
			}
		});
	},

	// unclickable
	unclickable: function()
	{
		return $( this ).each( function()
		{
			if ( $( this ).is( '.over' ) ) $( this ).removeClass( 'over' );

			$( this )
				.removeClass( 'clickable' )
				.unbind( 'mouseenter mouseleave' );
		});
	},

	// check current
	checkCurrent: function( filename, isSwitch, suffix )
	{
		return $( this ).each( function()
		{
			filename = ( filename !== undefined ) ? filename : false;
			var $a = $( 'a', this );
			if ( !$a.length ) return;

			var linkDir = util.getRootPath( $a.attr( 'href' ).replace( /\/*((\.)+\/)+/g, '/eos/special/6d-furusato/' ), filename );
			//console.log( linkDir, util.getRootPath( window.location.href, filename ), new RegExp( linkDir ).test( util.getRootPath( window.location.href, filename ) ) )

			if ( $( this ).is( ':not( .current )' ) && new RegExp( linkDir ).test( util.getRootPath( window.location.href, filename ) ) )
			{
				// add class
				$( this ).addClass( 'current' );

				// replace image
				isSwitch = isSwitch || false;
				if ( isSwitch && $( this ).is( ':has( img )' ) )
				{
					suffix = suffix || '_current';

					var $img = $( 'img', this );
					var $target = ( !$img.attr( 'vml' ) ) ? $img : $( $img[0].vml.image.fill );

					var src = $img.attr( 'src' );
					var _current = [
						src.substr( 0, src.lastIndexOf( '.' ) ),
						src.substring( src.lastIndexOf( '.' ) )
					].join( suffix );

					$target.attr( 'src', _current );
				}
			}
		} );
	},

	// png fix
	pngFix: function()
	{
		return $( this ).each( function()
		{
			if ( $.fn.fixPng && ua.browser.lteIE6 )
			{
				$( '*', this ).filter(function()
				{
					if ( $( this ).is( 'img' ) || $( this ).css( 'background-image' ) != 'none' )
					{
						var src = ( $( this ).is( 'img' ) ) ? $( this ).attr( 'src' ) : $( this ).css( 'background-image' ).replace( /^url\(\"?([\w\.\-\/\:]+)\"?\)$/i, '$1' );
						return new RegExp( /\.png$/i ).test( src );
					}
					else return null;
				} ).fixPng();
			}
			else if ( ua.browser.lteIE8 )
			{
				$( /*'img'*/'.png', this ).each( function()
				{
					if ( $( this ).is( 'img' ) && $( this ).attr( 'src' ).search( '.png' ) != -1 )
					{
						$( this ).css( {
							'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader( src="' + $( this ).attr( 'src' ) + '", sizingMethod="scale" );'
						} );
					}
				});
			}
		} );
	},

	// setup
	setup: function()
	{
		return $( this ).each( function()
		{
			// set clickable
			$( '.clickableUnit', this ).each( function()
			{
				var $unit = $( this );

				$( this ).find( '> *:has( > a )' ).each( function()
				{
					// add class
					$( this ).addClass( 'clickable' );
					if ( $unit.is( '.fade, .switch' ) && $( this ).is( ':not( .fade, .switch )' ) )
					{
						$( this ).addClass( ( $unit.is( '.fade' ) ) ? 'fade' : 'switch' );
					}
				});
			});

			$( '.clickable', this ).clickable();

			$( '.fade, .switch', this ).not( '.clickableUnit, .clickable' ).each( function()
			{
				( $( this ).is( '.fade' ) ) ? $( 'img', this ).fadeBtImg() : $( 'img', this ).switchBtImg( $( 'img', this ), '-on' );
			});


			// link
			$( 'a', this ).each( function()
			{
				$( this )
					.focus( function(){ this.blur(); } ) // erase selected link border
					.filter( function()
					{
						return $( this ).parent().is( ':not( .clickable )' ) && $( this ).is( ':not( .clickable )' );
					})
					.each( function()
					{
						// smooth scroll
						//if ( new RegExp( /\#/ ).test( $( this ).attr( 'href' ) ) ) $( this ).smoothScroll();

						// external link
						if ( $( this ).is( '[rel=opener], [rel=external]' ) )
						{
							$( this ).bind( 'click', function( e )
							{
								e.preventDefault();
								var href = $( this ).attr( 'href' );
								if ( !href ) return;
								if ( $( this ).is( '[rel=opener]' ) ) util.openerLocation( href )
								else util.clickLink( href, $( this ).attr( 'target' ), $( this ).attr( 'rel' ), $( this ) );
							} );
						}
					});
			});
		});
	}

});
