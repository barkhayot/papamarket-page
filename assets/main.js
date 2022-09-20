/*
 * File       : js/main.js
 * Author     : STUDIO-JT (KMS)
 * Guideline  : JTstyle.1.0
 *
 * SUMMARY:
 * 1) Global Variable
 * 2) JT Default Functions INIT
 * 3) Other Functions INIT
 * 4) ON LOAD
 * 5) ON RESIZE
 * 6) JT Default Functions
 * 7) Other Functions
 */



jQuery(function($) {



/* **************************************** *
 * Global Variable
 * **************************************** */
var window_width = $(window).width();
var window_height = $(window).height();



/* **************************************** *
 * JT Default Functions INIT
 * **************************************** */
minimize_header();
menu_layout_setting();
small_screen_nav_open();
footer_marquee();

screen_nav_a11y();
focus_on_tab_only();

scroll_top();
scroll_down();

full_visual_height();
jt_fullvid();
mapbox_init();



/* **************************************** *
 * Other Functions INIT
 * **************************************** */
main_visual();
main_app_vid();
main_company_head_pin();
main_company_slot_machine();
main_culture_recruit_scroll();
main_recruit_fadeout();

about_history_fadeout();

business_info_slider();

career_menu_setting();
career_visual();
career_notice_slider();
career_main_intro_motion();
career_people_hover();
career_banner_popup();
career_intro_card();

single_sticky_sidebar();

jt_link_coming_soon();

article_visual_motion();

visual_vid_popup();
career_menu_scroll();


/* **************************************** *
 * ON LOAD
 * **************************************** */
$(window).on('load',function() {

    // fix jquery 3 on load issue on IE11
    if(!$('html').hasClass('ie11')){
        init_onload();
    }

});

if($('html').hasClass('ie11')){
    setTimeout(function(){
        init_onload();
    },1000);
}

function init_onload(){

    /* JT  Functions */
    main_business_slider();

}



/* **************************************** *
 * ON RESIZE
 * **************************************** */
// INITIALIZE RESIZE
function init_resize(){

	// only width resize check not height ( minimize address bar debugging )
	if ($(this).width() !== window_width) {
		full_visual_height();
	}
	
	career_main_intro_motion();

}

// Init resize on reisize
$(window).on('resize',init_resize);



/* **************************************** *
 * JT Default Functions
 * **************************************** */
/**
 * FIX HEADER ANIMATION
 *
 * @version 1.0.0
 * @author STUDIO-JT (KMS, Nico)
 * @requires gsap.min.js
 */
function minimize_header() {

	if($('.career-nav-container').length) return;

    var $window = $(window);
	var $header = $('#header');
    var did_scroll     = null;
    var current_scroll = 0;
    var last_scroll    = 0;
    var move_scroll    = 10;

	$window.on('scroll', function() {
        did_scroll = true;

		if ($window.scrollTop() > $header.height()) {
			$header.addClass('minimize');
		} else {
			$header.removeClass('minimize');
		}
	});

    setInterval(function() {

        if (did_scroll && !$('body').hasClass('open-menu')) {
            has_scrolled();
            did_scroll = false;
        }

    }, 50);

    function has_scrolled(){

        current_scroll = $(this).scrollTop();

        // Make sure they scroll more than move_scroll
        if(Math.abs(last_scroll - current_scroll) <= move_scroll) return;

        if(current_scroll > last_scroll){ // ScrollDown
            if(current_scroll > $(window).height()){
                gsap.to( $header, 0.4, { autoAlpha:0, y: -$header.outerHeight(), ease: Power3.easeOut });
            }
        }
        else { // ScrollUp
            gsap.to( $header, 0.4, { autoAlpha:1, y: 0, ease: Power3.easeOut });
        }

        last_scroll = current_scroll;

    }

}



/**
 * small screen navigation
 *
 * @version 1.0.0
 * @author STUDIO-JT (KMS)
 * @requires gsap.min.js
 */
function small_screen_nav_open(){

    var $body = $('body'),
        $header = $('#header'),
        $menu_container = $('#small-menu-container'),
        $menu_overlay = $('#small-menu-overlay'),
		$menu_btn = $('#small-menu-btn');

	// Menu button
	$menu_btn.on('click', function(e){

        e.preventDefault();

        if( !$body.hasClass('open-menu') ){
            open_menu();
        } else {
			close_menu();
		}

    });

	// Overlay
    $menu_overlay.on('click',function(){
        close_menu();
    });

    // Open action
    function open_menu(){

        if(!$('body').hasClass('open-menu')){

            $body.addClass('open-menu');
			$header.removeAttr('style');

			// Scroll
			if( JT.is_screen(540) ) {

				var scroll_storage = $(window).scrollTop();
				$body.addClass('open-menu-fixed').attr('data-scrolltop' , scroll_storage);

				setTimeout(function(){
					$body.css('position', 'fixed');
				},300);
			}

            // motion
            TweenLite.to($menu_overlay, .3, {autoAlpha: 1,onStart: function() {$menu_overlay.css('display', 'block');}});
            TweenLite.fromTo($menu_container, .3, {x: '0%'}, {
                x: '-100%',
                onStart: function() {
                    $menu_container.css('display', 'block');
                }
            });

			// Scroll
			if( JT.is_screen(540) ) {
				JT.scroll.destroy();
			}

        }

    }

    //  close action
    function close_menu(){

        if($('body').hasClass('open-menu')){

			$body.removeClass('open-menu');

            TweenLite.to($menu_overlay, .5, {autoAlpha: 0,onComplete: function() {$menu_overlay.css('display', 'none');}});
            TweenLite.to($menu_container, .5, {
                x: '100%',
				onStart: function(){
					// Scroll
					if( JT.is_screen(540) ) {
                        $body.removeAttr('style');
                        window.scrollTo(0 , $body.attr('data-scrolltop'));
                        $body.removeClass('open-menu-fixed');

                        setTimeout(function(){
                            if( $body.css('position') == 'fixed' ) {
                                $body.removeAttr('style');
                                window.scrollTo(0 , $body.attr('data-scrolltop'));
                                $body.removeClass('open-menu-fixed');
                            }
                        },200);
					}
				},
                onComplete: function() {
					// Scroll
					if( JT.is_screen(540) ) {
						JT.scroll.restore();
					}
					$body.removeClass('open_menu');
					$menu_container.css('display', 'none');
                    $menu_container.css('display', 'none');
                }
            });

        }
    }

}



/**
 * GNB layout setting
 *
 * @version 1.0.0
 * @author STUDIO-JT (KMS)
 */
function menu_layout_setting(){

    // add small menu markup
    $('#small-menu-container').append('<div class="small-menu-container__inner"></div>');
    $('.small-menu-container__inner').append($('#menu').clone().removeAttr('id').addClass('small-screen-menu'));

	// career menu setting
	if($('#menu > li.current-menu-item').length || $('#menu > li.current-page-ancestor').length){
		if(!$('.career-nav-container').length){
			$('#menu').addClass('menu--current-active');
		}
		$('.small-screen-menu').addClass('menu--current-active');
	}else {
		if(!$('.career-nav-container').length){
			$('#menu').removeClass('menu--current-active');
		}
		$('.small-screen-menu').removeClass('menu--current-active');
	}

}



/**
 * GNB menu ally setting
 *
 * @version 1.0.0
 * @author STUDIO-JT (sumi)
 */
function screen_nav_a11y() {

    $('#menu .menu-item').on('focusin', function(){
		$(this).addClass('focusin');
	}).on('focusout', function(){
		$(this).removeClass('focusin');
	});

}



/**
 * fixed scroll top button, animate scroll top
 *
 * @version 1.0.0
 * @author STUDIO-JT (KMS)
 */
function scroll_top(){

    var $window = $(window);
    var $document = $(document);
    var $footer = $('#footer');
    var $scroll_btn = $('#go-top');

    $scroll_btn.on('click',function(e){
        e.preventDefault();
        gsap.to(window, {duration: .6,scrollTo: 0,ease: 'none'});
    });

}



/**
 * animate scroll down
 *
 * @version 1.0.0
 * @author STUDIO-JT (KMS)
 */
function scroll_down(){

    if( $('.scroll-down').length > 0 ) {

        gsap.to('.scroll-down', .4, {
            autoAlpha: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: '+=' + ($(window).height()/2.3),
                scrub: 1
            }
        });

    }

    $('.scroll-down').on('click',function(){

        var target = $(this).attr('href');
        var target_top = $(target).offset().top;
        var header_height = $('#header').height();
        var space = 0;

        if(!$('#header').hasClass('minimize')) {
            if(!JT.is_screen(1023)) {
                space = 15;
            } else if(!JT.is_screen(768)) {
                space = 10;
            }
        }

		$('html,body').animate({
			scrollTop : target_top
		}, 600);

		gsap.to( $('#header'), 0.4, { autoAlpha:0, y: -header_height, ease: Power3.easeOut });

        return false;

    });

}



/**
 * JT embed fullvid
 *
 * @version 1.0.0
 * @author STUDIO-JT (Nico)
 */

function jt_fullvid(){

	$('iframe.jt-fullvid').each(function(){

		var $iframe = $(this);
		var iframe_width = $iframe.width();
		var iframe_height = $iframe.height();
		var ratio = iframe_height / iframe_width;

		var $container = $iframe.parent('.jt-fullvid-container');
	    var c_width = $container.width();
	    var c_height = $container.height();

	    //
	    var new_iframe_width =  c_width;
	    var new_iframe_height = c_width * ratio;

	    if(new_iframe_height < c_height){

	        new_iframe_height = c_height;
	        new_iframe_width = c_height / ratio;
	    }

	    //
	    $iframe.css({display: 'block',width: new_iframe_width,height: new_iframe_height,position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%,-50%)'});

	    //
		JT.globals.fullvid_resize = function(e){

			var c_width = $container.width();
			var c_height = $container.height();

			var new_iframe_width = c_width;
			var new_iframe_height = c_width * ratio;

			if(new_iframe_height < c_height){
				new_iframe_height = c_height;
				new_iframe_width = c_height / ratio;
			}

			$iframe.css({width:new_iframe_width, height:new_iframe_height});

		}
		$(window).on('resize', JT.globals.fullvid_resize);

	});

}



/**
 * custom map plugin (mapbox)
 *
 * @version 1.0.0
 * @author STUDIO-JT (NICO, KMS)
 * @requires https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.css
 */
function mapbox_init(){

    if($('.location-mapbox').length > 0){

		// CSS
        $('head').append('<link href="https://api.mapbox.com/mapbox.js/v3.3.1/mapbox.css" rel="stylesheet">');

        // JS
        var map_url = "https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js";

		//STYLE
		if($('body').hasClass('lang-ko')){
			var map_style = "mapbox://styles/seoljiseok/ckxr0dk9orotf16ul8ci5sl3p"
		}else {
			var map_style = "mapbox://styles/seoljiseok/ckuqiyazf7mn318pkrhe9kude"
		}

		$.getScript( map_url ).done(function( script, textStatus ) {

            $('.location-mapbox').each(function(){

                var $el          = $(this),
                    id           = $el.attr('id'),
                    image_w      = $('body').hasClass('lang-ko') ? '130' : '170',
                    image_h      = '59',
                    image        = $el.attr('data-marker'),
                    lat          = $el.attr('data-lat'),
                    lng          = $el.attr('data-lng'),
                    zoom         = $el.attr('data-zoom');

                L.mapbox.accessToken = 'pk.eyJ1Ijoic2VvbGppc2VvayIsImEiOiJjajJ1Nm9tOGowMDc5MzJtcjRvdzdxZm91In0.-UAvk7ElQFu0u8Ahf8LI9Q';

                var map = L.mapbox.map(id).setView([lat, lng], zoom);

                map.scrollWheelZoom.disable();

                // disable draggable Mobile only
                if($('html').hasClass('mobile')){
                    map.dragging.disable();
                }

                // Use styleLayer to add a Mapbox style created in Mapbox Studio
				L.mapbox.styleLayer(map_style).addTo(map);

                var myLayer = L.mapbox.featureLayer().addTo(map);

                var geoJson = {
                    type: 'FeatureCollection',
                    features: [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [lng, lat]
                        },
                        properties: {
                            //title: 'title',
                            //description: 'addr',
                            icon: {
                                iconUrl: image,
                                iconSize: [image_w, image_h], // size of the icon
                                iconAnchor: [image_w/2, image_h], // point of the icon which will correspond to marker's location
                                popupAnchor: [0, -image_h], // point from which the popup should open relative to the iconAnchor
                                className: "jt-marker"
                            }
                        }
                    }]
                };

                // Set a custom icon on each marker based on feature properties.
                myLayer.on('layeradd', function(e) {
                    var marker = e.layer,
                    feature = marker.feature;

                    marker.setIcon(L.icon(feature.properties.icon));
                });

                // Add features to the map.
                myLayer.setGeoJSON(geoJson);
            }); // each

		}).fail(function( jqxhr, settings, exception ) {

			// Handle Error

		});

	} // ENDIF

}



