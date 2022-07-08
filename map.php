<!DOCTYPE html>
<html>
    <head>
<style>/*
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
*/</style>
    </head>

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
    
        <div id="map1" style="width:600px; height:400px"></div>
        <div id="map2" style="width:600px; height:400px"></div>


        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDRDP_sdN5n8LI44-vl4CAEm4gnlGF4XH4&libraries=places"></script>
        <script defer type="text/javascript" src="api.js?t=<?php echo time(); ?>"></script>
        

    
    </body>

</html>
