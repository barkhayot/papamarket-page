'use strict';

/**
 * JT javascript UI library
 * @namespace
 * @description UI library create to help front end developement
 */
var JT = JT || {};

(function(win, $) {

    /**
     * Custom Alert helper
     *
     * @version 1.1.0
     * @since 2018-02-12
     * @author STUDIO-JT (NICO)
     *
     * @param {string|object} args - the message or an options object for more custom.
     * @param {string} args.message - 알림 메시지 내용
     * @param {string} [args.title=false] - 알림 메시지 제목
     * @param {string} [args.style=basic] - 미리 정의 된 스타일은 "basic", "classic"이며 원하는 클래스 이름을 추가하여 확장 할 수 있습니다
     * @param {string} [args.type=none] - 미리 정의 된 스타일은 "info", "success", "warning", "error"이며 원하는 클래스 이름을 추가하여 확장 할 수 있습니다
     * @param {string} [args.has_icon=false] - 알림 메세지의 상태를 나타내는 아이콘을 메세지 상단에 추가합니다
     * @param {string} [args.primary_title=false] - 확장된 제목 스타일을 제공합니다
     * @param {string} [args.is_confirm=false] - 컨펌 타입 Alert 출력 (취소버튼 추가로 제공)
     * @param {string} [args.primary_button=true] - 확장된 버튼 스타일을 제공합니다
     * @param {string} [args.button_icon=true] - 버튼에 고유 아이콘을 추가로 제공합니다
     * @param {string} [args.ok=확인] - 확인 버튼 커스텀 텍스트
     * @param {string} [args.cancel=취소] - 취소 버튼 커스텀 텍스트
     * @param {callback} [args.on_confirm] - 확인 버튼을 눌렀을때 실행되는 콜백
     * @param {callback} [args.on_cancel] - 취소 버튼을 눌렀을때 실행되는 콜백
     * @param {callback} [cb] - 간단한 확인 콜백
     *
     * @todo create custom ui
     *
     * @example
     * // String minimal required option :
     * JT.alert('Some alert message');
     *
     * // String type with callback :
     * JT.alert('Some alert message', function(){
     *     console.log('Alert 끝!');
     * });
     *
     * // Object type parameter옵션 :
     * JT.alert({
     *	   title       : '유효성 검사 안내',
     *     message     : '개인정보수집 및 이용안내에 동의하여 주십시오.',
     *     ok          : '확인 버튼 커스텀 텍스트',
     *     cancel      : '취소 버튼 커스텀 텍스트',
     *     style       : 'classic',
     *     type        : 'success',
     *     button_icon : false,
     *     on_confirm  : function(){
     *         console.log('Alert 끝!');
     *     },
     *     on_cancel   : function(){
     *         console.log('Alert 취소!');
     *     }
     * });
     *
     */
    JT.alert = function(args,cb){

        if(typeof args !== 'object' && typeof args !== 'string') return;

        if(typeof cb == 'undefined') {
            cb = '';
        }

        var message, title, style, type, has_icon, primary_title, is_confirm, primary_button, button_icon, ok, cancel, on_confirm, on_cancel;

        // string or object parameter
        if(typeof args == 'object'){
            message = args.message;
            on_confirm = args.on_confirm;
            on_cancel = args.on_cancel;
        }else{
            message = args;
        }

        // if has on_confirm callback second parameter (TODO : improve the parameter 확인 logic)
        if(typeof cb == 'function' && typeof args != 'object'){
            on_confirm = cb;
        }

        // set default value
        title = (typeof args.title != 'undefined') ? args.title : false;
        message = (typeof args.message != 'undefined') ? args.message : false;
        style = (typeof args.style != 'undefined') ? args.style : 'basic';
        type = (typeof args.type != 'undefined') ? args.type : 'none';
        has_icon = (typeof args.has_icon != 'undefined' && args.type != 'none' && args.has_icon) ? true : false;
        primary_title = (typeof args.primary_title != 'undefined') ? args.primary_title : false;
        is_confirm = (typeof args.is_confirm != 'undefined') ? args.is_confirm : false;
        primary_button = (typeof args.primary_button != 'undefined') ? args.primary_button : true;
        button_icon = (typeof args.button_icon != 'undefined') ? args.button_icon : true;
        ok = (typeof args.ok != 'undefined') ? args.ok : '확인';
        cancel = (typeof args.cancel != 'undefined') ? args.cancel : '취소';

        // Get a unique id
        var now  = new Date().getTime();
        var uid  = now / 1000 | 0;
        var id   = 'jt-alert--' + uid;

        // defined class
        var css_class = 'jt-alert';

        css_class += ' jt-alert__style-' + style;
        css_class += ' jt-alert__type-' + type;

        if(has_icon){
            css_class += ' jt-alert--has-icon';
        }

        if(is_confirm){
            css_class += ' jt-alert--confirm';
        }

        if(primary_title){
            css_class += ' jt-alert--primary-title';
        }

        if(primary_button){
            css_class += ' jt-alert--primary-button';
        }

        if(button_icon){
            css_class += ' jt-alert--button-icon';
        }

        if(!message){
            css_class += ' jt-alert--no-message';
        }

        // html 생성
        var html = '';

        html +=  '<div id="'+ id +'" class="'+css_class+'" role="alert">';
            html +=  '<div class="jt-alert__container">';
                html +=  '<div class="jt-alert__content">';
                    if(title){
                        html += '<h1>'+ title+'</h1>';
                    }
                    if(message){
                        html += '<p>'+ message+'</p>';
                    }
                html +=  '</div> ';
                html +=  '<div class="jt-alert__actions">';
                    if(is_confirm){
                        html +=  '<button class="jt-alert__btn jt-alert--cancel">'+cancel+'</button>';
                    }
                    html +=  '<button class="jt-alert__btn jt-alert--ok">'+ok+'</button>';
                html +=  '</div>';
            html +=  '</div> ';
        html +=  '</div> ';

        // Body 안에 추가
        $('body').append(html);

        // A11y - focus
        $('#'+ id +' .jt-alert--ok').attr('tabindex', 0).focus();

        // callback
        $('#'+ id).find('.jt-alert--ok').on('click', function(e) {
            e.preventDefault();
            $('#'+ id).remove();

            if(typeof on_confirm === 'function'){
                on_confirm();
            }
        });

        $('#'+ id).find('.jt-alert--cancel').on('click', function(e) {
            e.preventDefault();
            $('#'+ id).remove();

            if(typeof on_cancel === 'function'){
                on_cancel();
            }

        });

        // ESC keyevent 연동
        var esc = function(e){
            if (e.which == '27') {
                $('#'+ id).remove();
            }
        };
        $(document).off('keyup', esc);
        $(document).on('keyup', function(e){
            esc(e);
        });

    };



    /**
     * Custom confirm helper
     *
     * @version 1.0.0
     * @since 2018-02-12
     * @author STUDIO-JT (NICO)
     *
     * @todo create custom ui
     *
     * @example
     * // Basic usage :
     * JT.confirm('Some confirm message');
     */
    JT.confirm = function(msg){
        confirm(msg);
    };



    /**
     * Animated ScrollTo helper
     *
     * @version 1.0.0
     * @since 2018-02-12
     * @author STUDIO-JT (NICO)
     *
     * @todo Add call when transition ended
     *
     * @example
     * // Basic usage :
     * JT.scrollTo('#my_traget');
     */
    JT.scrollTo = function(target,container){
        var $target = $(target);
        var offset = 10;
        var $container, container;

        if($target.length > 0){
            if(container == undefined || $(container).length <= 0){
                $container = $("html");
            } else {
                $container = $(container);
            }

            $container.stop().animate({
                scrollTop: ($target.offset().top - $container.offset().top + $container.scrollTop()) - offset
            },function(){
                //console.log('complete');
            });

        }
    };



    /**
     * Smooth scroll with gsap (TODO : make a plugin)
     *
     * @version 1.0.0
     * @since 2018-02-03
     * @author STUDIO-JT (NICO)
     * @requires gsap.min.js
     * @requires ScrollToPlugin.min.js
     */
    JT.smoothscroll = {

        passive : function(){
            var supportsPassive = false;
            try {
              document.addEventListener("test", null, { get passive() { supportsPassive = true }});
            } catch(e) {}

            return supportsPassive;
        },
        init : function(){

            if($('html').hasClass('mobile') || $('html').hasClass('mac')) return;

            var $window = $(window);
            var scrollTime = 1;
            var distance_offset = 2.5;
            var scrollDistance = $window.height() / distance_offset;

            if(this.passive()){
                window.addEventListener("wheel",this.scrolling,{passive: false});
            }else{
                $window.on("mousewheel DOMMouseScroll", this.scrolling);
            }

        },
        destroy : function(){

            if(this.passive()){
                window.removeEventListener("wheel",this.scrolling);
            }else{
               $(window).off("mousewheel DOMMouseScroll", this.scrolling);
            }
            gsap.killTweensOf($(window),{scrollTo:true});

        },
        scrolling : function(event){

            event.preventDefault();

            var $window = $(window);
            var scrollTime = 1;
            var distance_offset = 2.5;
            var scrollDistance = $window.height() / distance_offset;
            var delta = 0;

            if(JT.smoothscroll.passive()){
                delta = event.wheelDelta/120 || -event.deltaY/3;
            }else{
                if(typeof event.originalEvent.deltaY != "undefined"){
                    delta = -event.originalEvent.deltaY/120;
                }else{
                    delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
                }
            }

            var scrollTop = $window.scrollTop();
            var finalScroll = scrollTop - parseInt(delta*scrollDistance);

            gsap.to($window, scrollTime, {
                scrollTo : { y: finalScroll, autoKill:true },
                ease: Power3.easeOut,
                overwrite: 5
            });


        }

    };



    /**
     * Destroy or restore scroll mousewheel
     *
     * @version 1.0.0
     * @since 2020-07-14
     * @author STUDIO-JT (NICO,KMS)
     *
     * @example
     * // Basic usage (destroy scroll with true argument if smoothscroll is used ):
     * JT.scroll.destroy(true);
     */

    JT.scroll = {
        // window scroll event on/off
        destroy : function(has_smoothscroll){
            if(typeof has_smoothscroll != "undefined" && has_smoothscroll === true){
                JT.smoothscroll.destroy();
            }

            if(this.support_passive()){
                window.addEventListener("wheel",this.prevent_default,{passive: false});
            }else{
                $(window).on("mousewheel DOMMouseScroll", this.prevent_default);
            }
        },

        restore : function(has_smoothscroll){
            if(typeof has_smoothscroll != "undefined" && has_smoothscroll === true){
                JT.smoothscroll.init();
            }

            if(this.support_passive()){
                window.removeEventListener("wheel", this.prevent_default);
            }else{
                $(window).off("mousewheel DOMMouseScroll", this.prevent_default);
            }
        },

        // scroll passive mode check
        support_passive : function(){
            var supportsPassive = false;
            try {
                document.addEventListener("test", null, { get passive() { supportsPassive = true }});
            } catch(e) {}

            return supportsPassive;
        },


        // disabled scroll
         prevent_default : function(event){
            event.preventDefault();
        }
    };




    /**
     * Check if screen is smaller than
     *
     * @description egal to css mediaqueries max-width
     * @version 1.0.0
     * @since 2018-02-12
     * @author STUDIO-JT (NICO)
     *
     * @example
     * // Basic usage :
     * JT.is_screen('767');
     */
    JT.is_screen = function(max_width){
        if(win.matchMedia){
            return win.matchMedia('(max-width:'+ max_width +'px)').matches;
        }else{
            return win.innerWidth <= max_width;
        }
    };




    /**
     * IOS friendly window height getter helper
     *
     * @description Check is is full screen (without address bar) or not and get the right window height
     * @version 1.0.0
     * @since 2020-12-11
     * @author STUDIO-JT (NICO)
     *
     * @example
     * // Basic usage :
     * var win_height = JT.win_height();
     */
    JT.win_height = function(){

        var win_height = 0;

        if(window.screen.height === window.innerHeight){
            // WITHOUT Address bar (fullscreen)
            win_height = window.screen.height;
        }else{
            win_height = window.innerHeight;
        }

        return win_height;
    };



    /**
     * Modal helper
     *
     * @description modal layer using maginific-popup.js
     *
     * @version 1.0.0
     * @since 2018-02-12
     * @author STUDIO-JT (NICO)
     * @requires jquery.magnific-popup.js
     * @see {@link http://dimsemenov.com/plugins/magnific-popup/|magnific-popup API}
     * @todo Nedd to be implement
     *
     */
    JT.modal = function(){
        //todo
    };



    /**
     * Empty object will store all custom global of the site
     *
     * @description Sometime variables or functions need to be accessible globally.
     * Use this object to store them, it avoid potentiel conflict with third party script.
     * Please use this functionality with wisdom you avoid memory issue
     *
     * @version 1.0.0
     * @since 2018-02-12
     * @author STUDIO-JT (NICO)
     *
     * @example
     * // Add global variable :
     * JT.globals.my_var = 'somthing';
     *
     * // Add global fucntion :
     * JT.globals.my_function = function(){
     *   // alert('something')
     * };
     */
    JT.globals = {};



    /**
     * Cookies helper
     *
     * @Crud your cookies
     *
     * @version 1.0.0
     * @since 2019-04-04
     * @author STUDIO-JT (NICO)
     * @see {@link https://www.quirksmode.org/js/cookies.html}
     *
     * @example
     * // Cookie 추가 (7일):
     * JT.cookies.create('jt_my_cookie_id','Cookie 내용',7);
     *
     * // Cookie 일기
     * JT.cookies.read('jt_my_cookie_id');
     *
     * // Cookie 삭제
     * JT.cookies.destroy('jt_my_cookie_id');
     */
    JT.cookies = {

        create : function(name,value,days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        },

        read : function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        },

        destroy : function(name) {
            JT.cookies.create(name,"",-1);
        }

    };


    /**
     * History manager
     *
     * @version 1.0.0
     * @since 2020-07-09
     * @author STUDIO-JT (NICO)
     *
     * @example
     * // Pop up
     * function popup_init(){
     *
     *   // Open event
     *   $('.popup-button').on('click',function(e){
     *
     *     e.preventDefault();
     *     open_popup();
     *     JT.history.add("popup01");
     *
     *   });
     *
     *   // Close event
     *   $('.popup__close').on('click',function(e){
     *
     *     e.preventDefault();
     *     close_popup();
     *     JT.history.remove("popup01");
     *
     *   });
     *
     *   // Back/forward event (if history change)
     *   JT.history.listen("popup01", open_popup, close_popup);
     *
     *   // Open - close closures
     *   function open_popup(){
     *     $('.popup').show();
     *   }
     *
     *   function close_popup(){
     *     $('.popup').hide();
     *   }
     *
     * }
     *
     * // Tab example : Hash 사용
     *
     * function tab_init(){
     *
     *   JT.history.listen('tab', open_tab, close_tab,true);
     *
     *   if(location.hash != ""){
     *     close_tab();
     *     open_tab(location.hash);
     *   }
     *
     *   // Open - close
     *   function open_tab(id){
     *     var new_index = $(id).index();
     *     $('.tab__content-section').eq(new_index).show();
     *   }
     *
     *   function close_tab(){
     *     $('.tab__content-section').hide();
     *   }
     *
     * }
     */
    JT.history = {

        // pushstate after open the popup
        add : function(uid){
            if ('history' in window && 'pushState' in history) {
                var push_obj = {};
                push_obj["jt-"+uid] = 'show';
                history.pushState(push_obj, null, location.href);
            }
        },

        // Remove the current history on click close btn
        // Todo : check only history state  is popup show
        remove : function(uid){
            if(history.state != null && history.state["jt-"+uid] == 'show'){
                history.back(); // the magic remove state by spidoche (old school functions are good)
            }
        },

        // Listen back/forward btn click
        listen : function(uid,open,close,hash){

            // set default value
            if(typeof hash == "undefined"){
                hash = false;
            }

            // Hash mode
            if(hash){

                window.addEventListener("hashchange", function(e){

                    close();
                    open(location.hash);

                });
                window.addEventListener

            // PopState mode
            }else if ("PopStateEvent" in window) {
                window.addEventListener("popstate", function(e){

                    if(e.state != null && e.state["jt-"+uid] == 'show'){
                        // forward button
                        if(typeof open === "function"){
                            open();
                        }
                    }else{
                        // back button
                        if(typeof close === "function"){
                            close();
                        }

                        // remove forward if not need
                        if(typeof open !== "function"){

                            // Clean forwar history
                            //history.forward();

                        }
                    }

                }, false);

            }
        }
    };


    /**
     * Check Webgl support helper
     *
     * @version 1.0.0
     * @since 2019-07-25
     * @author STUDIO-JT (NICO)
     *
     * @example
     * // Add webgl class
     * function add_no_webgl_class() {
     *     if(!is_webgl_support()){
     *        $('html').addClass('no_webgl');
     *     }
     * }
     */
    JT.has_webgl = function () {
        try {
            var canvas = document.createElement('canvas');
            return !!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch(e) {
            return false;
        }
    };



    /**
     * UI Helper
     *
     * @description UI 관련 함수 관리용 헬퍼
     *
     * @version 1.0.0
     * @since 2018-04-12
     * @author STUDIO-JT (201)
     *
     * @example
     * // 등록된 모든 함수 실행하기
     * JT.ui.init();
     *
     * @example
     * // 함수 등록하기
     * JT.ui.add( function () {
     *   // alert('something')
     * };
     * JT.ui.add( test_func );
     * function test_func () {
     *     // alert( 'somethid' );
     * };
     *
     * @example
     * // 함수명(string) 으로 삭제하기
     * JT.ui.del( func_name );
     * JT.ui.del( 'test_func' );
     *
     * @example
     * // 함수명(string)으로 함수 가져오기
     * JT.ui.get( func_name );
     * JT.ui.get( 'test_func' );
     *
     * @example
     * // 함수명(string)으로 함수 실행하기
     * JT.ui.call( func_name );
     * JT.ui.call( 'test_func' );
     *
     * @익명함수는 func_{timestamp} 로 추가됨
     */
    JT.ui = {

        list: {},

        init: function () {

            try {

                for ( var func_name in this.list ) {

                    if ( typeof this.list[ func_name ] === 'function' ) {

                        this.list[ func_name ].call();

                    }

                }

            } catch ( e ) {

                console.log( e );

            }

        },

        add: function ( func, exec_flag ) {

            try {

                if ( typeof func === 'function' ) {

                    var func_name = ( ! func.name ? func.toString().match(/^function\s*([^\s(]+)/)[1] : func.name );

                    this.list[ func_name ] = func;

                    if ( typeof exec_flag !== 'undefined' && exec_flag === true ) {

                        func.call();

                    }

                }

            } catch ( e ) {

                console.log( e );

            }

        },

        del: function ( func_name ) {

            try {

                delete this.list[ func_name ];

            } catch ( e ) {

                console.log( e );

            }

        },

        replace: function ( func_name, func ) {

            try {

                if ( typeof func === 'function' ) {

                    this.list[ func_name ] = func;

                }

            } catch ( e ) {

                console.log( e );

            }

        },

        get: function ( func_name ) {

            try {

                return this.list[ func_name ];

            } catch ( e ) {

                console.log( e );
                return null;

            }

        },

        call: function ( func_name ) {

            try {

                this.list[ func_name ].call();

            } catch ( e ) {

                console.log( e );

            }

        }

    };


    /**
     * 조사 Helper
     *
     * @description 을/를, 은/는 등 조사를 가져오는 헬퍼
     *
     * @version 1.0.0
     * @since 2021-01-20
     * @author STUDIO-JT (201)
     * @see https://github.com/e-/Josa.js/
     *
     * @example
     * JT.josa( '사과', '을/를' ); // return '를'
     * JT.josa( '사과', '을' ); // return '를'
     * JT.josa( '사과', '를' ); // return '를'
     * JT.josa( '사과', '을를' ); // return '를'
     *
     */
    JT.josa = function ( word, format, join ) {

        var _f = [
            function ( string ) { return _hasJong(string) ? '을' : '를'; }, //을/를 구분
            function ( string ) { return _hasJong(string) ? '은' : '는'; }, //은/는 구분
            function ( string ) { return _hasJong(string) ? '이' : '가'; }, //이/가 구분
            function ( string ) { return _hasJong(string) ? '과' : '와'; }, //와/과 구분
            function ( string ) { return _hasJong(string) ? '으로' : '로'; } //으로/로 구분
        ];

        var _formats = {
            '을/를'     : _f[0],
            '을'        : _f[0],
            '를'        : _f[0],
            '을를'      : _f[0],
            '은/는'     : _f[1],
            '은'        : _f[1],
            '는'        : _f[1],
            '은는'      : _f[1],
            '이/가'     : _f[2],
            '이'        : _f[2],
            '가'        : _f[2],
            '이가'      : _f[2],
            '와/과'     : _f[3],
            '와'        : _f[3],
            '과'        : _f[3],
            '와과'      : _f[3],
            '으로/로'   : _f[4],
            '으로'      : _f[4],
            '로'        : _f[4],
            '으로로'    : _f[4]
        }


        if ( typeof _formats[ format ] === 'undefiend' ) throw 'Invalid format';

        return ( join ? word : '' ) + _formats[ format ]( word );


        function _hasJong( string ) { //string의 마지막 글자가 받침을 가지는지 확인

            return ( string.charCodeAt( string.length - 1 ) - 0xac00 ) % 28 > 0;

        }

    }


    /**
     * Task Helper
     *
     * @description 비동기 처리를 동기로 처리하기 위한 Task 헬퍼
     *
     * @version 1.0.0
     * @since 2021-12-10
     * @author STUDIO-JT (201)
     * @see https://medium.com/@griffinmichl/asynchronous-javascript-queue-920828f6327
     *
     * @example
     * var task = JT.task();
     * task.push( done => { setTimeout( () => { console.log( 'test - 1' ); done(); }, 150 } );
     * task.push( done => { setTimeout( () => { console.log( 'test - 2' ); done(); }, 50 } );
     * task.push( done => { setTimeout( () => { console.log( 'test - 3' ); done(); }, 100 } );
     * task.run();
     *
     * // Will Return
     * test - 1
     * test - 2
     * test - 3
     *
     */
    JT.task = function () {
        var taskQueue = [];

        function enqueueTask( task ) {
            return taskQueue.push( task );
        }

        function runTask() {
            var task = taskQueue.shift();
            task( function () {
                if ( taskQueue.length > 0 ) {
                    runTask();
                }
            } );
        }

        return {
            push: enqueueTask,
            run: runTask
        }
    }


})(window, jQuery);
