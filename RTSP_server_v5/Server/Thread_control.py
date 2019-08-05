from flask import Flask ,request
from flask_socketio import SocketIO, send
import socket
import time
import redis

def checkErrorCamera(socketio,rd, id_camera,):
    while True:
        try:
            check_flag = 1
            # Check ảnh lúc lỗi và ảnh hiện tại có trùng không để nhận biết việc camera chết
            image_base64 = rd.get(str(id_camera))
            image_error = rd.get(str(id_camera)+"_ERROR")
            if image_error is not None:
                if image_base64.decode() == image_error.decode():
                    check_flag = 0
            rd.set(str(id_camera)+"_RUN", check_flag)
            time.sleep(1)
        except Exception as e:
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
            pass