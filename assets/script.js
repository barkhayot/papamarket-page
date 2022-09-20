/*
 * File       : modules/faq/script.js
 * Author     : STUDIO-JT (KMS)
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
JT.ui.add( jt_accordion, true );



/* **************************************** *
 * Functions
 * **************************************** */
/**
 * JT ACCORDION
 *
 * @version 1.1.0
 * @since 2020-02-10
 * @author STUDIO-JT (KMS, NICO)
 *
 * @example
 * Markup sample
 * <div class="jt-accordion">
 *     <div class="jt-accordion__title">
 * 			<div class="jt-accordion__state"><span lang="en">Q</span></div>
 * 			<div class="jt-accordion__questions"><p>TITLE</p></div>
 * 			<div class="jt-accordion__control"><i class="sr-only">펼치기/접기</i></div>
 *     </div>
 *     <div class="jt-accordion__content">
 * 			<div class="jt-accordion__content-inner">
 * 			    CONTENT
 * 			</div>
 *     </div>
 *     .....
 * </div>
 */
function jt_accordion() {

	// 첫 게시물에 active 클래스 추가
	$('.jt-accordion:not(.jt-accordion--people) .jt-accordion__title').first().addClass('jt-accordion--active');
	$('.jt-accordion:not(.jt-accordion--people) .jt-accordion__content').first().addClass('jt-accordion--active');

	// Toggle the accordion
	// Delegate click event to keep alive after adding content via ajax
	$('.jt-accordion').on('click', '.jt-accordion__title', function(){

		var $title = $('.jt-accordion__title');
		var $content = $('.jt-accordion__content');
		$title.not($(this)).removeClass('jt-accordion--active');
		$content.not($(this).next()).removeClass('jt-accordion--active').find('.jt-accordion__content-inner').slideUp();
		$(this).toggleClass('jt-accordion--active').next().toggleClass('jt-accordion--active').find('.jt-accordion__content-inner').slideToggle();

		return false;

	});

}



}); // End jQuery