/**
 * 접근성 & UX 개선 (키보드 사용할때만 포커스 나오게)
 *
 * @version 1.0.0
 * @author STUDIO-JT (Nico)
 */
function focus_on_tab_only(){

    var $body = $('body');

    $body.on('mousedown', function(){

        $body.addClass('use-mouse');

    }).on('keydown', function() {

        $body.removeClass('use-mouse');

    });

}



/* **************************************** *
 * Other Functions
 * **************************************** */
function main_visual(){

	if(!$('body').hasClass('home')) return;

	// visual video check
    var $video = $('.main-visual iframe');

    if( !!$video.length ){
        jt_vimeo_ready(function(){
            var video = new Vimeo.Player($video[0]);
            var $poster = $video.closest('.jt-fullvid-container').find('.jt-fullvid__poster');
            var $poster_low = $video.closest('.jt-fullvid-container').find('.jt-fullvid__poster--low');

            video.getDuration().then(function(duration){

                video.setCurrentTime(0);
                video.play();

                video.on('timeupdate', function(data) {

                    if(data.seconds > 0) {
                        video.off('timeupdate');

                        if( $poster.is(':visible') ){
                            gsap.to($poster, .2, {autoAlpha: 0,onComplete: function() {$poster.hide();}});
                        }
                    }
                });

                /*
                // video not working
                video.on('error', function(data){
                    $poster_low.css('display','block');
                    gsap.to($poster, .2, {autoAlpha: 0,delay: .3,onComplete: function() {$poster.hide();}});
                });
                */

            });
        });
    }

}



