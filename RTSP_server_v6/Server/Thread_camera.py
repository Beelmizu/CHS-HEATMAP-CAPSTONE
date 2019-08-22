import socket
import numpy as np
import cv2
import time
from flask import Flask ,request
from flask_socketio import SocketIO, send
import base64
import os
import urllib as urllib
import datetime
import tarfile
import tensorflow as tf
import gc
from time import gmtime, strftime
from collections import defaultdict
from io import StringIO
from matplotlib import pyplot as plt
from mpl_toolkits.mplot3d import axes3d
from PIL import Image
import seaborn as sns
import pandas as pd
import matplotlib as mpl
mpl.use('Agg')
from utils import label_map_util
from utils import visualization_utils as vis_util
import io
import threading
from Upload_cloud import *
from Thread_heatmap import *
import signal
import sys
from Thread_upload_cloud import *
from Thread_control import *
import redis

def run_camera(socketio, rd, id_camera, port_camera):
    cam = cv2.VideoCapture(port_camera)
    width = int(cam.get(3)) #width camera
    height = int(cam.get(4)) #height camera
    #Resize ảnh vaà lấy phần nguyên
    new_h=height//2
    new_w=width//2
    new_h = int(new_h)
    new_w = int(new_w)
    rd.set(str(id_camera)+"_WIDTH", new_w)
    rd.set(str(id_camera)+"_HEIGHT", new_h)
    thread_camera = threading.Thread(target=save_video, args=(socketio, rd, id_camera, port_camera,))
    thread_camera.start()
    thread_control = threading.Thread(target=check_error_camera, args=(socketio, rd, id_camera,))
    thread_control.start()
    image_text = None
    while True:
        try:
            check_avaiable = rd.get(str(id_camera)+"_AVAIABLE")
            # print("camera run ", check_avaiable.decode())
            if int(check_avaiable.decode()) == 1:
                retval, image_read = cam.read()
                # print("image: ",image_read)
                if image_read is not None:
                    image = cv2.resize(image_read, (new_w, new_h))
                    retval, buffer = cv2.imencode('.jpg', image)
                    jpg_as_text = base64.b64encode(buffer)
                    image_text = str(jpg_as_text, "utf-8")
                    rd.set(str(id_camera), image_text)
                    # save_camera.write(image)
                else:
                    rd.delete(str(id_camera))
                    cam = cv2.VideoCapture(port_camera)
                time.sleep(0.12)
            else:
                break
        except Exception as e:
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
            pass

def save_video(socketio, rd, id_camera, port_camera):
    start_time = datetime.datetime.now()
    day = start_time.strftime("%Y-%m-%d")
    create_dir('./Server_data/Save_data/Camera/'+ id_camera +'/'+ day +'/')
    save_file_location = "./Server_data/Save_data/Camera/"+ id_camera + '/' + day + "/Camera_"+id_camera +"_"+ day + ".avi"
    
    upload_time = start_time + datetime.timedelta(days=1)
    # print(start_time)
    # print(upload_time)
    upload_time = upload_time.replace(hour=0, minute=0, second=0, microsecond=0)
    # image_base64 = rd.get(str(id_camera))
    # if image_base64 is not None:
    #     # Từ base64 chuyển thành image
    #     decoded_data = base64.b64decode(image_base64.decode())
    #     np_data = np.fromstring(decoded_data,np.uint8)
    #     image = cv2.imdecode(np_data, cv2.IMREAD_UNCHANGED)
    #     height, width, channel = image.shape
    height = rd.get(str(id_camera)+"_HEIGHT")
    if height is not None:
        height = height.decode()
        width = rd.get(str(id_camera)+"_WIDTH")
        if width is not None:
            width = width.decode()
            save_camera = cv2.VideoWriter(save_file_location, cv2.VideoWriter_fourcc(*'MJPG'),5, (int(width), int(height)))
            while True:
                try:
                    start_time = datetime.datetime.now()
                    # print(start_time)
                    # print(upload_time)
                    if start_time > upload_time:
                        # Xuống dưới chạy
                        print("--------------------------UPLOAD TO CLOUD---------------------------------")
                        break
                    # check xem camera co1 bi5 delete hay khong
                    check_avaiable = rd.get(str(id_camera)+"_AVAIABLE")
                    # print("camera run ", check_avaiable.decode())
                    if int(check_avaiable.decode()) == 1:
                        check_flag = rd.get(str(id_camera)+"_RUN")
                        if int(check_flag.decode()) == 1:
                            # Lấy ảnh từ redis và decode
                            image_base64 = rd.get(str(id_camera))
                            # Từ base64 chuyển thành image
                            if image_base64 is not None:
                                decoded_data = base64.b64decode(image_base64.decode())
                                np_data = np.fromstring(decoded_data,np.uint8)
                                image = cv2.imdecode(np_data, cv2.IMREAD_UNCHANGED)
                                save_camera.write(image)
                    time.sleep(0.2)
                except Exception as e:
                    if hasattr(e, 'message'):
                        print(e.message)
                    else:
                        print(e)
                    pass
            print("Camera have been stop.")
            time.sleep(1)
            upload = threading.Thread(target=upload_to_cloud, args=(socketio, rd, id_camera, port_camera,))
            upload.start()

def create_dir(file_path):
    directory = os.path.dirname(file_path)
    if not os.path.exists(directory):
        os.makedirs(directory)


