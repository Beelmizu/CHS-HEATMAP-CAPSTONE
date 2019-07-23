from flask import Flask ,request
from flask_socketio import SocketIO, send
import socket
import time
import redis

def getFrameCamera(socketio,rd, id_camera,):
    while True:
        try:
            # Lấy Base64 đẩy về web
            # socketio.sleep(0.05)
            image = rd.get(str(id_camera))
            # Lấy từ redis với key là id của camera
            socketio.emit("stream_camera", image.decode())
            # time.sleep(0.1)
            socketio.sleep(0.1)
        except Exception as e:
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
            pass

def getObjectDetection(socketio,rd, id_camera,):
    while True:
        try:
            # socketio.sleep(0.1)
            # Lấy từ redis với key là id của camera + _OD (Object detection)
            image = rd.get(str(id_camera)+"_OD")
            socketio.emit("stream_object", image.decode())
            time.sleep(2)
            
        except Exception as e:
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
            pass

def getHeatmap(socketio,rd, id_camera,):
    while True:
        try:
            image = rd.get(str(id_camera)+"_HM")
            socketio.emit("stream_heatmap", image.decode())
            time.sleep(60)
        except Exception as e:
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
            pass