// main business scroll motion
function main_business_slider(){

    if(!$('body').hasClass('home')) return;

    var is_init = true;
    var $section = $('.main-business');
    var $section_bg = $('.main-business__picture');

    // Set
    gsap.set($section_bg.find('.main-business__picture-item:first-child'), {zIndex:2});

    // Resize
    function main_business_resizing(){

        var delay = ( is_init ) ? 0 : 100;

        setTimeout(function(){

			if(window.screen.height === window.innerHeight){
                $('.main-business__picture').height( window.screen.height );
			}else{
                $('.main-business__picture').height( window.innerHeight );
			}

			if( is_init ) { is_init = false; }

		}, delay);

    }

    main_business_resizing();
	$(window).on('scroll', main_business_resizing);

    // Sticky
	function main_business_interaction(){

        // bg attachment
        if( $(window).scrollTop() > $section.offset().top ) {
			$section_bg.addClass('js-pin-fixed');
		} else {
			$section_bg.removeClass('js-pin-fixed');
		}

		if( $(window).scrollTop() > $section.offset().top + $section.outerHeight() - $section_bg.outerHeight() ){
			$section_bg.addClass('js-pin-clear');
		} else {
			$section_bg.removeClass('js-pin-clear');
		}

	}

	main_business_interaction();
	$(window).on('scroll', main_business_interaction);

    // Trigger
    $('.main-business__list .main-business__list-pin').each(function(){

        var $this = $(this);

        ScrollTrigger.create({
			trigger: $this,
			once: false,
            start: 'top 30%',
            end: 'bottom 70%',
			onEnter: function(){
                main_business_change( $this );
			},
			onEnterBack: function(){
                main_business_change( $this );
			}
		});

    });

    $section_bg.find('.main-business__picture-item').each(function(){

        var $this = $(this);

        gsap.to($this.find('> span'), {
			scale: 1.4,
			scrollTrigger : {
				trigger : $('.main-business__list-pin').eq( $this.index() ),
				start: 'top 100%',
				end: 'bottom 0%',
				scrub : 0.4
			}
		});

    });

    function main_business_change( $this ){

        var idx = $this.attr('data-idx');
        var $photo = $('.main-business__picture .main-business__picture-item:eq('+ idx +')');

        if( $section.attr('data-business-current') == idx ) { return; }

        gsap.fromTo($photo, {
            opacity: 0
        }, {
            opacity: 1,
            duration: .4,
            onStart: function(){
                $section.attr('data-business-current',idx);
                gsap.set($('.main-business__picture .main-business__picture-item').not($photo), {zIndex: 1});
                gsap.set($photo, {zIndex: 2});
            },
            onComplete: function(){
                setTimeout(function(){
                    gsap.set($('.main-business__picture .main-business__picture-item').not($photo), {opacity: 0});
                }, 50);
            }
        });

    }

}



