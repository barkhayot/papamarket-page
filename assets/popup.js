/*
 * File       : js/popup.js
 * Author     : STUDIO-JT (HEE)
 * Guideline  : JTstyle.1.0
 *
 * Dependency : js/jt.js
 *
 * SUMMARY:
 * 1) INIT
 * 2) Functions
 */




jQuery(function($) {



/* **************************************** *
 * INIT
 * **************************************** */
jt_popup_slider(true);
jt_popup_close();



/* **************************************** *
 * Functions
 * **************************************** */
function jt_popup_slider(first){

	$('.jt-popup--slideshow').each(function(){

		var $this = $(this);
		var $slider = $this.find('.swiper-container');
		var $slider_item = $this.find('.jt-popup__item');
		var switch_color = function(index){
			var $strap_slider = $('.jt-popup--strap');
			var $current_slide = $strap_slider.find('.swiper-slide').eq(index);
			var color = $current_slide.attr('data-controlcolor');
			var $control = $strap_slider.find('.jt-popup__control');

			$strap_slider.find('.jt-popup__close').css('color',color);
			$control.find('.jt-popup__arrow').css('color',color);
			$control.find('.swiper_play_state_btn').css('color',color);
			$control.find('.swiper_play_state_btn svg path').css('fill',color);

			setTimeout(function(){
				$control.find('.swiper-pagination-bullet').css({'borderColor':color,'backgroundColor':'transparent'});
				$control.find('.swiper-pagination-bullet-active').css('backgroundColor',color);
			}, 10)
		}

		if( !$slider.length ) return;

		if( $this.hasClass('jt-popup--strap')){ // strap
			if( $slider_item.length < 2) return;
		} else { // floating
            if( !first ) return;
        }

		// swiper option
		var slider_options = {
			effect : 'fade',
			loop: true,
			slidesPerView: 1,
			navigation: {
				nextEl: '.jt-popup--strap .jt-popup__control .jt-popup__arrow--right',
				prevEl: '.jt-popup--strap .jt-popup__control .jt-popup__arrow--left',
			},
			pagination: {
				el: '.jt-popup--strap .jt-popup__control .swiper-pagination',
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '"><i><em class="sr_only">' + (index + 1) + '</em></i></span>';
				}
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: true
			},
			on: {
				init: function () {
					switch_color(this.activeIndex);

					if(!first) {
						// reinit
						$slider.find('.jt-popup__item').each(function(){
							var $this = $(this);
							$this.css( $this.data('bgtype') , $this.data('bgcolor') );
						});
					}
				},
				slideChange : function(){
					switch_color(this.activeIndex);
				}
			}
		}

		// init swiper
		var swiper = new Swiper($slider, slider_options);

		// autoplay setting
		$('.jt-popup__control .swiper_play_state').on('click', function(){
			if($(this).hasClass('play')){
				swiper.autoplay.stop();
				$(this).removeClass('play').addClass('pause');
			} else {
				swiper.autoplay.start();
				$(this).removeClass('pause').addClass('play');
			}
		});

	});
}



function jt_popup_close(){

    $('.jt-popup__close').on('click',function(){

        var $this   = $( this );
	    var $parent = $this.closest( '.jt-popup' );
	    var hide_key_type = "";

        // hide
	    $parent.hide();
		$('body').removeClass('show_popup');

		// display only once in this tab
        if($parent.hasClass('jt-popup--strap')){
            hide_key_type = "hide_popup_strap";
        }

        JT.cookies.create('hide_popup_strap','hide',1);

	});

}



});
