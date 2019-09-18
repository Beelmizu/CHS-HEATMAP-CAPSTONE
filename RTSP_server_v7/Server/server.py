from flask import Flask ,request
from flask_socketio import SocketIO, send
import cv2
import base64
from Thread_camera import *
from Thread_heatmap import *
from Thread_worker import *
from Thread_client import *
from Thread_face import *
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
@socketio.on('stop_stream')
def connected():
	id_client = request.sid
	print("id stop connect:", id_client)
	rd.set("CLIENT_" + id_client, 0)

@socketio.on('stream_camera')
def connected(data):
	id_camera = str(data)
	print("Connect to Camera: " + id_camera)
	id_client = request.sid
	print("id connect: ", id_client)
	try:
		rd.set("CLIENT_" + id_client, 1)
		camera = threading.Thread(target=get_frame_camera, args=(socketio, rd, id_camera, id_client,))
		camera.start()
		camera_OD = threading.Thread(target=get_object_detection, args=(socketio, rd, id_camera, id_client,))
		camera_OD.start()
		camera_HM = threading.Thread(target=get_heatmap, args=(socketio, rd, id_camera, id_client))
		camera_HM.start()
	except Exception as e:
		if hasattr(e, 'message'):
			print(e.message)
		else:
			print(e)
# @socketio.on('camera_image')
# def connected(data):
# 	id_camera = str(data)
# 	print("Connect to Camera: "+id_camera)
# 	try:
# 		image = rd.get(str(id_camera))
#         if image is not None:
#             socketio.emit("stream_camera", image.decode())
# 	except Exception as e:
# 		if hasattr(e, 'message'):
# 			print(e.message)
# 		else:
# 			print(e)
# @socketio.on('heatmap_image')
# def connected(data):
# 	id_camera = str(data)
# 	print("Connect to Camera: "+id_camera)
# 	try:
# 		image = rd.get(str(id_camera)+"_HM")
#         if image is not None:
#             socketio.emit("stream_heatmap", image.decode())
# 	except Exception as e:
# 		if hasattr(e, 'message'):
# 			print(e.message)
# 		else:
# 			print(e)
# @socketio.on('object_image')
# def connected(data):
# 	id_camera = str(data)
# 	print("Connect to Camera: "+id_camera)
# 	try:
# 		image = rd.get(str(id_camera)+"_OD")
#         if image is not None:
#             socketio.emit("stream_object", image.decode())
# 	except Exception as e:
# 		if hasattr(e, 'message'):
# 			print(e.message)
# 		else:
# 			print(e)
@socketio.on('delete_camera')
def connected(data):
	try:
		id_camera = str(data)
		rd.set(str(id_camera)+"_AVAIABLE", 0)
	except Exception as e:
		if hasattr(e, 'message'):
			print(e.message)
		else:
			print(e)
@socketio.on('get_all_camera_status')
def connected(data):
	report = ""
	try:
		cameras = thread_db.get_all_camera()
		# print(cameras)
		for camera in cameras:
			id_camera = str(camera[0])
			try:
				status = rd.get(str(id_camera)+"_RUN")
				if status is not None:
					status = status.decode()
				else:
					status = 0
			except Exception as e:
				status = 0
			status = str(status)
			report = report + id_camera + "," + status + ";"
			# print(report)
		socketio.emit("get_all_camera_status", report)
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
		# 0 là id, 1 là ip, 2 là account, 3 là password, 4 là zone id
		port_camera ="rtsp://" + camera[2] + ":" + camera[3] + "@" + camera[1]
		id_camera = str(camera[0])
		id_zone = str(camera[4])
		print(port_camera)
		# print(camera[0])
		if camera[2] == "admin":
			# port_camera = 0
			print("Start Camera: ", port_camera)
			rd.set(str(id_camera)+"_RUN", 1)
			rd.set(str(id_camera)+"_AVAIABLE", 1)
			thread_camera = threading.Thread(target=run_camera, args=(socketio, rd, id_camera, port_camera,))
			thread_camera.start()
			thread_worker = threading.Thread(target=detect_object, args=(socketio, rd, id_camera, id_zone,))
			thread_worker.start()
			# thread_face = threading.Thread(target=detect_face_customer, args=(rd, id_camera,))
			# thread_face.start()
if __name__ == '__main__':
	setup_app(app)
	socketio.run(app)