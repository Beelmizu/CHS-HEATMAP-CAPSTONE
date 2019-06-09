from flask import Flask ,request
from flask_socketio import SocketIO, send
import cv2
import base64
from Thread_camera import *
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
	print("Connect to PORT: "+data)
	if(data == "webcam"):
		data = 0
	camera_1 = threading.Thread(target=viewCamera, args=(socketio, data,))
	camera_1.start()
	# while True:

	# 	retval, image = cap.read()
	# 	retval, buffer = cv2.imencode('.jpg', image)
	# 	jpg_as_text = base64.b64encode(buffer)
	# 	image_text = str(jpg_as_text, "utf-8")
	# 	#jpg_as_text = image.tostring()
	# 	socketio.emit('image', image_text)


def setupApp(app):
	data = 0
	camera = threading.Thread(target=runCamera, args=(data,))
	camera.start()
    

if __name__ == '__main__':
	setupApp(app)
	socketio.run(app)