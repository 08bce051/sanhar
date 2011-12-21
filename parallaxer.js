
function aParallax(){
    var p = this;
    p.panelWd = 400; // the width of the primary panel
    p.otherLayers = [{ id: 'layerA', ratio: 0.75 },{ id: 'layerC', ratio: 1.25 },{ id: 'layerD', ratio: 1.5 },{ id: 'layerE', ratio: 1.75 }]; // all of the other panels
    p.panelCount = $('#layerB .p').length; // the total number of panels 
    p.didScroll = false;
    p.panelHovered = 0;
    
    p.overflowControl = $('#overflowControl');
    p.bgCatcher = $('#theAll'); // webkit, mostly chrome, has issues animating body background-color properties--so throw everything into a container, animate its color
    p.wndow = $(window);
    
    this.crunchWinVars = function(){
		var screenWidth;
        p.winWd = p.wndow.width();
		screenWidth = (p.panelCount-1) * p.panelWd + p.winWd;
        p.winHoriSp2Panel = Math.floor( ( p.winWd - p.panelWd ) / 2 ); // figures out left margin for panels to be centered on screen
        p.overflowControl.width( screenWidth );
		p.bgCatcher.width( screenWidth );
    	$('#layerSling').offset({ left: p.winHoriSp2Panel });
    };

    this.init = function(){
        // $('#layerB').width( p.panelCount * p.panelWd );
    	for(var ih=0; ih<p.otherLayers.length; ih++){
    		//$( '#'+p.otherLayers[ih].id ).width( Math.ceil(p.panelCount * p.panelWd * p.otherLayers[ih].ratio) ); // This might be better to bake into style tags serverside
    		//$( '#'+p.otherLayers[ih].id+' .p' ).width( Math.round( p.panelWd * p.otherLayers[ih].ratio) ); // This might be better to bake into css
    		//$( '#'+p.otherLayers[ih].id+' .p' ).text( Math.round( p.panelWd * p.otherLayers[ih].ratio) ); // Helper line
    		p.otherLayers[ih].ref = $('#'+p.otherLayers[ih].id); // we will be referencing this a lot
            p.parallax(p.otherLayers[ih].ref, p.otherLayers[ih].ratio);
    	}
    };
	
	this.panelNarr = function(aPanel){
        var elevator = $('#panelControl a[href="'+aPanel+'"]:not(.lazyNext,.lazyPrev)'),
			narrative = $(aPanel+' .narrative'),
			overflowNewHt = narrative.outerHeight() + 500,
			lazyHelper;

        $('.narrative:visible .adminBlobk textarea:focus, .narrative:visible .adminBlobk input:focus').blur();
    	$('.narrative:visible').stop(true,true).slideUp(200); // roll up text for other slides, if any are unfurled
		
		$('#panelControl a.hovering').removeClass('hovering'); // remove hovering class from the other hovering button
		elevator.addClass('hovering'); // add hovering class to the button whose panel is actually being hovered
    	if( !elevator.hasClass('clicked') ) elevator.addClass('clicked'); // add clicked class to the panelControl for page that we just passed by
		
		lazyHelper = $('#c_'+(p.panelHovered+1)).length > 0 ? '#c_'+(p.panelHovered+1) : '#';
		$('#panelControl a.lazyNext').attr('href', lazyHelper);
		lazyHelper = $('#c_'+(p.panelHovered-1)).length > 0 ? '#c_'+(p.panelHovered-1) : '#';		
		$('#panelControl a.lazyPrev').attr('href', lazyHelper);
		
    	if( overflowNewHt > p.overflowControl.outerHeight() ) 
    		p.overflowControl.animate( {'height' : overflowNewHt}, 200, 'easeInOutSine', copyrightly ); // expand the outer container (which needs to have overflow:hidden to work) by the height of the current slide's narrative
    	narrative.slideDown(500, function(){ // unfurl narrative
    		if($(this).find('textarea').length) $(this).find('textarea').trigger('keyup');
			p.bgCatcher.height( $(document).height() );
    	});

    	if( p.winWd != p.wndow.width() ) p.crunchWinVars(); // sometimes extending the overflow adds the vertical scrollbar, so we need to account for that
    };
    
    
    
    this.parallax = function (containerRef, ratio){ // this equation took FOREVER to pinpoint through less than mathematical means of trial and error. Holy euclidian bullcrap, Batman! 1 - ratio, what is this nonsense?! A thanks to IdleT user Forbin for simplifying the equation for me further.
        containerRef.stop().animate({ left : (1 - ratio) * ( p.panelWd / 2 + p.wndow.scrollLeft() ) +'px' }, 
		 	200); // Default
			// 1800, 'easeOutBounce'); // A very morose easing option
			// 450, 'easeOutBounce'); // Like being dragged across a sticky stage, or like some sort of mechanical automata
			// 2500, 'easeOutElastic'); // A little bouncy
			// 850, 'easeOutBack'); // A not unpleasant overshot of the target with a correct return, might be better for the correctScroll
    }
    
    this.correctScroll = function (hash, duration){
		var easing = 'easeInOutSine', goToP = $(hash).index()+1, duration;
		var distanceToTravel = Math.abs(parseInt(hash.replace(/\D/g,'')) - parseInt($('#panelControl a.hovering').attr('href').replace(/\D/g,'')) );
        if(duration === undefined) duration = 800 * distanceToTravel;
        if(p.wndow.scrollTop()) $.scrollTo( hash, { 'axis' : 'y', 'queue' : true, 'duration' : Math.floor(p.wndow.scrollTop() * 3/2 + 200), 'offset' : { 'top' : -90 } }); // scrollTo will take forever scrolling up if we have x & y queued in a single line, so doing it separately allows us to have a brisker upscroll and a longer side one
		if(distanceToTravel <= 3) {
			easing = 'easeOutBack';
			duration = duration * 1.3;
			}
        else if( distanceToTravel <= 4 && (goToP == $('#layerB>div.p').length || goToP == 1) ) {
			easing = 'easeOutBounce';
			duration = duration * 1.3;
			}
		$.scrollTo( hash, { 'axis' : 'x', 'queue' : true, 'duration' : duration, 'offset' : { 'left' : -p.winHoriSp2Panel }, 'easing' : easing });
    }
    
    this.panelControl = function(){
        $('#panelControl a:not(.pagination)').click(function(elevator){
			var hash = $(this).attr('href');
            elevator.preventDefault();
            if(hash != '#') p.correctScroll($(this).attr('href'));
        });
    }

    p.crunchWinVars();
    p.panelControl();
    p.init();
    
    p.wndow.resize(function(){ // when widnow is resized
        p.crunchWinVars();
        copyrightly();
    });

    p.wndow.scroll(function(){ // when the obvious obviouses
    	p.didScroll = true;
    });

    
    setInterval(function() { // this interval reduces the number of times scroll gets fired; at one "frame" every 50ms it shouldn't be flickery
        if ( p.didScroll ) {
            p.didScroll = false;
            for(var ih=0; ih<p.otherLayers.length; ih++){
    	        p.parallax(p.otherLayers[ih].ref, p.otherLayers[ih].ratio);
    		}
    	    panelEvSniffer();
    	    copyrightly();
        }
    }, 150);

}

