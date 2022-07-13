<!DOCTYPE html>
<html>
    <head>

        <!--ここは触らない-->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>map</title>

        
        <!--追記:body,body:after-->
        <style>
            h1 {color: green;}

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
                background: #AAFF66;
                background: -moz-linear-gradient(top, #AAFF66 0%, #FFFFBF 100%);
                background: -webkit-linear-gradient(top, #AAFF66 0%, #FFFFBF 100%);
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr = '#AAFF00', endColorstr = '#000', GradientType = 0);
                background: linear-gradient(to bottom, #AAFF66 0%, #FFFFBF 100%);
                z-index: -1;
            }
        </style>

    </head>

    <body>
        <br>
        <h1 style = "text-align:center; font-weight:bold">
            お散歩時間を入力してください
        </h1>

        <br>


        <form method = "POST" action=? style = "text-align: center">
            <input type = "number" placeholder = "時間を入力してください" name = "osampo_time"  min = "5" value = "60">

            <input type = "submit" name = "btn_confirm" value = "決定">
        </form>

        <?php if(empty($_POST['osampo_time'])) : ?>
            <p style = "text-align: center; color: red">時間が入力されていません！</p>
        <?php endif; ?>

        <br>


        

        <script type="text/javascript"> var walktime = '<?php echo $_POST['osampo_time']; ?>';</script>
    
        <div id="map1" style="width:600px; height:400px;margin:auto;"></div>
        <div id="map2" style="width:600px; height:400px;margin:auto;"></div>

        <script initMap></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDRDP_sdN5n8LI44-vl4CAEm4gnlGF4XH4&libraries=places"></script>
        <script defer type="text/javascript" src="api.js?t=<?php echo time(); ?>"></script>
        


    
    </body>

</html>
