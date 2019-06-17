from flask import Flask ,request
from flask_socketio import SocketIO, send
import cv2
import base64
from Thread_camera import *
from Thread_heatmap import *
import threading
app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app)
clients = []


#Đón message từ client
@socketio.on('message')
def handleMessage(msg):
	print('Message: ' + msg)
	#send(msg, broadcast=True)

@socketio.on('stream_camera')
def connected(data):
	index_port = data.find(':')
	id_camera = data[0:index_port]
	port = data[index_port+1:len(data)]
	print("Connect to Camera: "+id_camera)
	print("Connect to PORT: "+port)
	
	if(port == "webcam"):
		port = 0

	camera_1 = threading.Thread(target=viewCamera, args=(socketio, id_camera, port,))
	camera_1.start()
	# while True:

	# 	retval, image = cap.read()
	# 	retval, buffer = cv2.imencode('.jpg', image)
	# 	jpg_as_text = base64.b64encode(buffer)
	# 	image_text = str(jpg_as_text, "utf-8")
	# 	#jpg_as_text = image.tostring()
	# 	socketio.emit('image', image_text)


def setupApp(app):
	port = 0
	camera = threading.Thread(target=runCamera, args=(port,))
	camera.start()
    
def signal_handler(sig, frame):
    print("-----END-----")
    sys.exit(0)
if __name__ == '__main__':
	#setupApp(app)
	signal.signal(signal.SIGINT, signal_handler)
	socketio.run(app)