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
import redis

def runCamera(socketio, rd, id_camera, port_camera):
    cam = cv2.VideoCapture(port_camera)
    width = int(cam.get(3)) #width camera
    height = int(cam.get(4)) #height camera
    #Resize ảnh vaà lấy phần nguyên
    new_h=height//2
    new_w=width//2
    new_h = int(new_h)
    new_w = int(new_w)
    thread_camera = threading.Thread(target=saveCameraVideo, args=(socketio, rd, id_camera, port_camera,))
    thread_camera.start()
    image_text = ""
    while True:
        try:
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
                rd.set(str(id_camera)+"_ERROR", image_text)
                cam = cv2.VideoCapture(port_camera)
            time.sleep(0.05)
        except Exception as e:
            print("--------------------                  ERROR              ------------------------")
            rd.set(str(id_camera)+"_ERROR", image_text)
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
            pass

def saveCameraVideo(socketio, rd, id_camera, port_camera):
    startTime = datetime.datetime.now()
    day = startTime.strftime("%Y-%m-%d")
    create_dir('./Server_data/Save_data/Camera/'+ id_camera +'/'+ day +'/')
    save_file_location = "./Server_data/Save_data/Camera/"+ id_camera + '/' + day + "/Camera_"+id_camera +"_"+ day + ".avi"
    
    uploadTime = startTime + datetime.timedelta(days=1)
    # print(startTime)
    # print(uploadTime)
    uploadTime = uploadTime.replace(hour=0, minute=0, second=0, microsecond=0)
    image_base64 = rd.get(str(id_camera))
    # Từ base64 chuyển thành image
    decoded_data = base64.b64decode(image_base64.decode())
    np_data = np.fromstring(decoded_data,np.uint8)
    image = cv2.imdecode(np_data, cv2.IMREAD_UNCHANGED)
    height, width, channel = image.shape
    save_camera = cv2.VideoWriter(save_file_location, cv2.VideoWriter_fourcc(*'MJPG'),20.0, (width, height))
    while True:
        try:
            check_flag = True
            startTime = datetime.datetime.now()
            # print(startTime)
            # print(uploadTime)
            if startTime > uploadTime:
                # Xuống dưới chạy
                print("--------------------------UPLOAD TO CLOUD---------------------------------")
                break
            # Lấy ảnh từ redis và decode
            image_base64 = rd.get(str(id_camera))
            image_error = rd.get(str(id_camera)+"_ERROR")
            if image_error is not None:
                if image_base64.decode() == image_error.decode():
                    check_flag = False

            if check_flag:
                # Từ base64 chuyển thành image
                decoded_data = base64.b64decode(image_base64.decode())
                np_data = np.fromstring(decoded_data,np.uint8)
                image = cv2.imdecode(np_data, cv2.IMREAD_UNCHANGED)
                save_camera.write(image)
            
            time.sleep(0.05)
        except Exception as e:
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
            pass
    print("Camera have been stop.")            
    # cam.release()
    time.sleep(1)
    upload = threading.Thread(target=uploadToCloud, args=(socketio, rd, id_camera, port_camera,))
    upload.start()
    # Garbage collection
    # gc.collect()

def create_dir(file_path):
    directory = os.path.dirname(file_path)
    if not os.path.exists(directory):
        os.makedirs(directory)


