//apiキー : AIzaSyDRDP_sdN5n8LI44-vl4CAEm4gnlGF4XH4
var walktime = 15;		//散歩時間
var walkdis;			//散歩距離
var lat;				//現在地の経度
var lng;				//現在地の経度
var latlng;				//検索結果の座標
var tag = [];			//検索のタグ


walkdis = 80*walktime;
tag = ["cafe","park"];

function initMap() {
	function success(pos) {
		lat = pos.coords.latitude;
		lng = pos.coords.longitude;
		var latlng = new google.maps.LatLng(lat, lng); //中心の緯度, 経度
		var map = new google.maps.Map(document.getElementById('map1'), {
			zoom: 15,
			center: latlng
		});
		var marker = new google.maps.Marker({
			position: latlng, //マーカーの位置（必須）
			map: map //マーカーを表示する地図

			
		});
		initialize();
	}
	function fail(error) {
		alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
		lat = 35.6812405;
		lng = 139.7649361;
		var latlng = new google.maps.LatLng(lat, lng); //東京駅
		var map = new google.maps.Map(document.getElementById('map1'), {
			zoom: 10,
			center: latlng
		});
		initialize();
	}
	navigator.geolocation.getCurrentPosition(success, fail);
}

var mayMap;
var service;
 
// マップの初期設定
var map;
var service;
var infowindow;

function initialize() {
  var pyrmont = new google.maps.LatLng(lat,lng);
  map = new google.maps.Map(document.getElementById('map2'), {
      center: pyrmont,
      zoom: 15
    });

  var request = {
    location: pyrmont,
    radius: walkdis,
    type: tag
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
		console.log(results[i].geometry.location);
      	createMarker(results[i]);
    }
  }
}
 

// 該当する位置にマーカーを表示
function createMarker(options) {
	// 緯度経度を取得
	var latlng = options.geometry.location;
	// 住所を取得
	var address = options.formatted_address;

	var marker = new google.maps.Marker({
		position: latlng, //マーカーの位置（必須）
		map: map //マーカーを表示する地図
	});
}
 
// ページ読み込み完了後、Googleマップを表示
initMap();