function main_app_vid(){

    var $app_bg = $('.main-app .main-section__bg');
    var $video = $app_bg.find('iframe');

	if(!$video.length) return;

	gsap.fromTo($app_bg, .8,{
        y: '20%',
		autoAlpha: 0,
    }, {
		y: '0%',
		autoAlpha: 0.99,
		force3D: true,
		ease: 'power1.out',
		scrollTrigger: {
			trigger: $app_bg,
			start: "top 80%",
		}
	})

	if ( !$video.length ) return;

    if( $video.attr('src') == undefined || $video.attr('src') == '' ) {

        jt_vimeo_ready(function(){
			ScrollTrigger.create({
				trigger: $video,
				start: 'top 200%',
				once: true,
				onEnter: function(){

					$video.attr( 'src', $video.attr('data-src') );

					var vid = new Vimeo.Player($video[0]);
					var $poster = $video.next();
					var $trigger_el = $video;

					if(vid){
						// timeupdate
						vid.on('timeupdate', function(data) {
							if(data.seconds > 0) {
								// off timeupdate
								vid.off('timeupdate');

								// pause
								if( !$video.closest('.jt-fullvid-container').hasClass('jt-fullvid--play') ) { vid.pause(); }
								gsap.to($poster, .2, {autoAlpha: 0, onComplete: function(){$poster.hide();}});
							}
						});
					}

					// check trigger target
					if( $video.closest('.jt-fullvid-container').attr('data-target') != undefined ) {
						$trigger_el = $( $video.closest('.jt-fullvid-container').attr('data-target') );
					}

					// create scroll trigger
					ScrollTrigger.create({
						trigger: $trigger_el,
						once: false,
						onEnter: function(){
							$video.closest('.jt-fullvid-container').removeClass('jt-fullvid--paused').addClass('jt-fullvid--play');
							vid.play();
						},
						onEnterBack: function(){
							$video.closest('.jt-fullvid-container').removeClass('jt-fullvid--paused').addClass('jt-fullvid--play');
							vid.play();
						},
						onLeave: function(){
							$video.closest('.jt-fullvid-container').removeClass('jt-fullvid--play').addClass('jt-fullvid--paused');
							vid.getPaused().then(function(paused) {
								if( !paused ) { vid.pause(); }
							});
						},
						onLeaveBack: function(){
							$video.closest('.jt-fullvid-container').removeClass('jt-fullvid--play').addClass('jt-fullvid--paused');
							vid.getPaused().then(function(paused) {
								if( !paused ) { vid.pause(); }
							});
						}
					});
				}
			})
    	});
    }
}


function main_company_head_pin(){

	if($(window).width() < 1024) { return;}

	var $target = $('.main-company__amount');
	var $pin = $('.main-company__head');

	if( !$pin.length ){ return; }

	ScrollTrigger.matchMedia({
		"(min-width: 1024px)": function(){
			gsap.to($pin,{
				scrollTrigger: {
					trigger: $target,
					start: "top top",
					end: "bottom 50%",
					pin: $pin,
					//markers: true,
				}
			})
		}
	})

}



function main_company_slot_machine(){

	var $slotmachine = $('.main-company__amount-num > b');

	$slotmachine.each(function(){

		var $this = $(this);
		var slotmachine_number = $this.text();
		var start_offset = "top 100%";

		$this.attr( 'data-number' , slotmachine_number ).empty();

		var slotmachine_chars = slotmachine_number.split('');
		var slotmachine_array = [];
		var slotting_numbers = [0,1,2,3,4,5,6,7,8,9];

		for(var i=0 ; i<slotmachine_chars.length; i++) {
			if( $.inArray( parseInt(slotmachine_chars[i], 10) , slotting_numbers ) != -1 ) {
				$this.append('<span class="slotmachine-number-wrap"><span class="slotmachine-number--'+ slotmachine_array.length +'" data-origin="'+ slotmachine_chars[i] +'">0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br></span></span>');
				slotmachine_array[slotmachine_array.length] = parseInt(slotmachine_chars[i], 10);
			}
			else {
				$this.append('<span>'+ slotmachine_chars[i] +'</span>');
			}
        }

		var slotmachine_increment = $this.find('.slotmachine-number-wrap').outerHeight();

		if(JT.is_screen(540)){
			start_offset = "top 100%"
		}

		ScrollTrigger.create({
			trigger: $this,
			start: start_offset,
			once: true,
			//markers: true,
			onEnter: function(){

				for(var i=0 ; i<slotmachine_array.length ; i++) {
					gsap.fromTo( $this.find('.slotmachine-number--' + i) , (1.2 + i * 0.2) , {
						rotation: 0.1,
						y: slotmachine_increment
					}, {
						rotation: 0,
						y: -(slotmachine_increment * (slotmachine_array[i] + 10)),
						force3D: true,
						ease: 'Expo.inOut',
						onComplete: function(){
							$(this._targets[0]).text( $(this._targets[0]).attr('data-origin') ).css('transform','translate3d(0,0,0)');
						}
					});
				}

			}
		});
	})

}



function main_culture_recruit_scroll(){

	var $section = $('.main-culture-recruit');
	var $section_bg = $section.find('> .main-section__bg');

	if(!$section_bg.length) return;

	// bg scale motion
	 gsap.fromTo($section_bg,{
        scale: 1
    },{
    	scale: 1.5,
    	scrollTrigger: {
    		trigger: $section,
            start: "top 100%",
    		end: "bottom 0%",
			//markers: true,
    		scrub: true,
    	}
    })

}



function main_recruit_fadeout(){

	var $recruit = $('.main-recruit');
	var $recruit_overlay = $recruit.find('.main-section__bg-overlay');

	if(!$recruit_overlay.length) return;

    gsap.fromTo($recruit_overlay,{
        autoAlpha: 0
    },{
    	autoAlpha: 1,
    	scrollTrigger: {
    		trigger: $recruit,
            start: "top 50%",
    		end: "bottom 100%",
    		scrub: true,
    	}
    })
}



function about_history_fadeout(){

	var $history = $('.about-history');

	if(!$history.length) return;

    ScrollTrigger.create({
	    trigger: $history,
	    start: 'top 0%',
		onEnter: function(){
			$history.addClass('bg-dark')
		}
    });
}



function business_info_slider(){

	var $slider = $('.business-info__slider-wrap')

	$slider.each(function(){

		var $this = $(this);

		var business_slider = new Swiper($this, {
			init: true,
			loop: true,
			speed: 1000,
			preloadImages: false,
			lazy : {
				loadPrevNext: true,
				loadOnTransitionStart: true
			},
			preventInteractionOnTransition: true,
			followFinger: false,
			//simulateTouch: false,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			pagination: {
				el: $this.find('.swiper-pagination'),
				type: 'bullets',
				clickable: true,
				renderBullet: function (index, className) {
					return '<button class="' + className + '"><span class="sr-only">' + (index + 1) + '</span></button>';
				}
			},
		})

		// Scroll Exception
		business_slider.autoplay.stop();

		// Add inview trigger
		ScrollTrigger.create({
			trigger: $this,
			once: false,
			onEnter: function(){
				if( !business_slider.autoplay.running) {
					business_slider.autoplay.start();
				}
			},
			onEnterBack: function(){
				if( !business_slider.autoplay.running) {
					business_slider.autoplay.start();
				}
			},
			onLeave: function(){
				if( business_slider.autoplay.running) {
					business_slider.autoplay.stop();
				}
			},
			onLeaveBack: function(){
				if( business_slider.autoplay.running) {
					business_slider.autoplay.stop();
				}
			}
		});

	})
}



