$(document).ready(function() {

	var socket = io.connect('http://127.0.0.1:5000');

	socket.on('connect', function() {
		//Gửi server sẽ nhận message và gửi lại message ở hàm handleMessage
		socket.send('User has connected!');
		//Chỉ định hàm sẽ chạy
		// id camera + port
		socket.emit('stream_camera', "1");
		//rtsp://admin:Admin@123@192.168.1.64/1
		// socket.emit('stream_camera', "1:rtsp://admin:Admin@123@192.168.1.64/1");
	});
	//Đón message từ server
	socket.on('message', function(msg) {
		
	});
	socket.on('disconnect', function() {
		console.log("Camera DISSSSSSSSSSSSSSSSSSSSSSSSs");
		// socket.emit('stream_camera', "1:webcam");
	});
	socket.on('stream_camera', (image) => {
		img = document.getElementById('frame_1');
		// console.log(image);
		img.src = `data:image/jpeg;base64,${image}`;
	});
	socket.on('stream_object', (image) => {
		img = document.getElementById('frame_2');
		console.log(image);
		img.src = `data:image/png;base64,${image}`;
	});
	socket.on('stream_heatmap', (image) => {
		img = document.getElementById('frame_3');
		console.log(image);
		img.src = `data:image/png;base64,${image}`;
	});

});