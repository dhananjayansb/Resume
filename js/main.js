(function($,sr){
	"use strict";
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;

        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            };

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    }
    // smartresize
    jQuery.fn[sr] = function(fn){  return fn ? this.on('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');
jQuery(document).ready(function(){
	"use strict";
    $(document).foundation();
	/* ---------------------------------------------------------------------- */
	/*	 Preloader
	/* ---------------------------------------------------------------------- */
	$(window).load(function() {
		$('.spinner').fadeOut(200);
		$('#preloader').delay(200).fadeOut('slow');
		$('.wrapper-content').css('opacity','1').fadeIn(200);
	});
	/* ---------------------------------------------------------------------- */
	/*	 Lightbox
	/* ---------------------------------------------------------------------- */
	$('.fancybox')
	.attr('rel', 'media-gallery')
	.fancybox({
		openEffect : 'none',
		closeEffect : 'none',
		prevEffect : 'none',
		nextEffect : 'none',

		arrows : false,
		helpers : {
			media : {},
			buttons : {},
			overlay: {
		      locked: false
		    }
		}
	});
	/* ---------------------------------------------------------------------- */
	/*	Full Screen
	/* ---------------------------------------------------------------------- */
	function fullintro() {
        var ww = $(window).height();

        $('.introHeader').each(function() {
            var bgImg = $(this).attr('data-src');
            $(this).css({
                'height': ww + 'px',
                'background-image': 'url(' + bgImg + ')'
            });

        });

    }

    fullintro();
    $(window).smartresize(function() {
        fullintro();
    });
	/* ---------------------------------------------------------------------- */
	/*	Number Animation
	/* ---------------------------------------------------------------------- */
	var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
	$('#numeric-counts').waypoint(function() {
		$('.numeric-count').each(function() {
			jQuery(this).animateNumber(
				{
				number: jQuery(this).attr('data-number'),
				easing: 'easeInQuad',
				numberStep: comma_separator_number_step
				},
	  			3000
			);	
		});
	},{offset: '90%'});
	
	/* ---------------------------------------------------------------------- */
	/*	Testimontial
	/* ---------------------------------------------------------------------- */
	$("#testimontial-group").owlCarousel({
		navigation : false,
		slideSpeed : 300,
		paginationSpeed : 400,
		pagination:true,
		singleItem:true
	});
	/* ---------------------------------------------------------------------- */
	/*	Resposive Navigation
	/* ---------------------------------------------------------------------- */
		jQuery('.navbar-nav').meanmenu({
	    	meanScreenWidth: '960',
        	meanMenuContainer: '#header',
        	onePage: true
	    });
	/* ---------------------------------------------------------------------- */
	/*	Scroll
	/* ---------------------------------------------------------------------- */
	$('#menu-main').onePageNav({
		currentClass: 'active',
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: '',
		easing: 'swing',
	}); 
	// scroll to top
	$('.scroll-down a').click(function(){
		var goingto = $(this).attr('href');
		// $("html, body").delay(2000).animate({scrollTop: $('#title1').offset().top }, 2000);
		// $(target).offset().top
		$("html, body").animate({ scrollTop: $(goingto).offset().top-80 }, 750);
		return false;
	});

	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */
	
	/* Needed variables */
	var $contactform 	= $('#contactform'),
		$success		= 'Your message has been sent. Thank you!';
	var response;
		
	$contactform.submit(function(){
		$.ajax({
		   type: "POST",
		   url: "php/contact.php",
		   data: $(this).serialize(),
		   success: function(msg)
		   {
				if(msg == 'SEND'){
					response = '<div class="success"><p>'+ $success +'</p></div>';
				}
				else{
					response = '<div class="error">'+ msg +'</div>';
				}
				// Hide any previous response text
				$(".error,.success").remove();
				// Show response message
				$contactform.prepend(response);
			}
		 });
		return false;
	});
	/* ---------------------------------------------------------------------- */
	/*	Skills
	/* ---------------------------------------------------------------------- */
	$('#charts').waypoint(function() {
		$('.chart').easyPieChart({
			easing: 'easeOutBounce',
			barColor:'#f14e43',
			trackColor: '#f3f3f3',
			lineWidth : 5,
			onStep: function(from, to, percent) {
				$(this.el).find('.percent').text(Math.round(percent));
			}
		});
	},{offset: '90%'});
	/* ---------------------------------------------------------------------- */
	/*	Animation Effects
	/* ---------------------------------------------------------------------- */
	$('.servbox').waypoint(function() {
		$(this).addClass('animportant animated zoomInUp');
	},{offset: '90%'});
	$('#contactform p').waypoint(function() {
		$(this).addClass('animportant animated fadeInRight');
	},{offset: '90%'});
	$('.contact-info li,.contact-info-parg').waypoint(function() {
		$(this).addClass('animportant animated fadeInLeft');
	},{offset: '90%'});
	$('.cbp_tmtimeline li,.downloadcv-button').waypoint(function() {
		$(this).addClass('animportant animated fadeInUp');
	},{offset: '90%'});
	$('.socialmedia a').waypoint(function() {
		$(this).addClass('animportant animated fadeInRight');
	},{offset: '90%'});
	$('.list_timeline li:odd').waypoint(function() {
		$(this).addClass('animportant animated fadeInLeftBig');
	},{offset: '90%'});
	$('.list_timeline li:even').waypoint(function() {
		$(this).addClass('animportant animated fadeInRightBig');
	},{offset: '90%'});
	$('.imgprofile').waypoint(function() {
		$(this).addClass('animportant animated bounceInDown');
	},{offset: '90%'});
	$('.infoAboutPerson,.about-lettre').waypoint(function() {
		$(this).addClass('animportant animated bounceInUp');
	},{offset: '90%'});
	$('.personal-info li').waypoint(function() {
		$(this).addClass('animportant animated lightSpeedIn');
	},{offset: '90%'});
	/* ---------------------------------------------------------------------- */
	/*	Portfolio
	/* ---------------------------------------------------------------------- */
	// WINDOW ONLOAD
	var $container;
	window.onload = function() {
		// ------------------------------
		// PORTFOLIO FILTERING - ISOTOPE
		// cache container
		$container = $('#secportfolio');
		if($container.length) {
			
			// initialize isotope
			$container.isotope({
			  itemSelector : '.item-portfolio',
			  layoutMode: 'masonry'
			});
			tMasonry();
			$(window).resize(function() {
				tMasonry();
				setTimeout(function() { tMasonry(); }, 400);	
			});
			$container.isotope({ filter: '*' })			
			// filter items when filter link is clicked
			$('#filters a').click(function(){
			  var selector = $(this).attr('data-filter');
			  tMasonry();
			  $container.isotope({ filter: selector });
			  $(this).parent().addClass('current').siblings().removeClass('current');
			  return false;
			});
		}
	};
	// WINDOW ONLOAD
	
	// init
	// PORTFOLIO MASONRY LAYOUT : change the number of masonry columns based on the current container's width
	function tMasonry() {
		
		var itemPerRow = 4;
		var containerW = $container.width();
		var items = $container.children('.item-portfolio');
		var columns, columnWidth;
		var viewports = [ {
				width : 1300,
				columns : itemPerRow
			}, {
				width : 900,
				columns : itemPerRow-1
			}, {
				width : 480,
				columns : itemPerRow - 2
			}, { 
				width : 0,
				columns : itemPerRow - 3
			} ];
	
		for( var i = 0, len = viewports.length; i < len; ++i ) {
	
			var viewport = viewports[i];
	
			if( containerW > viewport.width ) {
	
				columns = viewport.columns;
				break;
	
			}
		}
	
		// set the widths (%) for each of item
		items.each(function(index, element) {
			var multiplier = $(this).hasClass('w2') && columns > 1 ? 2 : 1;
			var itemWidth = (Math.floor( containerW / columns ) * 100 / containerW) * multiplier ;
			$(this).css( 'width', itemWidth + '%' );
		});
	
		columnWidth = Math.floor( containerW / columns );
		$container.isotope( 'layout' ).isotope( 'option', { masonry: { columnWidth: columnWidth } } );
	}
});