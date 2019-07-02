from flask import Flask ,request
from flask_socketio import SocketIO, send
import cv2
import base64
from Thread_camera import *
from Thread_heatmap import *
from Thread_worker import *
from Thread_client import *
import threading
from urllib.request import urlopen
import json
import redis
app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app)
clients = []
rd = redis.StrictRedis(host='localhost', port=6379, db=0)

#Đón message từ client
@socketio.on('message')
def handleMessage(msg):
	print('Message: ' + msg)
	#send(msg, broadcast=True)

@socketio.on('stream_camera')
def connected(data):
	# index_port = data.find(':')
	# id_camera = data[0:index_port]
	# port = data[index_port+1:len(data)]
	id_camera = str(data)
	print("Connect to Camera: "+id_camera)
	# print("Connect to PORT: "+port)
	
	# if(port == "webcam"):
	# 	port = 0
	
	try:
		camera = threading.Thread(target=getFrameCamera, args=(socketio, rd, id_camera,))
		camera.start()
		camera_OD = threading.Thread(target=getObjectDetection, args=(socketio, rd, id_camera,))
		camera_OD.start()
		camera_HM = threading.Thread(target=getHeatmap, args=(socketio, rd, id_camera,))
		camera_HM.start()
	except Exception as e:
		if hasattr(e, 'message'):
			print(e.message)
		else:
			print(e)
	# while True:

	# 	retval, image = cap.read()
	# 	retval, buffer = cv2.imencode('.jpg', image)
	# 	jpg_as_text = base64.b64encode(buffer)
	# 	image_text = str(jpg_as_text, "utf-8")
	# 	#jpg_as_text = image.tostring()
	# 	socketio.emit('image', image_text)


def setupApp(app):
	# jsonurl = urlopen("http://localhost:8080/api/cameras/getAll")
	# text = json.loads(jsonurl.read())
	#Lấy id đầu tiên
	# print(text[0]['id'])
	# print(text)
	# for camera in text:
	# 	print(camera['account'])
	id_camera = "1"
	port_camera = 0
	# port_camera = "rtsp://admin:Admin@123@192.168.1.64/1"
	

	
	# rd.set('foo', "bar") 
	# v = rd.get('foo')
	# print (v.decode())
	camera_1 = threading.Thread(target=runCamera, args=(socketio, rd, id_camera, port_camera,))
	camera_1.start()
	worker_1 = threading.Thread(target=detectObject, args=(socketio, rd, id_camera, port_camera,))
	worker_1.start()
    
def signal_handler(sig, frame):
	# cleanup_stop_thread()
	print("-----END-----")
	sys.exit(0)
if __name__ == '__main__':
	setupApp(app)
	signal.signal(signal.SIGINT, signal_handler)
	socketio.run(app)