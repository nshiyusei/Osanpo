//apiキー : AIzaSyDRDP_sdN5n8LI44-vl4CAEm4gnlGF4XH4
var walkdis;			//散歩距離
var originlat;			//現在地の緯度
var originlng;			//現在地の経度
var lat;				//緯度
var lng;				//経度
var latlng;				//現在地の座標
var results = [];		//検索結果の座標
var tag = [];			//検索のタグ
var destination;		//行先
var waypoints = [];		//経由地


walkdis = 80*walktime;
tag = ["park"];

const initMap = () => {
	return new Promise((resolve, reject) => {
		if(lat == undefined || lng == undefined) {
			const success = (pos) => {
				//現在地にマーカーを表示
				lat = pos.coords.latitude;
				lng = pos.coords.longitude;
				originlat = lat;
				originlng = lng;
				var latlng = new google.maps.LatLng(lat, lng); //中心の緯度, 経度
				var map = new google.maps.Map(document.getElementById('map1'), {
					zoom: 15,
					center: latlng
				});
				var marker = new google.maps.Marker({
					position: latlng, //マーカーの位置（必須）
					map: map //マーカーを表示する地図
				});
				initialize().then(()=>{
					resolve(pos);
				}).catch(() => {
					reject()
				});
			}
		
			const fail = (error) => {
				alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
				lat = 35.6812405;
				lng = 139.7649361;
				latlng = new google.maps.LatLng(lat, lng); //東京駅
				var map = new google.maps.Map(document.getElementById('map1'), {
					zoom: 10,
					center: latlng
				});
				initialize().then(()=>{
					reject();
				});
			}
		
			navigator.geolocation.getCurrentPosition(success, fail);
		} else {
			var latlng = new google.maps.LatLng(lat, lng);
			var marker = new google.maps.Marker({
				position: latlng, //マーカーの位置（必須）
				map: map //マーカーを表示する地図
			});
			initialize().then(()=>{
				resolve(null);
			}).catch(() => {
				reject()
			});
		}
	});
}

var mayMap;
var service;
 
// マップの初期設定
var map;
var service;
var infowindow;

function initialize() {
	return new Promise((resolve, reject) => {
		const callback = (results, status) => {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				for (var i = 0; i < results.length; i++) {
					// console.log(results[i].geometry.location);
					createMarker(results[i]);
				}
			}
			
			
			var rand = Math.floor(Math.random()*results.length);	//今はランダムでピックアップ
			destination = results[rand].geometry.location;
			// alert(latlng);
			calcRoute().then(() => {
				resolve();
			}).catch(() => {
				reject();
			});
		};

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
	})
}


// 該当する位置にマーカーを表示
function createMarker(options) {
	// 緯度経度を取得
	var sresult = options.geometry.location;
	// 住所を取得
	var address = options.formatted_address;

	var marker = new google.maps.Marker({
		position: sresult, //マーカーの位置（必須）
		map: map //マーカーを表示する地図
		
	});
}

//経路表示
function calcRoute(){
	return new Promise((resolve) => {
		latlng = new google.maps.LatLng(lat, lng);
		var directionsService = new google.maps.DirectionsService;
		var directionsRenderer = new google.maps.DirectionsRenderer;
		mayTypeId: google.maps.MapTypeId.ROADMAP
	
		// ルート検索を実行
		directionsService.route({
			origin: originlanlng = new google.maps.LatLng(originlat, originlng),
			destination: originlanlng,
			waypoints:waypoints,
			travelMode: google.maps.TravelMode.WALKING
		}, function(response, status) {
			// console.log(response);
			if (status === google.maps.DirectionsStatus.OK) {
				// ルート検索の結果を地図上に描画
				directionsRenderer.setMap(map);
				directionsRenderer.setDirections(response); 
			}
			resolve();
		});
	});
}
 

window.addEventListener('load', async function() {
	// ページ読み込み完了後、Googleマップを表示
	await initMap();
	for(let i = 0; i < 2; i++){
		lat = destination.lat();
		lng = destination.lng();
		waypoints[i] = { location: new google.maps.LatLng(lat,lng) }
		await initMap();
	}
});
