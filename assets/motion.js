/*
 * File       : js/motion.js
 * Author     : STUDIO-JT (Chaehee)
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



/* **************************************** *
 * Functions INIT
 * **************************************** */
global_motion();
parallax_motion();
visual_typo_motion();
career_process_motion();

$(window).on('load',function(){

});



/* **************************************** *
 * Functions
 * **************************************** */
function global_motion(){

	/*
	 * SIMPLE TEXT MOTION
	 *
	 * example    : [data-motion-type="rise"] - rise, fade, line, word
	 *              class="jt-motion--appear"               data-motion-type="rise" data-motion-start-offset="top 80%" data-motion-end-offset="top 60%" data-motion-duration="1"
	 *              class="jt-motion--appear jt-scrub"	    data-motion-type="rise" data-motion-start-offset="top 80%" data-motion-end-offset="top 60%" data-motion-duration=".7"
	 *              class="jt-motion--appear jt-split-text" data-motion-type="fade" data-motion-start-offset="top 80%" data-motion-end-offset="top 60%" data-motion-duration=".7"
	 *              class="jt-motion--appear jt-split-text" data-motion-type="line" data-motion-start-offset="top 80%" data-motion-end-offset="top 60%" data-motion-duration=".8"
	 *              class="jt-motion--appear jt-split-text" data-motion-type="word" data-motion-start-offset="top 80%" data-motion-end-offset="top 60%" data-motion-duration=".7" data-motion-y="0"
	 */
	var $motion_el = $('.jt-motion--appear');

	$motion_el.each(function(){

		var $this = $(this);

		var type = $this.attr('data-motion-type');
		var start_offset = $this.attr('data-motion-start-offset');
		var end_offset = $this.attr('data-motion-end-offset');
		var duration = $this.attr('data-motion-duration');
		var easing = $this.attr('data-motion-ease');
		var scrub = false;

		if($this.hasClass('jt-scrub')){
			scrub = 1;
		}

		if( type == undefined ) { type = 'rise'; }
		if( start_offset == undefined ) { start_offset = 'top 80%'; }
		if( end_offset == undefined ) { end_offset = 'top 60%'; }

		if( type == 'rise' ) {

			if( duration == undefined ) { duration = 1; }
			if( easing == undefined ) { easing = 'none'; }

			// set position
			var rise_y_set = 100;
			if( JT.is_screen(1023) ) { rise_y_set = 60; }

			gsap.set($this, {y: rise_y_set, autoAlpha: 0, rotation: 0.1});

			// trigger
			gsap.to($this, parseFloat(duration), {
				y: 0,
				autoAlpha: 1,
				rotation: 0,
				force3D: true,
				ease: easing,
				scrollTrigger: {
					trigger: $this,
					start: start_offset,
					end: end_offset,
					scrub: scrub
				}
			});

		} else if( type == 'fade' ) {

			if( duration == undefined ) { duration = 1; }
			if( easing == undefined ) { easing = 'power1.out'; }

			gsap.set($this, {autoAlpha: 0, rotation: 0.1});

			// trigger
			gsap.to($this, parseFloat(duration), {
				autoAlpha: 1,
				rotation: 0,
				force3D: true,
				ease: easing,
				scrollTrigger: {
					trigger: $this,
					start: start_offset,
					end: end_offset,
					scrub: scrub
				}
			});

		} else if( type == 'chars' ) {

			if( duration == undefined ) { duration = .7; }
			if( easing == undefined ) { easing = 'power1.out'; }

			// split text
			if( !$this.hasClass('jt-split-text--complete') ){
				new SplitText($this,{type: 'words, chars',wordsClass: 'jt-split-text--word',charsClass: 'jt-split-text--char'});
			}

			gsap.set($this.find('.jt-split-text--char'), {y: 20, opacity: 0, rotation: 0.1});
			$this.addClass('jt-split-text--complete');

			// trigger
			gsap.to($this.find('.jt-split-text--char'), parseFloat(duration), {
				y: 0,
				opacity: 1,
				rotation: 0,
				force3D: true,
				ease: easing,
				stagger: .05,
				scrollTrigger: {
					trigger: $this,
					start: start_offset,
					end: end_offset,
					scrub: scrub
				}
			});

		} else if( type == 'line' ) {

			if( duration == undefined ) { duration = .8; }

			// split text
			if( !$this.hasClass('jt-split-text--complete') ){
				new SplitText($this, {type: 'lines',linesClass: 'jt-split-text--line'});
				$this.find('.jt-split-text--line').wrap('<div class="jt-split-text--line-wrap"></div>');
			}

			gsap.set($this.find('.jt-split-text--line'), {y: 80, autoAlpha: 0, rotation: 0.1});
			$this.addClass('jt-split-text--complete');

			// trigger
			gsap.to($this.find('.jt-split-text--line'), parseFloat(duration), {
				y: 0,
				autoAlpha: 1,
				rotation: 0,
				force3D: true,
				//ease: 'power1.inOut',
				stagger: .2,
				scrollTrigger: {
					trigger: $this,
					start: start_offset,
					end: end_offset,
					scrub: scrub
				}
			});

		} else if( type == 'word' ) {

			if( duration == undefined ) { duration = .7; }
			if( easing == undefined ) { easing = 'power1.out'; }

			//
			var word_y_set = parseFloat( $this.attr('data-motion-y') );
			var word_y_helper = 0.1;

			if( duration == undefined ) {
				word_y_set = 0;
				word_y_helper = 0;
			}

			// split text
			if( !$this.hasClass('jt-split-text--complete') ){
				new SplitText($this,{type: 'words',wordsClass: 'jt-split-text--word'});
			}

			gsap.set($this.find('.jt-split-text--word'), {y: word_y_set,rotation: word_y_helper,opacity: 0});
			$this.addClass('jt-split-text--complete');

			// trigger
			gsap.to($this.find('.jt-split-text--word'), parseFloat(duration), {
				y: 0,
				rotation: 0,
				opacity: 1,
				force3D: true,
				ease: easing,
				stagger: .05,
				scrollTrigger: {
					trigger: $this,
					start: start_offset,
					end: end_offset,
					scrub: scrub
				}
			});

		}

	});
}



