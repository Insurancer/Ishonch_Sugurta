!(function($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
	  
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('bi-list bi-x');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
	
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
	
	$.mask.definitions['9'] = false;
    $.mask.definitions['5'] = "[0-9]"; 
    $('input[data-type="phone"]').mask("+998(55) 555-55-55" ); 	
    	 
	//$('body').prepend ('<iframe style="z-index:1035; position: fixed; top: 0; right: 0; left: 0;" id="tempFrame" src="http://uns.uz/извините-сайт-находится-в-стадии-разр/" width="100%"  height="'+$(window).height()+'px" frameBorder="0"></iframe>' );
	
	  
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
	
	$(".iLikeIt").click(function(){
     
      var heart = $(this);
     
        // Retrieve post ID from data attribute
        var post_id = heart.data("post_id");   
       
        // Ajax call
        $.ajax({
            type: "post",
            url: ajax_var.url,
            data: "action=post-like&nonce="+ajax_var.nonce+"&post_like=&post_id="+post_id,
            success: function(count){
 
                // If vote successful
                if(count != "already")
                {
                    heart.addClass("voted");
                    heart.siblings(".count").text(count);
                }
            }
        });
         
        return false;
    });
	
	$('#ePolisForm').on('submit', function(e){
	
		e.preventDefault();
		var fhone=$('#sPhone').val();
		
		if (fhone.length==18) {
			
			this.submit();
		} else {
			
			$('#sPhone').removeClass("attention");
			$('#sPhone').addClass("attention");
		}
	});
	
	$('#ePolisCheck').on('submit', function(e){
	
		e.preventDefault();
		var fhone=$('#regnum').val();
		
		if (fhone.length>=8) {
			
			this.submit();
		} else {
			
			$('#regnum').removeClass("attention");
			$('#regnum').addClass("attention");
		}
	});
	

	var coded = "M9a0@A9q.AJ";
	var key = "q8IVDkTlRA9pzoGOBEie3WfJ0bCrvM7xyaHgY5jN1dSPtKZmL2hsF4QXc6Uwun";
	var shift=coded.length;
	var lk="";
	var ltr="";
	var i=0;
	
	for (i=0; i<coded.length; i++) {

		if (key.indexOf(coded.charAt(i))==-1) {
			ltr = coded.charAt(i) ;
			lk += (ltr);
		} else {    
			ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length;
			lk += (key.charAt(ltr));
		}
	}
 
	$("#email").html(lk).attr("href", "mailto:"+lk);
	$("#emailBottom").html(lk).attr("href", "mailto:"+lk);
	
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="bi bi-list"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
 
      $('.mobile-nav-toggle i').toggleClass('bi-list bi-x');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      //e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('bi-list bi-x');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 10) {
      $('#header').addClass('header-scrolled');
	  $('#topbar').addClass('topbar-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
	  $('#topbar').removeClass('topbar-scrolled');
    }
  });

  if ($(window).scrollTop() > 10) {
    $('#header').addClass('header-scrolled');
	$('#topbar').addClass('topbar-scrolled');
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  }); 

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 800, 
	  easing: "ease-in-out",
      once: true
    });
  }

  $(window).on('load', function() {
    aos_init();	
  });

})(jQuery);

 

/* 
function closeIFrame(){ 
 
	var element = document.getElementById('tempFrame');
        element.parentNode.removeChild(element); 
}
function reload(){ 
 var redirectUrl="http://www.old.uns.uz"
	window.location.href = redirectUrl;  
}
*/