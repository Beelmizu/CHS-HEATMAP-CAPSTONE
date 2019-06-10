$(document).ready(function() {

	var socket = io.connect('http://127.0.0.1:5000');

	socket.on('connect', function() {
		//Gửi server sẽ nhận message và gửi lại message ở hàm handleMessage
		socket.send('User has connected!');
		//Chỉ định hàm sẽ chạy
		// id camera + port
		socket.emit('stream_camera', "1:webcam");
		//rtsp://admin:Admin@123@192.168.1.64/1
		socket.emit('stream_camera', "2:rtsp://admin:Admin@123@192.168.1.64/1");
	});
	//Đón message từ server
	socket.on('message', function(msg) {
		
	});
	socket.on('1', (image) => {
		img = document.getElementById('frame_1');
		console.log("Camera 111111111111111111111111111");
		img.src = `data:image/jpeg;base64,${image}`;
	});
	socket.on('2', (image) => {
		img = document.getElementById('frame_2');
		console.log("Camera 2222222222222222222222222222");
		img.src = `data:image/jpeg;base64,${image}`;
	});

});