/*
 * File       : js/jt-strap.js
 * Author     : STUDIO-JT (KMS,NICO,JUN,SUMI)
 * Guideline  : JTstyle.1.0
 *
 * SUMMARY:
 * 1) JT Functions INIT
 * 2) ON LOAD
 * 3) ON RESIZE
 * 4) JT Functions
 */



jQuery(function($) {


/* **************************************** *
 * JT Functions INIT
 * **************************************** */
// INPUT
JT.ui.add( selectric_init, true );
JT.ui.add( nicescroll_init, true );

// TABS COMPONENT
JT.ui.add( jt_tabs, true );

// LAZYLOAD
JT.ui.add( lazyload_init, true );

// VIDEO
JT.ui.add( vimeo_play, true );
JT.ui.add( youtube_play, true );

// LIST COMPONENT
JT.ui.add( jt_board_list_fullclick, true );

// CROSSBROWSING Helper
JT.ui.add( attachments_ie, true );



/* **************************************** *
 * ON LOAD
 * **************************************** */
$(window).on('load',function() {

    // add here

});



/* **************************************** *
 * ON RESIZE
 * **************************************** */
// INITIALIZE RESIZE
function init_resize(){

}

// Init resize on reisize
$(window).on('resize',init_resize);



/* **************************************** *
 * JT Functions
 * **************************************** */
/**
 * selectbox custom plugin init 함수
 * selectbox 커스텀 스타일을 설정합니다.
 *
 * @version 1.0.0
 * @author STUDIO-JT (KMS)
 * @see {@link http://selectric.js.org/|selectric API}
 * @requires jquery.selectric.js
 * @requires jt-strap.css
 * @requires jt-strap-rwd.css
 *
 * @example
 * markup sample
 * <div class="jt-selectric__wrap">
 *     <select class="jt-selectric">
 *         <option value="op1">OP1</option>
 *         <option value="op2">OP2</option>
 *         <option value="op3">OP3</option>
 *     </select>
 * </div>
 */
function selectric_init() {

	// custom multiple select
	$('.jt-selectric,.jt_selectric').each(function(){

		var $this = $(this);

		if( !$('html').hasClass('mobile') ) {

			$this.on('selectric-init',function(event, element, selectric){

				$this.closest('.selectric-wrapper').find('.selectric-scroll').niceScroll({
					autohidemode       : false,
					cursorborder       : "0px solid #717b84",
					cursorcolor        : "#717b84",
					background         : "#ddd",
					cursorwidth        : "4px",
					railwidth          : 4,
					cursorborderradius : "5px",
					zindex             : 1,
					railoffset		   : { top: 0, left: -1, },
					railpadding        : { top:  0, right: 0, left: 0, bottom: 1 }
				});
			})

			$this.on('selectric-open',function(){
				 //JT.smoothscroll.destroy();
				 $this.closest('.selectric-wrapper').find('.selectric-scroll').getNiceScroll().resize();

			})
			$this.on('selectric-close',function(){
				 //JT.smoothscroll.init();

			})

			$this.selectric({
				disableOnMobile: true
			});
		}

	});

}



/**
 * nicescroll plugin init 함수
 * 커스텀 스크롤바를 설정합니다.
 *
 * @version 1.0.0
 * @author STUDIO-JT (KMS)
 * @see {@link https://github.com/inuyaksa/jquery.nicescroll|nicescroll API}
 * @requires jquery.nicescroll.js
 *
 * @example
 * // markup sample
 * <div class="jt-nicescroll">
 *     <div class="jt-nicescroll__content"></div>
 * </div>
 */
function nicescroll_init() {

    $('.jt-nicescroll__content').niceScroll({
        autohidemode       : false,
        cursorborder       : "0px solid #f4f5f6",
        cursorcolor        : "#ddd",
        background         : "#f4f5f6",
        cursorwidth        : 10,
        cursorborderradius : "0px",
        railoffset		   : {top: 0, left: 0}
    });

}



/**
 * 게시판 리스트 fullclick action을 추가합니다
 *
 * @version 1.0.0
 * @author STUDIO-JT (KMS)
 */
function jt_board_list_fullclick() {

    $('.js_full_click').on('click', function(e){

        e.stopPropagation();

		var target = e.target;

		var url = $(this).find('a:first').attr('href');
		if(url != undefined){
            window.location.href = url;

            // var openNewWindow = window.open("about:blank");
            // openNewWindow.location.href = url;
		}

    });

}



/**
 * JT basic tabs component
 *
 * @version 1.0.1
 * @author STUDIO-JT (NICO)
 */
function jt_tabs(){

    var $el = $('.jt-tabs');

	$el.each(function(){

		var $this = $(this);

		// Hide tabs if not already hidden
		$this.find('> div > div').hide();

		// Init display the right tab
        // TODO : DRY this stuff
		if(location.hash != "#"){
			if ($(location.hash).length > 0) {
				var current_hash = 	location.hash;
				var current_hash_index = $(current_hash).index();
				$this.find('> div > div').hide();
				$this.find('> div > div:eq('+current_hash_index+')').show();
				$this.find('> ul > li:first').removeClass('jt-tabs--active');
				$this.find('> ul > li:eq('+current_hash_index+')').addClass('jt-tabs--active');
			} else{
				$this.find('> div > div:first').show();
				$this.find('> ul > li:first').addClass('jt-tabs--active');
			}
		}else{
			$this.find('> div > div:first').show();
			$this.find('> ul > li:first').addClass('jt-tabs--active');
		}

		// Add click event
		$this.find('> ul li').on('click',function(){
			$('html,body').animate({scrollTop: $this.offset().top - $('#header').outerHeight()});

			var $that = $(this).find('a');
			var hash = $that.attr('href');
			$this.find('> ul li').removeClass('jt-tabs--active');
			$that.parent().addClass('jt-tabs--active');

			var target_index = $that.parent().index();
			$this.find('> div > div').hide();
			$this.find('> div > div:eq('+target_index+')').show();

			// add hash
            if ('history' in window && 'pushState' in history) {
                history.pushState(null, null, hash)
            }

			return false;
		});

		// Listner hash change
		// TODO DRY THIS CODE !!!
		if ("onhashchange" in window) {
			window.onhashchange = function locationHashChanged() {
				var _current_hash = location.hash;
				var _current_hash_index = $(_current_hash).index();
				$this.find('> div > div').hide();
				$this.find('> div > div:eq('+_current_hash_index+')').show();
				$this.find('> ul > li').removeClass('jt-tabs--active');
				$this.find('> ul > li:eq('+_current_hash_index+')').addClass('jt-tabs--active');
			}
		}

	});

}



/**
 * Image Lazyload
 *
 * @version 1.0.0
 * @author STUDIO-JT (KMS)
 *
 * @example
 * Markup sample
 * <figure class="jt-lazyload">
 * 	 <span class="jt-lazyload__color-preview"></span>
 * 	 <img width="120" height="120" data-unveil="some_img_url.jpg" src="blank.gif" alt="" />
 * 	 <noscript><img src="some_img_url.jpg" alt="" /></noscript>
 * </figure>
 *
 * @description masonry 타입일경우 jt-lazyload에 jt-lazyload--masonry class를 추가로 붙여주세요
 */
function lazyload_init(){

    // lazyload
    $("[data-unveil]").unveil(300, function() {
    	$(this).on('load',function() {
    		$(this).addClass('jt-lazyload--loaded');
    	});
    });

}



/**
 * Vimeo custom play
 *
 * @version 1.0.0
 * @author STUDIO-JT (KMS,NICO)
 * @see {@link https://developer.vimeo.com/|API}
 * @requires https://player.vimeo.com/api/player.js
 */
function vimeo_play(){

    // play if click on the poster
    $('.jt-embed-video--vimeo .jt-embed-video__poster').each(function () {

        var $poster = $(this);
		var $wrap = $poster.closest('.jt-embed-video');
		var $parent = $poster.closest('.jt-embed-video__inner');
		var $iframe = $parent.find('iframe');
		var iframe_id = $iframe.attr('id');
		var js_iframe = $parent.find('iframe')[0];

		// Vimeo
		$poster.on('click', function () {
			if(!$('html').hasClass('ie9')) {
				var video = new Vimeo.Player(js_iframe);
				gsap.set($iframe, {autoAlpha: 1, force3D: true});
				gsap.to( $poster, .6, {autoAlpha: 0, onStart: function(){ video.play(); }});
			} else {
				alert('영상 재생을 지원하지 않는 브라우저를 사용 중입니다.');
			}
		});

    });

}



/**
 * Youtube custom play
 *
 * @version 1.0.0
 * @author STUDIO-JT (NICO)
 * @see {@link https://developers.google.com/youtube/iframe_api_reference}
 */
function youtube_play(){

    // load youtube if necessary
	if($('.jt-embed-video--youtube').length <= 0) return;

	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";

	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// if youtube api ready do your stuff
	window.onYouTubeIframeAPIReady = function() {

		// play if click on the poster
		$('.jt-embed-video--youtube .jt-embed-video__poster').each(function () {

			var $poster = $(this);
			var $wrap = $poster.closest('.jt-embed-video');
			var $parent = $poster.closest('.jt-embed-video__inner');
			var $iframe = $parent.find('iframe');
			var iframe_id = $iframe.attr('id');
			var js_iframe = $parent.find('iframe')[0];

			new YT.Player(iframe_id,{
				events: {
					'onReady': function(event){

						$poster.on('click',function(){
							event.target.playVideo();
							$poster.fadeOut(800,function(){
							   $poster.remove();
							});

							return false;
						})
					}
				}
			});

		});

	}

}



/**
 * Open attachement in new tab if IE11
 *
 * @version 1.0.0
 * @author STUDIO-JT (NICO)
 */
function attachments_ie(){

	if( $('html').hasClass('ie11') ) {

        $('.jt-download-files a').each(function(){
            $(this).attr('target','_blank');
        });

    }

}



}); // End jQuery
