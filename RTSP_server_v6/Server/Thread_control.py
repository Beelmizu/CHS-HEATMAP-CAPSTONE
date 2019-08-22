from flask import Flask ,request
from flask_socketio import SocketIO, send
import socket
import time
import redis

def check_error_camera(socketio,rd, id_camera,):
    while True:
        try:
            time.sleep(5)
            # check xem camera co1 bi5 delete hay khong
            check_avaiable = rd.get(str(id_camera)+"_AVAIABLE")
            if int(check_avaiable.decode()) == 1:
                check_flag = 1
                # Check ảnh lúc lỗi và ảnh hiện tại có trùng không để nhận biết việc camera chết
                image_base64 = rd.get(str(id_camera))
                image_error = rd.get(str(id_camera)+"_ERROR")
                if image_base64 is not None:
                    if image_error is not None:
                        if image_base64.decode() == image_error.decode():
                            check_flag = 0
                    status = "check error (1) camera " + str(id_camera) + ": " + str(check_flag)
                    rd.set(str(id_camera)+"_RUN", check_flag)
                else:
                    status = "check error (2) camera " + str(id_camera) + ": 0"
                    rd.set(str(id_camera)+"_RUN", 0)
                print(status)
            else:
                break
        except Exception as e:
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
            pass