function career_menu_setting(){

	var $career_nav = $('.career-nav-container');

	if(!!$career_nav.length) {

		var $window = $(window);
        var $body = $('body');
		var $header = $('#header');
        var current_scroll = 0;
        var last_scroll = 0;
        var move_scroll    = 10;
        var is_loading = false;

		$('#header').css({'position' : 'absolute', 'border-color' : '#eee'});

		// check scrollTop on load (fix header outerHeight issue)
		if ($window.scrollTop() > $header.height()) {
            $header.addClass('minimize');
		}

		$window.on('scroll', function(){

            current_scroll = $window.scrollTop();

            if(Math.abs(last_scroll - current_scroll) <= move_scroll) return;

            if($window.scrollTop() > $header.height()){

                $header.addClass('minimize');
                $career_nav.addClass('career-nav--fixed');

                if( !is_loading ) {
                    if(current_scroll < last_scroll){
                        if( !$body.hasClass('career-header--show') ){
                            is_loading = true;

                            gsap.fromTo($header, {
                                y: -$header.outerHeight()
                            }, {
                                y: 0,
                                duration: .3,
                                ease: 'power3.out',
                                onStart: function(){
                                    gsap.set($header, {borderColor: '#eee',position: 'fixed'});
                                    $body.addClass('career-header--show');
                                },
                                onComplete: function(){
                                    is_loading = false;
                                }
                            });
                            gsap.fromTo($career_nav, {y: 0},{y: $header.outerHeight(),duration: .3,ease: 'power3.out'});
                        }
                    } else {
                        if( $body.hasClass('career-header--show') ){
                            is_loading = true;

                            gsap.to($header, {
                                y: -$header.outerHeight(),
                                duration: .3,
                                ease: 'power3.out',
                                onStart : function(){
                                    $body.removeClass('career-header--show');
                                },
                                onComplete: function(){
                                    $body.removeClass('career-header--show');
                                    is_loading = false;
                                }
                            });
                            gsap.to($career_nav, {y: 0,duration: .3,ease: 'power3.out'});
                        }
                    }
                }

			}else {

                if( $window.scrollTop() <= 10 ) {
                    gsap.killTweensOf( $header );
                    gsap.killTweensOf( $career_nav );
                    is_loading = false;

                    $body.removeClass('career-header--show');
                    $header.removeClass('minimize');
                    $career_nav.removeAttr('style').removeClass('career-nav--fixed');

                    if($('.article-header--visual').length || $('.article-header--banner').length){
                        gsap.set($header, {borderColor: 'rgba(249,249,249,.2)', position:'absolute'});
                    }else{
                        gsap.set($header, {borderColor: '#eee', position:'absolute'});
                    }
                }

			}

            last_scroll = current_scroll;

		})

	}
}



function career_visual(){

    if(!$('body').hasClass('page-template-career-index')) return;

	// visual video check
    var $video = $('.article-header--visual iframe');

    if( !!$video.length ){
        jt_vimeo_ready(function(){
            var video = new Vimeo.Player($video[0]);
            var $poster = $video.closest('.jt-fullvid-container').find('.jt-fullvid__poster');
            var $poster_low = $video.closest('.jt-fullvid-container').find('.jt-fullvid__poster--low');

            video.getDuration().then(function(duration){

                video.setCurrentTime(0);
                video.play();

                video.on('timeupdate', function(data) {

                    if(data.seconds > 0) {
                        video.off('timeupdate');

                        if( $poster.is(':visible') ){
                            gsap.to($poster, .2, {autoAlpha: 0,onComplete: function() {$poster.hide();}});
                        }
                    }
                });

            });
        });
    }

}



function career_notice_slider(){

	var $slider = $('.career-main-notice__container');

	if( !$slider.length ){ return; }

	var career_notice = new Swiper($slider, {
		loop : true,
		slidesPerView: 'auto',
		speed: 1000,
		autoplay: {
			delay: 4000,
		},
		effect: 'fade',
		navigation: {
			nextEl: '.career-main-notice .swiper-button-next',
			prevEl: '.career-main-notice .swiper-button-prev'
		},
		pagination: {
			el: '.career-main-notice .swiper-pagination',
			type: 'fraction',
			formatFractionCurrent: function(number){
				return ('0' + number).slice(-2);
			},
			formatFractionTotal: function(number){
				return ('0' + number).slice(-2);
			},
			renderFraction: function(currentClass, totalClass){
				return '<span lang="en" class="' + currentClass + '"></span>' +' <span class="slash">/</span> ' +'<span lang="en" class="' + totalClass + '"></span>';
			}
		}
	});

	$slider.off().on({
		'mouseenter': function(){
			career_notice.autoplay.stop();
		},
		'mouseleave': function(){
			career_notice.autoplay.start();
		}
	});
}



function career_main_intro_motion(){

    var $container = $('.career-main-intro');
    var $head = $('.career-main-intro__head');
    var $background = $('.career-main-intro__bg-wrap');
	
	// reset
	$head.removeClass('js-pin-fixed js-pin-clear');

	if( !$head.length || JT.is_screen(860) ) return;

    // Background
    gsap.set($background, {width: '30%'});

    ScrollTrigger.create({
		trigger: $background,
		start: 'top 70%',
		once: false,
		onEnter: function(){
			if( !JT.is_screen(860) ){
            	gsap.to($background, {duration: 1,width: '100vw',ease: 'power3.out'});
			}
        },
        onLeaveBack: function(){
			if( !JT.is_screen(860) ){
				gsap.to($background, {duration: 1,width: '30%',ease: 'power3.out'});
			}
        }
    });

    // Sticky
	function career_banner_interaction(){

		if( !JT.is_screen(860) ) {

			if( $(window).scrollTop() > $container.offset().top ) {
				$head.addClass('js-pin-fixed');
			} else {
				$head.removeClass('js-pin-fixed');
			}

			if( $(window).scrollTop() > $container.offset().top + $container.outerHeight() - $head.outerHeight() ){
				$head.addClass('js-pin-clear');
			} else {
				$head.removeClass('js-pin-clear');
			}
		}

	}
	career_banner_interaction();
	$(window).on('scroll', career_banner_interaction);

}



