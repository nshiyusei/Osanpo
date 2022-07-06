
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <title>Google Maps API サンプル</title>
  </head>
  <body>
    <input type="text" size="55" id="search" value="近くの公園" />
    <input type="button" size="55" value="検索" onClick="SearchGo()" />
    <div id="map_canvas" style="width: 100%; height: 90%;"></div>
    
    <div id="map" style="width:600px; height:400px"></div>
    
    <script defer type="text/javascript" src="api.js?t=<?php echo time(); ?>">
    </script>
    <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDRDP_sdN5n8LI44-vl4CAEm4gnlGF4XH4&callback=initMap"></script> 
  </body>
</html>