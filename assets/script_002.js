jQuery(function($) {

    recruit_actions();

    function recruit_actions() {

        var $wrapper = $( '.jt-recruit-list-wrap' );
        
        $wrapper.on( 'change', '.jt-recruit_form select[name=search_task], .jt-recruit_form select[name=search_type], .jt-recruit_form select[name=search_team]' , function () {
            if( 
                ( $('[name=search_team]', $wrapper ).val() || '' ) == ( $( '.search_team_val', $wrapper ).val() || '' ) && 
                ( $('[name=search_task]', $wrapper ).val() || '' ) == ( $( '.search_task_val', $wrapper ).val() || '' ) && 
                ( $('[name=search_type]', $wrapper).val() || '' ) == ( $( '.search_type_val', $wrapper ).val() || '' ) 
            ) {
                return false;

            } else {

                $( this ).closest( 'form' ).submit();

            }
            
        } );

        /*
            $wrapper.on( 'click', '.jt-recruit_form .jt-btn-reset a' , function () {
                $( this ).closest( 'form' ).submit();
            } );
        */

        $wrapper.on( 'click', '.jt-pagination a, .jt-list-nothing a', function () {
            
            var $this   = $( this );
            var $form   = $this.closest( '.jt-recruit_form' );
            var url     = $this.attr( 'href' );

            $.get( url, function ( res ) {

                $wrapper.html( $( '.jt-recruit-list-wrap', $( res ) ).html() );

                JT.ui.init();

                // scroll
				if(JT.is_screen(860)){
					$( 'html, body' ).animate( { scrollTop: $('.career-recruit').offset().top } );
				}else {
					if(JT.is_screen(1023)){
						$( 'html, body' ).animate( { scrollTop: $('.jt-recruit-filter').offset().top - 72 } );
					}else{
						$( 'html, body' ).animate( { scrollTop: $('.jt-recruit-filter').offset().top - 110 } );
					}
                }

                window.history.pushState( '', '', url );

            } );

            return false;


        } );

        $wrapper.on( 'submit', '.jt-recruit_form', function () {

            var $form = $( this );
            var $url  = $form.attr( 'action' ); // $( '.jt-recruit_form_url').val;
            $.get( $url, $form.serialize(), function ( res ) {

                $wrapper.html( $( '.jt-recruit-list-wrap', $( res ) ).html() );

                JT.ui.init();

                $( '.jt-pagination' ).html( $( '.jt-pagination', $( res ) ).html() );
                window.history.pushState( '', '', $form.attr( 'action' ) + '?' + $form.serialize() );
	
				// scroll
				if(JT.is_screen(860)){
					$( 'html, body' ).animate( { scrollTop: $('.career-recruit').offset().top } );
				}else {
					if(JT.is_screen(1023)){
						$( 'html, body' ).animate( { scrollTop: $('.jt-recruit-filter').offset().top - 72 } );
					}else{
						$( 'html, body' ).animate( { scrollTop: $('.jt-recruit-filter').offset().top - 110 } );
					}
                }

            } );

            return false;

        } );

    }



});