function mainMenu(){
	$("#mainMenu, #paginationMore").hover(function(){
		$("#mainMenu img").stop().animate({ width: '214px', height: '219px' }, 500, 'easeInOutSine');
		$("#mainMenu .jimmyStewart").stop().animate({ width: '139px', height: '139px' }, 500, 'easeInOutSine');
		$("#panelControl").stop().animate({ left: '160px' }, 520, 'easeInOutSine');
	}, function(){
		$("#mainMenu img").stop().animate({ width: '69px', height: '70px' }, 220, 'easeInOutSine');
		$("#mainMenu .jimmyStewart").stop() .animate({ width: '45px', height: '45px' }, 200, 'easeInOutSine');
		$("#panelControl").stop().animate({ left: '70px' }, 800, 'easeOutBounce');
	});
}

function copyrightly(){
    $('#copyrightly').stop().animate({ 'bottom': $(window).height() - $(document).height() + 10 + $(window).scrollTop() },200);
    $('#copyrightly').hover( function(){ $(this).stop().fadeTo(300,0.99); },function(){ $(this).stop().fadeTo(300,0.15); } );
}


// dom element goes out
function popOut(cssFilter, dur){
	var aPop = this;
	aPop.duration = dur;
    $(cssFilter+':visible').stop(false,true).each(function(){
        $(this).animate(
			{'transform': 'scale(.01)'}, 
			{'duration': aPop.duration,
			 'easing': 'easeInSine',
			  queue: true,
			  complete: function(){$(this).css({'display': 'none'});}
			}
		);
    });
}

