<?php
$pageno=$_GET['pageno'];
$next=$pageno+1;
$prev=$pageno-1;
$last=$_GET['last'];
$i=0;
$dir = opendir("page$pageno");
while (($file = readdir($dir)) !== false)
  {
  if(!is_dir($file))
  {
  $images[$i]=$file;
 $i=$i+1;
 }
 }
closedir($dir);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html class="wf-kingthingspetrockregular-n4-active wf-active"xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Sanhar- Page <?php echo $pageno;?></title>
  	<link href="Kingthings_Petrock.css"rel="stylesheet">
	<script src="jquery_004.js"type="text/javascript"></script>
    <link href="theHoboestOfLobos.css"rel="stylesheet"type="text/css"media="all">
	<script src="ga.js"async=""type="text/javascript"></script>
	<script async=""type="text/javascript"src="webfont.js"></script>
	<script src="jquery_002.js"type="text/javascript"></script>
	<script src="javascript.js"type="text/javascript"></script>
    <script src="jquery.js"type="text/javascript"></script>
    <script src="jquery_003.js"type="text/javascript"></script>

    <script src="parallaxer.js"type="text/javascript"></script>    
    
</head>
<body id="bodyFor_tale"style="background-color: rgb(86, 92, 106);">
	<div id="theAll"style="background-color: rgb(86, 92, 106); width: 3349px; height: 736px;">
    <noscript><div style="background-color: #CC0056; color: #fff; display: block; padding: 100px; text-align: center; font-size: 30px;">
				You MUST enable Javascript for this site to make sense!
			  </div>
	</noscript>
    	
                <ul id="panelControl">
					<?php
					if($prev!=0)
					{echo "<li style=\"padding-left: 15px;\" >\n";
					echo "<a href=\"page.php?pageno=$prev&last=$last\"class=\"pagination\"title=\"Previous page\">\n";
					echo "<span>&lt;Page $prev </span></a></li>\n";}
					?>
                   
					<?php 
						for ($i=0;$i<=7;$i++)
						{
						if($i==0)
							{
							echo "<li><a href=\"#\"title=\"Previous panel\"class=\"lazyPrev\"><span>&lt;</span></a></li>\n";
							}
						else if ($i==7)
							{
							echo "<li><a href=\"#c_2\"title=\"Next panel\"class=\"lazyNext\"><span>&gt;</span></a></li>\n";
							}
						else
							{
							echo "<li><a  href=\"#c_$i\" title=\"Panel $i\"";
							if($i==1)
							echo "class=\"hovering clicked\"";
							echo "><span>$i</span></a></li>\n";
						}
						}
					?>
            		<?php 
					if($pageno<$last)
					{echo "<li style=\"padding-left: 15px;\">\n";
					echo "<a href=\"page.php?pageno=$next&last=$last \"class=\"pagination\"title=\"Next page\">\n";
					echo "<span>Page $next&gt;</span></a></li> ";}?>
							
        		</ul>
<div style="width: 3349px; height: 636px;"id="overflowControl">
    <div style="position: relative; left: 474px;"id="layerSling">
        
<?php 
	$k=2400;
	for($i='B';$i<='C';$i++)
		{
		$im=0;
		echo "<div id=\"layer$i\"style=\"width:$kpx\">\n";
		for($j=1;$j<7;$j++)
			{
			echo "<div class=\"p rowId$j\"id=\"c_$j\">";
			if(($i=='C' && $j%2!=0)|| ($i=='B'))
				{
				echo "<img src=\"page$pageno/".$images[$im]."\"alt=\"\"";
				if($i=='C' && $j==1)
					echo "width=\"600px\"";
				echo ">";
				if($i=='C')
					$im=$im+2;
				else
					$im=$im+1;
				}
				
				

			echo "</div>";
			}
		echo "</div>";
		$k=$k+600;
		}
?>
    </div>
</div>
</div>    
  
	</body></html>