function career_banner_popup(){

	//var $popup = $('.career-banner-popup');
	var $popup_btn = $('.career-banner-popup-btn');
	var $popup_overlay = $('.career-banner-popup__overlay');
	var $popup_close = $('.career-banner-popup__close');
	
	if(!$popup_btn.length) return;
	
	// popup open
	$popup_btn.on('click', function(e){
		
		e.preventDefault();
		
		var $popup = $($(this).attr('href'));

		if(!$('body').hasClass('mfp-popup-open')){

			$('body').addClass('mfp-popup-open')
			$('html').css('overflow-y','hidden');
			$popup.css({'opacity':'1', 'visibility': 'visible'});
			JT.ui.call('lazyload_init');
			JT.ui.call('nicescroll_init');
		}
	});

	// popup close (close btn)
	$popup_close.on('click', function (e){

		e.preventDefault();

		$('.career-banner-popup').css({'opacity':'0', 'visibility': 'hidden'});
		$('body').removeClass('mfp-popup-open');
		$('html').removeAttr('style');
	})

	// popup close (overlay)
	$popup_overlay.on('click', function (e){

		e.preventDefault();

		$('.career-banner-popup').css({'opacity':'0', 'visibility': 'hidden'});
		$('body').removeClass('mfp-popup-open');
		$('html').removeAttr('style');
	})
}



function full_visual_height(){

    // height size
    $('.jt-full-h').each(function(){

        var $this = $(this);

        if(window.screen.height === window.innerHeight){
            win_height = window.screen.height;
        }else{
            win_height = window.innerHeight;
        }

        if( $('html').hasClass('mobile') && window_width <= 1023 ) {
            var content_h = ($('#header').outerHeight() * 2) + $('.scroll-down').outerHeight();

            // 채용 sub menu
            if( $('.career-nav-container').length > 0 ) {
                content_h = content_h + $('.career-nav-container').outerHeight();
            }

            if( $this.closest('.main-visual').length > 0 ) { // main visual

                content_h = content_h + $('.main-visual__content').height();

            } else if( $this.closest('.article-header--visual').length > 0 ) { // article visual

                if( !!$('body').hasClass('page-template-about') ) {
                    content_h = content_h + ($('.article-header__visual-title').height()*1.3);
                } else {
                    content_h = content_h + ($('.article-header__visual-content').height()*1.3);
                }

            }

            if( content_h > win_height ) {
                win_height = content_h;
            }
        }

        $this.css('height',win_height);

    });

}


function single_sticky_sidebar(){

	var $sticky = $('.jt-single__aside-sticky')

	if(!$sticky.length) return;

	$(window).on('scroll', function(){

		if(!JT.is_screen(860)) {

            if ($('body').hasClass('career-header--show')) {
				if($(window).scrollTop() + $('.career-nav-container').height() + $('#header').height() + $('.jt-single__aside-sticky').outerHeight() > $('.jt-single__aside').offset().top + $('.jt-single__aside').outerHeight() - parseInt($('.jt-single__body').css('padding-top'))){
					$sticky.addClass('jt-single__aside-sticky--fix-bottom');
				}else{
					$sticky.removeClass('jt-single__aside-sticky--fix-bottom');
				}

				if ($(window).scrollTop() + $('.career-nav-container').height() + $('#header').height() >  $('.jt-single__body').offset().top) {
					$sticky.addClass('jt-single__aside-sticky--fixed');
				}else {
					$sticky.removeClass('jt-single__aside-sticky--fixed');
				}

			} else {
				if($(window).scrollTop() + $('.career-nav-container').height() + $('.jt-single__aside-sticky').outerHeight() > $('.jt-single__aside').offset().top + $('.jt-single__aside').outerHeight() - parseInt($('.jt-single__body').css('padding-top'))){
					$sticky.addClass('jt-single__aside-sticky--fix-bottom');
				}else{
					$sticky.removeClass('jt-single__aside-sticky--fix-bottom');
				}

				if ($(window).scrollTop() + $('.career-nav-container').height() >  $('.jt-single__body').offset().top) {
					$sticky.addClass('jt-single__aside-sticky--fixed');
				}else {
					$sticky.removeClass('jt-single__aside-sticky--fixed');
				}
			}

		}
	})
}



function jt_link_coming_soon(){

	$('.jt-link-coming-soon').on('click', function(e){

		e.preventDefault();

		var alert_coming_soon = $('body').hasClass('lang-ko') ? '준비중입니다.' : 'Coming soon';

		JT.alert({message: alert_coming_soon});

	})
}



