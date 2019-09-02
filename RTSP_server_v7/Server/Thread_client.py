from flask import Flask ,request
from flask_socketio import SocketIO, send
import socket
import time
import redis

def get_frame_camera(socketio,rd, id_camera, id_client,):
    while True:
        try:
            # Lấy Base64 đẩy về web
            # socketio.sleep(0.05)
            check_client = rd.get("CLIENT_" + id_client)
            if int(check_client.decode()) == 1:
                image = rd.get(str(id_camera))
                # Lấy từ redis với key là id của camera
                print("Sending Image")
                if image is not None:
                    socketio.emit("stream_camera_"+str(id_camera), image.decode())
                time.sleep(0.15)
                # socketio.sleep(0.15)
            else:
                break
        except Exception as e:
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
            pass

def get_object_detection(socketio,rd, id_camera, id_client,):
    while True:
        try:
            # socketio.sleep(0.1)
            # Lấy từ redis với key là id của camera + _OD (Object detection)
            check_client = rd.get("CLIENT_" + id_client)
            if int(check_client.decode()) == 1:
                image = rd.get(str(id_camera)+"_OD")
                if image is not None:
                    socketio.emit("stream_object_"+str(id_camera), image.decode())
                time.sleep(2)
            else:
                break
        except Exception as e:
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
            pass


def get_heatmap(socketio,rd, id_camera, id_client,):
    while True:
        try:
            check_client = rd.get("CLIENT_" + id_client)
            if int(check_client.decode()) == 1:
                image = rd.get(str(id_camera)+"_HM")
                if image is not None:
                    socketio.emit("stream_heatmap_"+str(id_camera), image.decode())
                time.sleep(60)
            else:
                break
        except Exception as e:
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
            pass