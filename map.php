
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
        
        <!--追記:body,body:after-->
        <style>
            h2 {color: green;}

            body{
                height: 100%;
            }

            body:after{
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                content: "";
                background: #AAFF00;
                background: -moz-linear-gradient(top, #AAFF00 0%, #fff 100%);
                background: -webkit-linear-gradient(top, #AAFF00 0%, #fff 100%);
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr = '#AAFF00', endColorstr = '#000', GradientType = 0);
                background: linear-gradient(to bottom, #AAFF00 0%, #fff 100%);
                z-index: -1;
            }
        </style>

    </head>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDRDP_sdN5n8LI44-vl4CAEm4gnlGF4XH4&callback=initMap"></script>

    <body>
        <h2 style = "text-align:center; font-weight:bold">
            お散歩時間を入力してください
        </h2>

        <br>

        <form method = "POST" action = "map.php" style = "text-align: center">
            <input type = "number" placeholder = "時間を入力してください" name = "osampo_time"  min = "5" value = "25">
            <input type = "submit" name = "btn_confirm" value = "決定">
        </form>

        <?php if(empty($_POST['osampo_time'])) : ?>
            <p style = "text-align: center; color: red">時間が入力されていません！</p>
        <?php endif; ?>

        <br>

        <div style = "text-align:center;">
            <input type="text" size="55" id="search" value="近くの公園" />
            <input type="button" size="55" value="検索" onClick="SearchGo()" />
        </div>
        <div id="map_canvas" style="width: 100%; height: 90%;"></div>
    
        <div id="map" style="width:600px; height:400px"></div>
    
        <script defer type="text/javascript" src="api.js?t=<?php echo time(); ?>">
        </script>
        <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDRDP_sdN5n8LI44-vl4CAEm4gnlGF4XH4&callback=initMap"></script> 

    </body>

</html>