function career_intro_card(){

	if(!$('body').hasClass('page-template-career-intro')) return;

	// append
	$('body').append('<div class="career-intro-view"></div>');

	// each
	$('.career-intro__item').each(function(i){

		var $this = $(this);
		var $innerContent = $(this).find('.career-intro__content').html();
		var $section = $(this).parents('.career-intro-section');

		// add view
		$('.career-intro-view').html('<div class="career-intro__content"></div><div class="career-intro__close"></div>');

		// open (mobile)
		$this.on('click', function(){

			if( $this.hasClass('active') ) return;

			if(JT.is_screen(1023)){

				var this_width = $(this).width();
				var this_height = $(this).height();
				var pos_top = $(this).offset().top;
				var pos_left =$(this).offset().left;
				var content_padding = $(this).find('.career-intro__content').css('paddingTop');

				// add attr (help close)
				$('.career-intro-view').attr({
					'data-w' : this_width,
					'data-h' : this_height,
				});

				// scroll
				if( $('html').hasClass('mobile') ) {
					var scroll_storage = $(window).scrollTop();
					$('body').attr('data-scrolltop' , scroll_storage);

					setTimeout(function(){
						$('body').addClass('open-career-iv--fixed').css('position', 'fixed');
					},300);
				}

				$('.career-intro-view').find('.career-intro__content').html($innerContent);

				// set pos
				$('.career-intro-view').css({
					'top' : pos_top - $(window).scrollTop(),
					'left' : pos_left,
					'width' : this_width,
					'height' : this_height,
					'opacity': 1,
					'visibility': 'visible'
				});

				// change full view
				gsap.to('.career-intro-view',{
					duration: .3,
					width : $(window).width(),
					height : window.innerHeight,
					x: -pos_left,
					y: $(window).scrollTop() - pos_top,
					force3D: true,
					// delay: .3,
					onStart: function(){
						JT.scroll.destroy(false);

						$('.career-intro-view').removeClass('active');
						gsap.to('.career-intro-view .career-intro__content', {duration: .3,paddingTop: (parseInt(content_padding) * 2) + 'px',onStart: function(){$('.career-intro-view .career-intro__content')[0].scrollTo(0,0);}});
						$this.addClass('active');
					},
					onComplete: function(){
						gsap.to('.career-intro__close', {duration: .3,autoAlpha: 1});
						// txt motion
						gsap.fromTo('.career-intro__content-txt-group > *', {y: 40,opacity: 0,rotation: 0.1}, {duration: .5,y: 0,opacity: 1,rotation: 0,force3D: true,ease: 'sine.out'});
					}
				})
			}
		})

		// close (mobile)
		$('.career-intro__close').on('click', function(){

			var this_width = $('.career-intro-view').attr('data-w');
			var this_height = $('.career-intro-view').attr('data-h');

			if(JT.is_screen(1023)){

				gsap.killTweensOf('.career-intro__content-txt-group > *');

				var content_padding = $('.career-intro__content').css('paddingTop');

				// hide desc
				gsap.to('.career-intro__content-txt-group > *', {
					duration: 0,
					opacity: 0,
					onComplete: function(){
						gsap.to('.career-intro-view',{
							duration: .3,
							width : this_width,
							height : this_height,
							x: 0,
							y: 0,
							force3D: true,
							onStart: function(){
								$('body').removeAttr('style');
								window.scrollTo(0 , $('body').attr('data-scrolltop'));
								$('body').removeClass('open-career-iv--fixed');

								//$('.career-intro-view .career-intro__content').removeAttr('style');
								gsap.to('.career-intro-view .career-intro__content', {duration: .3, paddingTop: (parseInt(content_padding)) + 'px'})

								gsap.to('.career-intro__close', {duration: .3,autoAlpha: 0});
							},
							onComplete: function(){
								// hide view
								gsap.to('.career-intro-view', {duration: .3,autoAlpha: 0});

								JT.scroll.restore(false);

								$('.career-intro__item').removeClass('active');
								$('.career-intro-view').removeClass('career-intro-view--culture');
							}
						})
					}
				});
			}
		})

	})

	// Hover (desktop)
	$('.career-intro__item').each(function() {

		if( $(this).hasClass('career-intro__item--active') ) { return; }

		var $this = $(this);
		var $txt_content = $this.find('.career-intro__content');
		var $txt_group = $this.find('.career-intro__content-txt-group');

		$this.on({
			mouseenter: function(){
				if(!JT.is_screen(1023)){
					gsap.killTweensOf( $txt_content );
					gsap.killTweensOf( $txt_group.find('> *') );

					gsap.to($txt_content, {duration: .4,backgroundColor: 'black',ease: 'sine.out'});
					gsap.fromTo($txt_group.find('> *'), {y: 40,opacity: 0,rotation: 0.1}, {duration: .5,y: 0,opacity: 1,rotation: 0,force3D: true,ease: 'sine.out'});
				}
			},
			mouseleave: function(){
				if(!JT.is_screen(1023)){
					gsap.killTweensOf( $txt_content );
					gsap.killTweensOf( $txt_group.find('> *') );

					gsap.to($txt_content, {duration: .5,backgroundColor: 'transparent',ease: 'sine.out',});
					gsap.to($txt_group.find('> *'), {duration: .4,opacity: 0,ease: 'sine.out'});
				}
			}
		});

	});
}



function article_visual_motion(){

    var $visual = $('.article-header__visual-bg, .article-header__banner-bg');

    if( !!$visual.length ) {

        $visual.imagesLoaded( { background: true }, function() {
    		$visual.addClass('loaded');
    	});

    }

}



function visual_vid_popup(){

    var autoplay = ($('html').hasClass('mobile')) ? "" : '?autoplay=1&muted=1';

	if(!$('.jt-vid-popup-btn').length) return;

    $('.jt-vid-popup-btn').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'player.vimeo.com/',
                    id: '/',
                    src: '//player.vimeo.com/video/%id%'+autoplay
                }
            }
        },
		callbacks: {
			open: function() {
				$('.mfp-close').removeAttr('title');
				$('body').addClass('mfp-popup-open');
			},
			afterClose: function() {
				$('body').removeClass('mfp-popup-open');

				// Resume video player
				$('.jt-fullvid-container iframe').each(function(){
					var video = new Vimeo.Player(this);
					video.play();
				});

			},
		}
	});

}


function career_menu_scroll(){

    // scroll left
	var $scroll_area = $('.career-nav__list-wrap');
	var $target = $('.career-nav__list-item--active > a');
	if($target.length > 0){
		var left_pos = $target.offset().left - $scroll_area.offset().left + $scroll_area.scrollLeft();
		var offset = $('#logo').position().left;

		if($target.offset().left + $target.outerWidth() > $scroll_area.width()){
			$scroll_area.stop().animate( { scrollLeft: left_pos - offset }, 0);
		}
	}
}

