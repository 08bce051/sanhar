var pkBaseURL = (("https:"== document.location.protocol) ? "http://hobolobo.net/googalyticsBdamned/": "http://hobolobo.net/googalyticsBdamned/");
document.write(unescape("%3Cscript src='"+ pkBaseURL + "piwik.js' type='text/javascript'%3E%3C/script%3E"));
try {
    var piwikTracker = Piwik.getTracker(pkBaseURL + "piwik.php", 1);
    piwikTracker.trackPageView();
    piwikTracker.enableLinkTracking();
    } catch( err ) {}

WebFontConfig = {
    		custom: { families: [ 'KingthingsPetrockRegular' ], urls: [ '/css/Kingthings_Petrock.css' ] },
  			active: function() { 
				if(typeof(panelEvSniffer) == 'function') { 
					panelEvSniffer();
			}}
    	};
    	(function() {
    		var wf = document.createElement('script');
    		wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    		wf.type = 'text/javascript';
    		wf.async = 'true';
    		var s = document.getElementsByTagName('script')[0];
    		s.parentNode.insertBefore(wf, s);
    	})();
	
       
                
function panelEvSniffer()
		{
        var scroll = $(window).scrollLeft();
     	if( scroll >= -200 && scroll < 200 && p.panelHovered != 1 )
			{
			p.panelHovered = 1;
			p.panelNarr('#c_1');

			$('#theAll').stop().animate({ 'background-color' : '#565C6A' }, 600);
			}
		else if( scroll >= 200 && scroll < 600 && p.panelHovered != 2 )
			{
			p.panelHovered = 2;
			p.panelNarr('#c_2');
			}
		else if( scroll >= 600 && scroll < 1000 && p.panelHovered != 3 )
			{
			p.panelHovered = 3;
			p.panelNarr('#c_3');

			}
		else if( scroll >= 1000 && scroll < 1400 && p.panelHovered != 4 )
			{
			p.panelHovered = 4;
			p.panelNarr('#c_4');
			}
		else if( scroll >= 1400 && scroll < 1800 && p.panelHovered != 5 )
			{
			p.panelHovered = 5;
			p.panelNarr('#c_5');
			$('#theAll').stop().animate({ 'background-color' : '#565C6A' }, 600);
			}
		else if( scroll >= 1800 && scroll < 2200 && p.panelHovered != 6 )
			{
			p.panelHovered = 6;
			p.panelNarr('#c_6');
			$('#theAll').stop().animate({ 'background-color' : '#323845' }, 600);
		}
    }

	
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-10967956-3']);
_gaq.push(['_trackPageview']);
(function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
	 
