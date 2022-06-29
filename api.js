//apiキー : AIzaSyDRDP_sdN5n8LI44-vl4CAEm4gnlGF4XH4
function initMap() {
	function success(pos) {
		var lat = pos.coords.latitude;
		var lng = pos.coords.longitude;
		var latlng = new google.maps.LatLng(lat, lng); //中心の緯度, 経度
		var map = new google.maps.Map(document.getElementById('maps'), {
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