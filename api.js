//apiキー : AIzaSyDRDP_sdN5n8LI44-vl4CAEm4gnlGF4XH4

function initMap() {
	function success(pos) {
		var lat = pos.coords.latitude;
		var lng = pos.coords.longitude;
		var latlng = new google.maps.LatLng(lat, lng); //中心の緯度, 経度
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 17,
			center: latlng
		});
		var marker = new google.maps.Marker({
			position: latlng, //マーカーの位置（必須）
			map: map //マーカーを表示する地図
		});
	}
	function fail(error) {
		alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
		var latlng = new google.maps.LatLng(35.6812405, 139.7649361); //東京駅
		var map = new google.maps.Map(document.getElementById('maps'), {
			zoom: 10,
			center: latlng
		});
	}
	navigator.geolocation.getCurrentPosition(success, fail);
}
var mayMap;
var service;
 
// マップの初期設定
function initialize() {
    // Mapクラスのインスタンスを作成（緯度経度は池袋駅に設定）
    var initPos = new google.maps.LatLng(35.729756, 139.711069);
    // 地図のプロパティを設定（倍率、マーカー表示位置、地図の種類）
    var myOptions = {
        zoom: 15,
        center: initPos,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // #map_canva要素にMapクラスの新しいインスタンスを作成
    myMap = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    // 検索の条件を指定（緯度経度、半径、検索の分類）
    var request = {
        location: initPos,
        radius: 1000,      // ※１ 表示する半径領域を設定(1 = 1M)
        types: ['cafe']    // ※２ typesプロパティの施設タイプを設定
    };
    var service = new google.maps.places.PlacesService(myMap);
    service.search(request, Result_Places);
}
 
// 検索結果を受け取る
function Result_Places(results, status){
    // Placesが検家に成功したかとマうかをチェック
    if(status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            // 検索結果の数だけ反復処理を変数placeに格納
            var place = results[i];
            createMarker({
                 text : place.name,
                 position : place.geometry.location
            });
        }
    }
}
 
// 入力キーワードと表示範囲を設定
function SearchGo() {
    var initPos = new google.maps.LatLng(0,0);
    var mapOptions = {
        center : initPos,
        zoom: 0,
        mapTypeId : google.maps.MapTypeId.ROADMAP
    };
    // #map_canva要素にMapクラスの新しいインスタンスを作成
    myMap = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    service = new google.maps.places.PlacesService(myMap);
    // input要素に入力されたキーワードを検索の条件に設定
    var myword = document.getElementById("search");
    var request = {
        query : myword.value,
        radius : 5000,
        location : myMap.getCenter()
    };
    service.textSearch(request, result_search);
}
 
// 検索の結果を受け取る
function result_search(results, status) {
    var bounds = new google.maps.LatLngBounds();
    for(var i = 0; i < results.length; i++){
        createMarker({
             position : results[i].geometry.location,
             text : results[i].name,
             map : myMap
         });
        bounds.extend(results[i].geometry.location);
    }
    myMap.fitBounds(bounds);
}
 
// 該当する位置にマーカーを表示
function createMarker(options) {
    // マップ情報を保持しているmyMapオブジェクトを指定
    options.map = myMap;
    // Markcrクラスのオブジェクトmarkerを作成
    var marker = new google.maps.Marker(options);
    // 各施設の吹き出し(情報ウインドウ)に表示させる処理
    var infoWnd = new google.maps.InfoWindow();
    infoWnd.setContent(options.text);
    // addListenerメソッドを使ってイベントリスナーを登録
    google.maps.event.addListener(marker, 'click', function(){
        infoWnd.open(myMap, marker);
    });
    return marker;
}
 
