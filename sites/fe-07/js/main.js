/* Javascript Document */
$(document).ready(function(){
	$('div.navigation ul li span').hover(function(){
		$(this).siblings().removeClass('hover');
		$(this).addClass('hover');
	}, function(){
		$(this).removeClass('hover');
	});
	
	$('.goto_top').click(function(){
		$('html, body').animate({
			scrollTop: $("#wrapper").offset().top
		}, 1000);
	});
	
	$('.goto_features').click(function(){
		$('html, body').animate({
			scrollTop: $(".features-content").offset().top
		}, 1000);
	});
	
	$('.goto_downloads').click(function(){
		$('html, body').animate({
			scrollTop: $("#wrapper").offset().top
		}, 1000);
	});
	
	$('.goto_screenshots').click(function(){
		$('html, body').animate({
			scrollTop: $("#screenshots").offset().top
		}, 1000);
	});
	
	$('.goto_support').click(function(){
		$('html, body').animate({
			scrollTop: $("#support").offset().top
		}, 1000);
	});
	
	$('.goto_winner').click(function(){
		$('html, body').animate({
			scrollTop: $("#winner-section").offset().top
		}, 1000);
	});
	
	$('p.copyright a, #twitter-section a, #support a.nav, .nixie, .header ul li span.top-nav, .check-out, a.submit-ur-own').hover(function(){
		$(this).addClass('hov');
	}, function(){
		$(this).removeClass('hov');
	});
	
	$('.readon').click(function(){
		
		if (jQuery.browser.msie) { 
			$('.rules').removeClass('none');
			return false;
		}
		else{
			$('.rules').animate({
				opacity: '1'
			}, 400);
			$('.rules').removeClass('none');
			return false;
		}
	});
	
	$('.gotcha').click(function(){
		$('.rules').animate({
			opacity: '0'
		}, 300);
		$('.rules').addClass('none');
		return false;
	});
	
	$('.navigation').hover(function(){
			$(this).stop().animate({
				width: '259px'
			}, 400);
			$(this).find('ul').stop().animate({
				width: '245px',
				opacity: '1'
			}, 400);
			$(this).find('ul').removeClass('none');
		}, function(){
			$(this).stop().delay(500).animate({
			width: '14px'
			}, 400);
			$(this).find('ul').stop().delay(500).animate({
			width: '0px',
			opacity: '0'
			}, 400);
		});

	isTouchDevice();
	win_width();
	add_shadow();

	$(window).resize(function() {
		win_width();
		add_shadow();
	});

	function win_width(){
		var winwidth = $(window).width();
		if (winwidth <= 1055){
			$('.header ul').stop().animate({
				left: '-90px'
			}, 400);
		}else{
			$('.header ul').stop().animate({
				left: '-47px'
			}, 400);
		}
	}
	
	function add_shadow(){
		var winwidth = $(window).width();
		if (winwidth >= 1200){
			var extra_shadow = (winwidth - 1200) / 2;
			var extra_shadow_margin = 1200 + (extra_shadow);
			//console.log(winwidth);
			//console.log(extra_shadow);
			//console.log(extra_shadow_margin);
			$('.top-shdow, .bottom-shdow').css('width', winwidth+'px');
			$('.extra-shadow').css('width', extra_shadow+'px');
		}
	}

	
	
	//validation
	$("#myform").validate();
	
	//pop up
	
	$("#people .twits").hover(
	  function () {
		$("#people .twits").find("span.twit-text").addClass("none");
		$(this).find("span.animate").css({'opacity':'0'});
		$(this).find("span.animate").stop().animate({'opacity': '1'}, 600);
	  	$(this).find("span.twit-text").removeClass("none");
	  }, 
	  function () {
	    //$(this).find("span.animate").stop();
	  }
	);
	
	$("#contact_form").validate({
		onfocusout: false,
		onclick: false,
		onkeyup: false,

		highlight: function(element, errorClass) {
			$(element).animate( { backgroundColor: 'pink' }, 300)
			.animate( { backgroundColor: '#fff' }, 300)
			.animate( { backgroundColor: 'pink' }, 300)
			.animate( { backgroundColor: '#fff' }, 300);
			$('.valid').css("background-color", "white");			
		}
	
	});
	
	
	var options = { 
			target:        '#alert',
			resetForm: true,
			beforeSubmit:  showRequest,  // pre-submit callback 
			success:       showResponse  
	}; 
	
	function showRequest(formData, jqForm, options) { 
		
		if(!$("#contact_form").valid()){
			$('.valid').css("background-color", "white");
			return false;
		}
		else
		{	
			$('.valid').css("background-color", "white");
			$(".throbber").css({"display":"block"});
			$(".btn_submit").css({"background-position":"0 -114px"});
			$("#contact_form input, #contact_form textarea").attr("disabled","disabled");
			return true; 			    
		}
	}
	
	function showResponse(responseText, statusText)  { 
		$(".throbber").css({"display":"none"});
		$(".btn_submit").css({"background-position":"0 -152px"});
		setTimeout(function(){
			$(".cover_btn_submit").css({"display":"block"}).animate({opacity: 1.0}, 1000, function(){
				$(".btn_submit").css({"background-position":"0 0"});
				$(".cover_btn_submit").css({"display":"none", "opacity":"0.0"});
			});
			
			$("#contact_form input, #contact_form textarea").removeAttr("disabled");
			},3000);
	}
	
		$('#contact_form').ajaxForm(options); 
		$('.valid').css("background-color", "white");
});

twttr.anywhere(function(twitter) {
	  twitter.hovercards();
});
	
function isTouchDevice() {
	var el = document.createElement('div');
	el.setAttribute('ongesturestart', 'return;');
	if(typeof el.ongesturestart == "function"){
	   $("#mycarousel").touchwipe({
			wipeLeft: function() {
				//alert("left");
				$('.jcarousel-next').trigger('click');
			},
			wipeRight: function() {
				//alert("right");
				$('.jcarousel-prev').trigger('click');
			},
			min_move_x: 20,
			preventDefaultEvents: true
		});
	}else {
      return false
	}
}
