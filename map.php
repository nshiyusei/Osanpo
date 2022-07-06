
<!DOCTYPE html>
<html>
    <head>
        <!--ここは触らない-->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>map</title>
        <!-- BootstrapのCSS読み込み -->
        <link href="/survey/css/bootstrap.min.css" rel="stylesheet">
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css">
        <div>map</div>
        <!--ここは触らない-->
        
        <style>
            h2 {color: green;}
        </style>

    </head>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDRDP_sdN5n8LI44-vl4CAEm4gnlGF4XH4&callback=initMap"></script>

    <body>
        <h2 style = "text-align:center">
            お散歩時間を入力してください
        </h2>

        <form method = "POST" action = "map_test.php" style = "text-align: center">
            <input type = "number" placeholder = "時間を入力してください" name = "osampo_time"  min = "5" value = "25">
            <input type = "submit" name = "btn_confirm" value = "決定">
        </form>

        <?php if(empty($_POST['osampo_time'])) : ?>
            <p style = "text-align: center; color: red">時間が入力されていません！</p>
        <?php endif; ?>
        <input type="text" size="55" id="search" value="近くの公園" />
      <input type="button" size="55" value="検索" onClick="SearchGo()" />
     <div id="map_canvas" style="width: 100%; height: 90%;"></div>
    
    <div id="map" style="width:600px; height:400px"></div>
    
    <script defer type="text/javascript" src="api.js?t=<?php echo time(); ?>">
    </script>
    <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDRDP_sdN5n8LI44-vl4CAEm4gnlGF4XH4&callback=initMap"></script> 

    </body>

</html>