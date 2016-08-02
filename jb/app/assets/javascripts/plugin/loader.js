/*
 * loader.js
 *
 * Author: Kenji Morisaki
 * Url: http://unstandard.info
 *
 */

$( 'head' ).append('<style type="text/css">#container { display: none; }</style>');
 
var Loader = function( element, options )
{
	Loader.prototype.defaults = {
		deepSearch		: true
	}
	
	this.options = $.extend( null, this.defaults, options );
	
	this.FPS = 30;
	this.DELAY = ( 1000 / this.FPS ) | 0;
	
	this.LOAD_ENTER_FRAME = 'load_enter_frame';
	this.LOAD_COMPLETE = 'load_complete';
	
	this.element = element;
	this.$container = $( '<div />' );
	
	this.loadedCnt = 0;
	this.loadList = [];
	this.percent = 0;
	
	// initialize
	this.init();
}



/**
 * initialize
 */
Loader.prototype.init = function()
{
	//$( 'html' ).css( 'overflow', 'hidden' );
	
	var me = this;
	
	if ( me.element )
	{
		me.element.each( function()
		{
			me.findImage( $( this ) );
			
			if ( me.options.deepSearch )
			{
				$( '*:not( script )', this ).each( function()
				{
					me.findImage( $( this ) );
				});
			}
		});
	}
	
	//console.log( this.loadList );
	
	// show container
	$( '#container' ).css( 'display', 'block' );
}



/**
 * preload
 */
Loader.prototype.preload = function()
{
	var me = this;
	
	for ( var i = 0; i < this.loadList.length; i++ )
	{
		var $img = $( new Image() );
		$img
			.one( 'load', this, function( e )
			{
				e.data.loadedCnt++;
			})
			.attr( 'src', this.loadList[i] )
			.appendTo( me.$container );
	}
	
	this.intervalID = setTimeout( function(){ me.enterFrameHandler( me ); }, me.DELAY );
}



/**
 * add images
 */
Loader.prototype.addImages = function( array )
{
	for ( var i = 0; i < array.length; i++ )
	{
		this.loadList.push( array[i] );
	}
}



/**
 * enterframe handler
 */
Loader.prototype.enterFrameHandler = function( me )
{
	clearTimeout( me.intervalID );
	
	var p = ( me.loadList.length ) ? me.loadedCnt / me.loadList.length : 1;
	
	me.percent += ( ( 100 * p ) - me.percent ) * .4;
	
	if ( me.loadedCnt == me.loadList.length && me.percent > 99.9 )
	{
		$( window ).trigger( me.LOAD_COMPLETE );
		me.percent = 100;
	}
	else
	{
		me.intervalID = setTimeout( function(){ me.enterFrameHandler( me ); }, me.DELAY );
	}
	
	$( window ).trigger( me.LOAD_ENTER_FRAME );
}




/**
 * find image
 */
Loader.prototype.findImage = function( $element )
{
	if ( $element.is( 'img' ) && $element.attr( 'src' ) && util.isImage( $element.attr( 'src' ) ) )
	{
		// image
		this.loadList.unshift( $element.attr( 'src' ) );
	}
	/*else if ( $element.is( 'a' ) && $element.attr( 'href' ) && util.isImage( $element.attr( 'href' ) ) )
	{
		// a
		this.loadList.push( $element.attr( 'href' ) );
	}*/
	else if ( $element.css( 'background-image' ) != "none" )
	{
		// background-image
		this.loadList.unshift( $element.css( 'background-image' ).replace( /^url\(\"?([\w\.\-\/\:]+)\"?\)$/i, '$1' ) );
	}
}