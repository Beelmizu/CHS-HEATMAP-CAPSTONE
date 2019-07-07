import threading
from flask import Flask ,request
from flask_socketio import SocketIO, send
import cv2
import datetime
import Thread_camera as camera
from Upload_cloud import *


def uploadToCloud(socketio, rd, id_camera, port_camera):
    print("RESTART")
    now = datetime.datetime.now()
    day = now.strftime("%Y-%m-%d")
    camera_1 = threading.Thread(target=camera.runCamera, args=(socketio, rd, id_camera, port_camera,))
    camera_1.start()
    try:
        uploadFile("camera_" + str(id_camera) + "_" + day + ".avi", "./Server_data/Save_data/Camera/"+ id_camera + '/' + day + "/"+ day + ".avi", 'video/avi')
        pass
    except:
        pass 
    
    