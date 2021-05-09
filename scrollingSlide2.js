/**
*  @access SCROLLING SLIDE
*  @author CJ88
*  @version 1.0
*/

function ScrollingSlide ( object ){
    'use strict';
    // ------------------ GLOBAL
   var type                        = object.type;
   var speed                       = object.speed;
   var listProcessBar              = [];
   var startScrolling              = 0;
   var endScrolling                = 0;
   var totalElm                    = 0;
   var maintainSelector            = object.maintainSelector;
   var itemSelector                = object.itemSelector;
   var endScrollingSelector        = object.endScrollingSelector;
   var scrollingStatus             = '';
   var responsive                  = object.responsive;
   var scrollingSize               = 0;
   var enableTreeProgress          = object.enableTreeProgress;

   /**
   *  @access INITIAL AS FALSE
   */
   var scrollUp                    = false;
   var scrollDown                  = false;

   var isMobile                    = false;
   var isTablet                    = false;

   $(document).ready(function(){
      $('html, body').animate({ 'scrollTop': 0}, 'fast');
      var windowPosition         = $(window).scrollTop();
      // totalElm = $( itemSelector ).length + 2;
      totalElm                   = $( itemSelector ).length;
      var treeBuilderSelector    = $('.tree-builder');
      setupScrollingSize();
      // WINDOW LISTENER EVENT SCROLL
      $(window).bind('scroll', function(e){
         var wy                     = this.scrollY;
         var ww                     = $(window).width();
         endScrolling               = $(endScrollingSelector).position().top - windowHeight;
         windowHeight               = $(window).height();
         var currentScroll          = 0;

         getStartScrolling();
         buildListProcessBar( endScrolling - startScrolling );

         $(maintainSelector).css('padding-bottom', scrollingSize);
         var keepTreeBuilderFixed   = scrollingSize - windowHeight;
         // SCROLL UP 
         if( wy >= windowPosition ){
            scrollUp          = true;
            scrollDown        = false;
            scrollingStatus   = 'up';
         }else{
            scrollUp          = false;
            scrollDown        = true;
            scrollingStatus   = 'down';
         }
         
         if ( wy >= startScrolling && wy <= endScrolling ){
            treeBuilderSelector.addClass('fixed');
            treeBuilderSelector.css('top', 0);
            currentScroll = wy - startScrolling;// not in reverse
            processBarRunning( currentScroll );
            
         }
         // MAKE SURE TREE BUILDER KEEP FIXED 
         else if( wy >= endScrolling ){
            treeBuilderSelector.removeClass('fixed');
            treeBuilderSelector.css('top', keepTreeBuilderFixed);
         }

         else{
            // SCROLL DOWN
            console.log('Not Yet !');
            treeBuilderSelector.removeClass('fixed');
            treeBuilderSelector.css('top', 0);
         }


         windowPosition = wy;
         e.preventDefault();
      });


      /**
      *  @access PROCESS BAR RUNNING
      */

      function processBarRunning( scrollingPosition ){
         for( var i = 0; i < totalElm; i++ ){
            // start with 
            // scroll up
            if( scrollUp == true ){
               if( scrollingPosition >= listProcessBar[i] && i != 0 ){
                  $('.tree-box').removeClass( 'enable slide_down slide_up' );
                  $('.tree-box-' + i).addClass( 'enable slide_up' );
                  $('.tree-navigator li').removeClass('enable');
                  $('.tree-navigator-step-' + i ).addClass('enable');
               }
            }

            if( scrollDown == true ){
               if( scrollingPosition >= listProcessBar[i] && i < totalElm ){
                  $('.tree-box').removeClass( 'enable slide_down slide_up' );
                  $('.tree-box-' + i).addClass( 'enable slide_down' );
                  $('.tree-navigator li').removeClass('enable');
                  $('.tree-navigator-step-' + i ).addClass('enable');
               }  
            }

            // another
         }
      }
      
      /**
      *  @access SETUP SCROLLING SIZE
      */
      function setupScrollingSize(){
         for( var i = 0; i < totalElm; i++ ){
            scrollingSize += speed;
         }
         scrollingSize + startScrolling;
      }


      /**
      *  @access BUILD LIST PROCESS BAR
      */

      function buildListProcessBar( scroll ){
         var step = scroll / totalElm;
         for(var i = 0; i < totalElm; i++ ){
            listProcessBar[i] = step * i;
         }
      }

      /**
      *  @access GET START SCROLLING
      */
      function getStartScrolling(){
         startScrolling = $( maintainSelector ).position().top;
      }

      /**
      *  @access RESPONSIVE SPEED SCROLLING
       */
      function scrollSpeedForResponsive( ww ){
         var didChangedDependencyInjectionSpeedDevice = 0;

         if( responsive !== undefined ){
            if( responsive.tablet !== undefined ) {
               var tablet = responsive.tablet;
               if ( ww <= tablet.maxWidth ) {
                  didChangedDependencyInjectionSpeedDevice = tablet.maxWidth;
                  $(maintainSelector).addClass('js_runner_tablet_scrolling');
                  if( responsive.mobile !== undefined ) {
                     $(maintainSelector).removeClass('js_runner_tablet_scrolling');
                     var mobile = responsive.mobile;
                     if ( ww <= mobile.maxWidth ) {
                        didChangedDependencyInjectionSpeedDevice = mobile.maxWidth;
                        $(maintainSelector).addClass('js_runner_mobile_scrolling');
                     }else{
                        $(maintainSelector).addClass('js_runner_tablet_scrolling');
                        $(maintainSelector).removeClass('js_runner_mobile_scrolling');
                     }
                  }
               }else{
                  $(maintainSelector).removeClass('js_runner_tablet_scrolling');
               }
            }


         }
      }
      
   });


}

var scrollingSlide = ScrollingSlide({
   type: 'slide',
   speed: 900,
   itemSelector: '.tree-box',
   maintainSelector: '.js_runner_scrolling',
   endScrollingSelector: '.idx06',
   enableTreeProgress: true,
   responsive: {
      mobile: {
         maxWidth: 768,
         speed: 200,
      },
      tablet: {
         maxWidth: 992,
         speed: 400
      }
   } 
});