function footer_marquee(){

	var $el = $('.footer__marquee');

	if( !$el.length ) return;

	$el.each(function(idx){

		var $this = $(this);

		if(!$this.is(":visible")) { return true; }

		var con_width = $this.width();
		var $wrap = null;

		$this.empty();

		$this.append('<div class="footer__marquee-inner"><span class="sample">'+$this.attr('data-label')+'</span></div>');
		$wrap = $this.find('.footer__marquee-inner');

		var char_width = $wrap.find('.sample').width();
		var count = Math.ceil(con_width/char_width) + 1;
		$wrap.empty(); // delete sample

		var html = '';
		for(i = 0; i<2; i++) {

			html += '<span>';

			for(j = 0; j<count; j++) {
				html += '<i>' + $this.attr('data-label') + '</i>';
			}

			html += '</span>'

		}
		$wrap.append(html);
		label_type_marquee_resize();

		$('img[loading="lazy"]').on('load', label_type_marquee_resize);

	});



}



function label_type_marquee_resize(){

	var $el = $('.footer__marquee');

	if( !$el.length ) return;

	$el.each(function(idx){

		var $this = $(this);
		var this_id = 'st-marquee-' + idx;

		if(!$this.is(":visible")) { return true; }

		var $wrap = $this.find('.footer__marquee-inner');

		var divNum = null;

		if(JT.is_screen(768)){
			divNum =  65;
		} else {
			divNum =  120;
		}

		var speed = $wrap.find('> span').width() / divNum;
		$wrap.find('> span').attr('data-duration', speed+'s');
		/*
		ScrollTrigger.refresh()
		ScrollTrigger.create({
			trigger: $this,
			id: this_id,
			once: false,
			onEnter: function(){
				$wrap.find('> span').css('animation-duration', $wrap.find('> span').data('duration'));

				// IE support trick
				if($('html').hasClass('ie11') || $('html').hasClass('ie10') || $('html').hasClass('ie9')){
					$wrap.find('> span').css('animation-name', 'x');
					setTimeout(function(){
						$wrap.find('> span').css('animation-name', '');
					}, 10);
				}
			},
			onEnterBack: function(){
				$wrap.find('> span').css('animation-duration', $wrap.find('> span').data('duration'));

				// IE support trick
				if($('html').hasClass('ie11') || $('html').hasClass('ie10') || $('html').hasClass('ie9')){
					$wrap.find('> span').css('animation-name', 'x');
					setTimeout(function(){
						$wrap.find('> span').css('animation-name', '');
					}, 10);
				}
			},
			onLeave: function(){
				$wrap.find('> span').removeAttr('style');
			},
			onLeaveBack: function(){
				$wrap.find('> span').removeAttr('style');
			}
		});
		*/
		$wrap.find('> span').css('animation-duration', $wrap.find('> span').data('duration'));

		// IE support trick
		if($('html').hasClass('ie11') || $('html').hasClass('ie10') || $('html').hasClass('ie9')){
			$wrap.find('> span').css('animation-name', 'x');
			setTimeout(function(){
				$wrap.find('> span').css('animation-name', '');
			}, 10);
		}
	});
}



function career_people_hover(){

	$('.jt-accordion--people').on({
		mouseenter: function(){
			if(!JT.is_screen(1023)){
				var $this = $(this);
				var $thumb = $(this).find('.jt-accordion__people-thumb');
				var $img = $(this).find('.jt-accordion__people-thumb > img');

				if( !$thumb.length ) { return; }

				if (!$this.hasClass('jt-accordion--active')){
					
					TweenMax.to($thumb, .3, {
						autoAlpha: 1,
						ease: Power0.easeNone
					});

					$this.bind('mousemove', function(e){
						var center_x = $thumb.offset().left + $thumb.width() / 2;
						var center_y = $thumb.offset().top + $thumb.height() / 2;
						var tween_x = e.pageX - center_x;
						var tween_y = e.pageY - center_y;
	
						TweenMax.to($img, 1.3, {
						  x: tween_x / 10,
						  y: tween_y / 10,
						  ease: Power3.easeOut
						});
					});
				}

			}
		},
		mouseleave: function(){
			if(!JT.is_screen(1023)){

				var $this = $(this);
				var $thumb = $(this).find('.jt-accordion__people-thumb');

				if( !$thumb.length ) { return; }

				TweenMax.to($thumb, .3, {
					autoAlpha: 0,
					ease: Power0.easeNone
				});

				$this.unbind('mousemove');
			}
		}
	}, '.jt-accordion__title');
}


/* **************************************** *
 * Helper
 * **************************************** */
// Vimeo script on demand
function jt_vimeo_ready(callback){

	if(typeof callback != 'function') return;

	if(typeof Vimeo == 'undefined'){
		$.getScript('https://player.vimeo.com/api/player.js',function(){
			return callback();
		});
	}else{
		return callback();
	}

}

jt_newsroom_ajax();
function jt_newsroom_ajax(){

	var $wrapper = $( '.jt-newsroom_wrap' );

	$wrapper.on( 'click', '.jt-notice-list-wrap .jt-pagination a, .jt-press-list-wrap .jt-pagination a', function () {

		var $this   = $( this );
		var $form   = $this.closest( '.jt-newsroom_form' );
		var url     = $this.attr( 'href' );

		$.get( url, function ( res ) {

			$wrapper.html( $( '.jt-newsroom_wrap', $( res ) ).html() );

			JT.ui.init();

			$( 'html, body' ).animate( { scrollTop: $form.offset().top - 100 } );

			window.history.pushState( '', '', url );

		} );

		return false;


	} );

	$wrapper.on( 'click', '.jt-newsroom_form .jt-newsroom-tab a', function () {

		var $form = $( this );
		$(this).parent().addClass('active');

		var url= $( this ).attr('href');
		$.get( url, $form.serialize(), function ( res ) {

			var $res = $( res );
			var $target = $( $( '.jt-newsroom_form', $res ).html() );

			$( '.jt-newsroom_form' ).html( $target );
			window.history.pushState( '', '', $form.attr( 'action' )  );

			JT.ui.call('lazyload_init');
			JT.ui.call('jt_board_list_fullclick');

			// scroll top
			$('html,body').animate({
				scrollTop : ($('.jt-newsroom_form').offset().top) - ($('#header').height() * 2)
			});

		} );

	return false;

	} );

}



}); // End jQuery
