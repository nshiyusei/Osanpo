//apiキー : AIzaSyDRDP_sdN5n8LI44-vl4CAEm4gnlGF4XH4
var walkdis;			//散歩距離
var totaldis;			//経路の距離
var originlat;			//現在地の緯度
var originlng;			//現在地の経度
var lat;				//緯度
var lng;				//経度
var latlng;				//現在地の座標
var results = [];		//検索結果の座標
var rest_r = [];		//検索結果から標高差のある座標を除外した残り
var tag = [];			//検索のタグ
var destination;		//行先
var waypoints = [];		//経由地
var count = 0;			//addEventLisnerのループ回数
var current_walkdis=0;	//現在のルートの総距離


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
				/*
				var map = new google.maps.Map(document.getElementById('map1'), {
					zoom: 15,
					center: latlng
				});
				*/
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
				/*
				var map = new google.maps.Map(document.getElementById('map1'), {
					zoom: 10,
					center: latlng
				});
				*/
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
		const callback = async (results, status) => {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				for (var i = 0; i < results.length; i++) {
					console.log(results[i].geometry.location);
					createMarker(results[i]);
					const e1 = await getElevation(new google.maps.LatLng(lat, lng));
					const e2 = await getElevation(new google.maps.LatLng(results[i].geometry.location.lat(), results[i].geometry.location.lng()));
					const diff = e1 - e2;
					if(diff<30){
						rest_r.push(results[i]);
					}
					//alert(diff);
				}
			}
			

			var rand = Math.floor(Math.random()*rest_r.length);	//ランダムでピックアップ
			destination = rest_r[rand].geometry.location;
			
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
		
		if(count==0){
			var request = {
				location: pyrmont,
				radius: walkdis*0.4,
				type: tag
			  };
		}else if(count>=1){
			var r=(walkdis-current_walkdis)/2
			var request = {
				location: pyrmont,
				radius: r,
				type: tag
			  };
		}
		
		
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
			origin: originlatlng = new google.maps.LatLng(originlat, originlng),
			destination: originlatlng,
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

//経路距離測定
function calcDis(){
	latlng = new google.maps.LatLng(lat, lng);
	var directionsService = new google.maps.DirectionsService;
	mayTypeId: google.maps.MapTypeId.ROADMAP

	// ルート検索を実行
	directionsService.route({
		origin: originlatlng = new google.maps.LatLng(originlat, originlng),
		destination: originlatlng,
		waypoints:waypoints,
		travelMode: google.maps.TravelMode.WALKING
	}, function(response, status) {
		// console.log(response);
		if (status === google.maps.DirectionsStatus.OK) {
			var m = 0;
			for(var i=0; i<response.routes[0].legs.length; i++){
				m += response.routes[0].legs[i].distance.value; // 距離(m)計算
			}
			current_walkdis=m
		}
	});
}


window.addEventListener('load', async function() {
	// ページ読み込み完了後、Googleマップを表示
	await initMap();
	for(let i = 0; i < 10; i++){
		lat = destination.lat();
		lng = destination.lng();
		waypoints[i] = { location: new google.maps.LatLng(lat,lng) }
		calcDis();
		//this.alert(current_walkdis);
		if(walkdis*0.8<current_walkdis){ //目標の距離の0.8倍を超えたら終了
			if(walkdis*1.1<current_walkdis){
				waypoint=waypoint.pop(); //目標の距離の1.1倍を超えた場合、その原因となった中間地点を削除する
				break;
			}else{
				//this.alert("break");
				break;
			}
		}else{
			//this.alert("not break");
		}
		count+=1;
		await initMap();

		//this.alert(e);
	}
});


function getElevation(ll) {
	return new Promise((resolve, reject) => {
		var locations = [ll];
	
		// ElevationServiceのコンストラクタ
		var elevation = new google.maps.ElevationService();
		// リクエストを発行
		elevation.getElevationForLocations({
			locations: locations
		}, function(results, status) {
			if (status == google.maps.ElevationStatus.OK) {
				if (results[0].elevation) {
			 		// 標高取得
					var elevation = results[0].elevation;
					//alert(elevation);
					resolve(elevation);
				} else {
					reject()
				}
			}
		});	
	})
}