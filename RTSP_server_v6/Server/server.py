﻿from flask import Flask ,request
from flask_socketio import SocketIO, send
import cv2
import base64
from Thread_camera import *
from Thread_heatmap import *
from Thread_worker import *
from Thread_client import *
import Thread_db as thread_db
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

@socketio.on('preview_heatmap')
def connected(data):
	# 1;2019-07-12 15:25:06.535100,2019-07-12 15:26:52.927587
	id_camera = ""
	start = ""
	end = ""
	str_data = ""
	for char in data:
		if char == ";":
			id_camera = str_data
			# print(str_data)

		if char == ",":
			start  = str_data
			# print(str_data)

		if char == "," or char == ";":
			str_data = ""
		else:
			str_data = str_data + str(char)
	end = str_data
	# print("id camera",id_camera)
	# print("start day",start)
	# print("End day",end)
	camera = threading.Thread(target=preview_heatmap, args=(socketio, rd, id_camera, start, end))
	camera.start()
@socketio.on('stream_camera')
def connected(data):
	id_camera = str(data)
	print("Connect to Camera: "+id_camera)
	try:
		camera = threading.Thread(target=get_frame_camera, args=(socketio, rd, id_camera,))
		camera.start()
		camera_OD = threading.Thread(target=get_object_detection, args=(socketio, rd, id_camera,))
		camera_OD.start()
		camera_HM = threading.Thread(target=get_heatmap, args=(socketio, rd, id_camera,))
		camera_HM.start()
	except Exception as e:
		if hasattr(e, 'message'):
			print(e.message)
		else:
			print(e)


def setup_app(app):
	# port_camera = "rtsp://admin:Admin@123@192.168.1.64/1"
	# port_camera = "rtsp://admin:Admin@123@14.187.178.200:10554"
	cameras = thread_db.get_all_camera()
	for camera in cameras:
		# 0 là id, 1 là ip, 2 là account, 3 là password
		port_camera ="rtsp://" + camera[2] + ":" + camera[3] + "@" + camera[1]
		id_camera = str(camera[0])
		print(port_camera)
		# print(camera[0])
		if camera[2] == "admin":
			# port_camera = 0
			print("Start Camera: ", port_camera)
			thread_camera = threading.Thread(target=run_camera, args=(socketio, rd, id_camera, port_camera,))
			thread_camera.start()
			thread_worker = threading.Thread(target=detect_object, args=(socketio, rd, id_camera,))
			thread_worker.start()
def signal_handler(sig, frame):
	# cleanup_stop_thread()
	print("-----END-----")
	sys.exit(0)
if __name__ == '__main__':
	setup_app(app)
	signal.signal(signal.SIGINT, signal_handler)
	socketio.run(app)