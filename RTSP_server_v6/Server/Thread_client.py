from flask import Flask ,request
from flask_socketio import SocketIO, send
import socket
import time
import redis

def get_frame_camera(socketio,rd, id_camera,):
    while True:
        try:
            # Lấy Base64 đẩy về web
            # socketio.sleep(0.05)
            image = rd.get(str(id_camera))
            # Lấy từ redis với key là id của camera
            if image is not None:
                socketio.emit("stream_camera_"+str(id_camera), image.decode())
            time.sleep(0.15)
            # socketio.sleep(0.15)
        except Exception as e:
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
            pass

def get_object_detection(socketio,rd, id_camera,):
    while True:
        try:
            # socketio.sleep(0.1)
            # Lấy từ redis với key là id của camera + _OD (Object detection)
            image = rd.get(str(id_camera)+"_OD")
            if image is not None:
                socketio.emit("stream_object_"+str(id_camera), image.decode())
            time.sleep(2)
            
        except Exception as e:
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
            pass


def get_heatmap(socketio,rd, id_camera,):
    while True:
        try:
            image = rd.get(str(id_camera)+"_HM")
            if image is not None:
                socketio.emit("stream_heatmap_"+str(id_camera), image.decode())
            time.sleep(60)
        except Exception as e:
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
            pass