function parallax_motion(){

	$('.parallax-motion-x').each(function(){

		var $this = $(this);
		var bottomTop = $this.attr('data-bottom-top');
		var topBottom = $this.attr('data-top-bottom');

		if($(this).hasClass('footer__typo') && JT.is_screen(860)){
			return;
		}

		gsap.fromTo($this,{
			x: bottomTop
		},{
			x: topBottom,
			ease: 'power1.out',
			scrollTrigger : {
				trigger : $this,
				scrub : 0.2
			}
		});

	})

	$('.parallax-motion-y').each(function(){

		var $this = $(this);
		var bottomTop = $this.attr('data-bottom-top');
		var topBottom = $this.attr('data-top-bottom');

		gsap.fromTo($this,{
			y: bottomTop
		},{
			y: topBottom,
			ease: 'power1.out',
			scrollTrigger : {
				trigger : $this,
				scrub : 0.2
			}
		});

	})
}



function visual_typo_motion(){

	var $motion_typo = $('.jt-visual-text');
	var delay = 2;

	$motion_typo.each(function(idx){

		var $this = $(this);

		if( !$this.hasClass('jt-split-text--complete') ){
			new SplitText($this, {type: 'lines',linesClass: 'jt-split-text--line'});
			$this.find('.jt-split-text--line').wrap('<div class="jt-split-text--line-wrap"></div>');
		}

		gsap.fromTo($this.find('.jt-split-text--line'), 1, {
			y: '40',
			autoAlpha: 0,
			rotation: 0.1
		}, {
			y: '0',
			autoAlpha: 1,
			rotation: 0,
			force3D: true,
			ease: 'Power1.out',
			delay: ((idx+delay)*0.15),
			stagger: .1,
			onStart: function(){
				$this.addClass('jt-split-text--complete');
			},
			onComplete: function(){
				if($('.jt-vid-popup-btn').length){
					gsap.fromTo('.jt-vid-popup-btn', {autoAlpha: 0},{autoAlpha: 1, duration: .3, ease: 'Power1.out', 
						onStart: function(){
							$('.jt-vid-popup-btn').addClass('jt-vid-popup-btn--show')
						}
					});
				}
			}
		});
	})

}



function career_process_motion(){

    var $el = $('.career-process__step-item');

	if(!$el.length) return;

    gsap.fromTo($el, {
		autoAlpha:0, 
		y:0
	},{
		duration: 1, 
		autoAlpha:1, 
		y:0, 
		ease: 'power1.out',
		stagger: 0.2,
		scrollTrigger: {
			trigger: $el,
		}
	});

}



});
