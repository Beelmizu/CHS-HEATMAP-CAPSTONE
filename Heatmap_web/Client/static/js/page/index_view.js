$(document).ready(function() {

	var socket = io.connect('http://127.0.0.1:5000');

	socket.on('connect', function() {
		//Gửi server sẽ nhận message và gửi lại message ở hàm handleMessage
		socket.send('User has connected!');
		//Chỉ định hàm sẽ chạy
		socket.emit('stream_camera', "webcam");
	});
	//Đón message từ server
	socket.on('message', function(msg) {
		
	});
	socket.on('image', (image) => {
		img = document.getElementById('frame');
		console.log(image);
		img.src = `data:image/jpeg;base64,${image}`;
	});
	

});