// dom element comes in
function popIn(cssFilter, dur){
	var aPop = this;
	aPop.duration = dur;
    $(cssFilter+':hidden').stop(false,true).each(function(){
        $(this).css({'transform': 'scale(.01)', 'display': 'block'}).animate(
			{'transform': 'scale(1)'},
			{'duration': aPop.duration,
			 'easing': 'easeOutElastic',
			  queue: true,
			  complete: function(){$(this).css({'display': 'block', 'transform' : 'none'});}
			}
		);        
    });
}

function popSlideshower(classToCycle, pauseButtonPanelId){
    var thisPop = this;
    // the items that have the classToCycle class need to also have classes ploink1, ploink2, ploink3... ploinkn - to specify order of displaywhatchamacallit
    $('.'+classToCycle+":not(.ploink1)").hide();
	
    this.totCount = $('.'+classToCycle+':not(.also)').length; // the also class allows there to be multiple images with the same ploink number; the also ploinks will not go toward the total count
    this.currentIndex = 1;
    this.classOfCycler = classToCycle;
    this.currentlyPlaying = true;

	// prepend button to the given narrative block id
	$('#c_'+pauseButtonPanelId+' .narrative').prepend('<p style="text-align: center;"><a href="#" id="'+classToCycle+'-pauseButt" class="inlineButton"><span>Pause Slideshow</span></a></p>');

	$('#'+classToCycle+'-pauseButt').click(function(aClick){
		aClick.preventDefault();
		
		if(thisPop.currentlyPlaying) {
			$(this).html('<span>Continue</span>');
			thisPop.currentlyPlaying = false;
		}
		else {
			$(this).html('<span>Pause</span>');	
			thisPop.currentlyPlaying = true;
		}
	});
	
    this.popPloink = function(){
		var nextIndex = thisPop.currentIndex == thisPop.totCount ? 1 : thisPop.currentIndex + 1;
       
 		if(thisPop.currentlyPlaying && !window.blurred){ // this method allows multiple slideshows to stay synchronized; the timeout never stops firing, even though the slideshow stops advancing
			
	        popOut("."+thisPop.classOfCycler+".ploink"+thisPop.currentIndex, 350);
	        popIn("."+thisPop.classOfCycler+".ploink"+nextIndex, 700);
        
	        thisPop.currentIndex = nextIndex;
    	}
    }
    setInterval(function() { thisPop.popPloink(); }, 4000);
}

function transformScroll(thing, how){
    var thisS = this;
	thisS.aThing = thing;
	thisS.wndow = $(window);
    thisS.skewHow = how; // how is an object with the following properties { how: 'rotate', skewL: -45, distanceL: 3700, skewR: 5, distanceR: 4000 }
    
    this.doIt = function(){
		var angle, how = thisS.skewHow, scroll = thisS.wndow.scrollLeft(), valueSuffix;
		
		valueSuffix = how.how == 'rotate' || how.how == 'skew' ? 'deg' : '';
		
        if( scroll - thisS.skewHow.limitL < 0 ) {
            thisS.aThing.stop().animate({'transform': how.how+'('+how.skewL+valueSuffix+')'}, 200);
		}
        else if( scroll - thisS.skewHow.limitR > 0 ) {
            thisS.aThing.stop().animate({'transform': how.how+'('+how.skewR+valueSuffix+')'}, 200);
		}
        else {
            angle = how.skewL - (how.skewL - how.skewR)*(scroll - how.limitL)/(how.limitR - how.limitL);
            thisS.aThing.stop().animate({'transform': how.how+'('+angle+valueSuffix+')'}, 200);
        }
    }
    
    $(window).scroll(function(){
    	thisS.didScroll = true;
    });
    
    window.setInterval(function() {
        if ( thisS.didScroll ) {
            thisS.didScroll = false;
            thisS.doIt(thisS.aThing, thisS.skewHow);
        }
    }, 150);
    
}

window.onblur = function() { window.blurred = true; };
window.onfocus = function() { window.blurred = false; };

$(document).ready(function(){ // when all code loads
	if(window.blurred === undefined) window.blurred = false;
    p = new aParallax();    
    var duration;
    
    if(window.location.hash) {
        duration = 700 * parseInt(window.location.hash.replace(/\D/g,'')); // people reported scrolling is super fast when clicking from twitter, hence
        p.correctScroll(window.location.hash, duration);
    }
	if(p.panelHovered == 0) panelEvSniffer();
	mainMenu();
	copyrightly();
});

$(window).load(function(){ // when images all load
	if(p.panelHovered == 0) panelEvSniffer();
});

