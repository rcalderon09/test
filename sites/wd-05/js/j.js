//Settings
var endOfPromo = "04/17/2013 19:00:00"; //Use the format MM/DD/YYYY HH:MM:SS   Note there is a space only between the YYYY and HH
var useServerTime = false; // set to true if you want to use the server time else the client system's time
//Note the serverdate.php is required if you set to true the code above.
//serverdate.php
// <?php 
//	date_default_timezone_set("Asia/Manila"); //set the timezone
//  echo Date("m/d/Y H:i:s"); 
//  ?>
function onPromoAlreadyEnded() {
    //do something when promo is already ended		
    //alert("Promo already ended");
}

function onPromoEnds() {
    //do something when promo ends or when the clock ticks to zero		
    //alert("Times up!");
}

function dojQuery() {
    $(".ItemPic, .ItemTitle, .ReadMore, .Ftxt").click(function() {
        window.scrollTo(0, 0);
        var html = $(this).attr("open");
        $("#popUp, #popContent").show();
        $("#popUp").css("background-image", "url(images/bg.png)").addClass("popUp_clicked");
        $("#popContent").load(html + ".html").css("margin", "auto auto").addClass("popContent_clicked");
        $(".tabs a").live("click", function() {
            //do selection of menu
            $(".tabs li").css("background-position", "bottom");
			$(".tabs li a").css("color", "#2a2a2a");
            $(this).parent("li").css("background-position", "top");
			$(this).css("color", "#ffffff");
            //show what is selected
            $(".tabs_content").hide();
            $($(this).attr("href")).show();
            //disable default function of <a>
            return false;
        });
    });
}


$("#closeBox, #popContent").live("click", function() {
    $("#popUp").hide().removeClass("popUp_clicked");
    $("#popContent").hide().removeClass("popContent_clicked");
});

$(document).keydown(function(e) {
		// ESCAPE key pressed
		if (e.keyCode == 27) {
			$("#popUp").hide().removeClass("popUp_clicked");
    		$("#popContent").hide().removeClass("popContent_clicked");
		}
});


/********************************************************************************************

Below are codes not to change if there is no change to be done due to bug, optimization.
Please edit only if you understand the code below.

********************************************************************************************/

//Global Variables
var miliSeconds = 0;
var today = 0;
var c;
var ended = false;
function countdown() {
    //start countdown
    endOfPromoCopy = new Date(endOfPromo);
    if (!useServerTime) { var today = new Date(); }
    else {
        jQuery.ajax({
            url: 'serverdate.php',
            success: function(d) {
                today = new Date(d + "");
            },
            async: false
        });
    }
    miliSeconds = endOfPromoCopy.getTime() - today.getTime();
    if (miliSeconds < 0) {
        clearInterval(c);
        if (!ended) {
            onPromoAlreadyEnded();
            ended = true;
        }
    } else if (miliSeconds == 0) {
        clearInterval(c);
        if (!ended) {
            onPromoEnds();
            ended = true;
        }
    } else {
        var seconds = 0;
        var mins = 0;
        var hours = 0;
        var days = 0;
        //count each
        seconds = Math.floor(miliSeconds / 1000);
        while (seconds > 59) { seconds = Math.floor(seconds - 60); mins++; }
        while (mins > 59) { mins = Math.floor(mins - 60); hours++; }
        while (hours > 23) { hours = Math.floor(hours - 24); days++; }
        seconds = Math.abs(seconds) + "";
        mins = Math.abs(mins) + "";
        hours = Math.abs(hours) + "";
        days = Math.abs(days) + "";

        //show each
        if (seconds < 10) { $("#secs").html("0 " + seconds); }
        else { $("#secs").html(seconds.substr(0, 1) + " " + seconds.substr(1, 1)); }

        if (mins < 10) { $("#mins").html("0 " + mins); }
        else { $("#mins").html(mins.substr(0, 1) + " " + mins.substr(1, 1)); }

        if (hours < 10) { $("#hours").html("0 " + hours); }
        else { $("#hours").html(hours.substr(0, 1) + " " + hours.substr(1, 1)); }

        if (days < 10) { $("#days").html("0 " + days); }
        else { $("#days").html(days.substr(0, 1) + " " + days.substr(1, 1)); }

    }
}

//On Load
$(window).load(function() {
    countdown();
    c = setInterval('countdown();', 1000);
});

//When all documents have been loaded
$(document).ready(function() {
    dojQuery();
});







