/* Javascript Document */

$(document.documentElement).keyup(function (event) {
	if (event.keyCode == 37) {
		$('.prev').trigger('click');
	} else if (event.keyCode == 39) {
		$('.next').trigger('click');
	}
});

$(document).ready(function(){

	function isTouchDevice() {
	   var el = document.createElement('div');
	   el.setAttribute('ongesturestart', 'return;');
	   if(typeof el.ongesturestart == "function"){
		   $("#scroll").touchwipe({
				wipeLeft: function() {
					$('.next').trigger('click');
				},
				wipeRight: function() {
					$('.prev').trigger('click');
				},
				min_move_x: 20,
				preventDefaultEvents: true
			});
	   }else {
	      return false
	   }
	}
	
	$('.prev').click(function(){
		select_prev();
	});
	
	$('.next').click(function(){
		select_next();
	});
	
	var cur_pos = 0;
	var start_pos = 5;
	var speed = 400;
	var items = 7;
	var itemwidth = 340;
	var defaultwidth = 100*itemwidth*items;
	var defaultleft = (defaultwidth/2) - (340*start_pos);
	
	navigation_dots();
	clicked();
	initialize_slider();
	isTouchDevice();
	
	function initialize_slider(){
		cur_pos = start_pos;
		move_left = cur_pos;
		jQuery('.pagination a').removeClass();
		jQuery("#nav_"+cur_pos).addClass('cur');
		leftpx = defaultleft + (move_left*340)+'px';
		leftpx = '-'+leftpx;
		$('.slider').css('width',defaultwidth+'px')
		$('.slider').stop().animate({
			left: leftpx
	    }, speed);
	}
	
	function select_prev(){
		cur_pos = cur_pos-1;
		var move_left = cur_pos;
		slide();
		cur_dot();
	}
	
	function select_next(){
		cur_pos = cur_pos+1;
		var move_right = cur_pos;
		slide();
		cur_dot();
	}
	
	
	function cur_dot(){
		var cur_dot = cur_pos;
		if(cur_dot > items)
		{
			cur_dot = parseInt(cur_dot) % items;
		}
		if(cur_dot < 0){
			if(cur_dot < '-'+items){
				cur_dot = parseInt(cur_dot) % items;
			}
			cur_dot = cur_dot+items;
		}
		if(cur_dot == 0){cur_dot=items;}
		
		$('.pagination a').removeClass();
		$("#nav_"+cur_dot).addClass('cur');
	}
	
	
	function clicked(){
		$('.pagination a').click(function(){
			var aid = $(this).attr('id');
			aid = aid.split("_", 2);
			aid = aid[1];
			cur_pos = parseInt(aid);
			slide();
			return false;
		});
	}
	
	function slide(){
		move_left = cur_pos;
		jQuery('.pagination a').removeClass();
		jQuery("#nav_"+cur_pos).addClass('cur');
		leftpx = defaultleft + (move_left*340)+'px';
		leftpx = '-'+leftpx;
		$('.slider').stop().animate({
			left: leftpx
	    }, speed);
	}
	
	
	function navigation_dots(){
		var i = 1;
		for (; i <= items ; i++)
		  {
			$('#pagination').append('<a href="#" id="nav_'+i+'">'+i+'</a> ')
		  }
	}
	
});