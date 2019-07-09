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
#%%
# # Model preparation 
# Any model exported using the `export_inference_graph.py` tool can be loaded here simply by changing `PATH_TO_CKPT` to point to a new .pb file.  
# By default we use an "SSD with Mobilenet" model here. See the [detection model zoo](https://github.com/tensorflow/models/blob/master/object_detection/g3doc/detection_model_zoo.md) for a list of other models that can be run out-of-the-box with varying speeds and accuracies.
# Màu của seaborn
# What model to download.
MODEL_NAME = 'ssd_mobilenet_v1_coco_2018_01_28'
MODEL_FILE = MODEL_NAME + '.tar.gz'
DOWNLOAD_BASE = 'http://download.tensorflow.org/models/object_detection/'
#VIDEO_NAME = 'a.mp4'
#CWD_PATH = os.getcwd()

# Path to frozen detection graph. This is the actual model that is used for the object detection.
PATH_TO_CKPT = MODEL_NAME + '/frozen_inference_graph.pb'

# List of the strings that is used to add correct label for each box.
PATH_TO_LABELS = os.path.join('data', 'mscoco_label_map.pbtxt')

#PATH_TO_VIDEO = os.path.join(CWD_PATH,VIDEO_NAME)

NUM_CLASSES = 90

detection_graph = tf.Graph()
with detection_graph.as_default():
  od_graph_def = tf.GraphDef()
  with tf.gfile.GFile(PATH_TO_CKPT, 'rb') as fid:
    serialized_graph = fid.read()
    od_graph_def.ParseFromString(serialized_graph)
    tf.import_graph_def(od_graph_def, name='')

#%%
# ## Loading label map
# Label maps map indices to category names, so that when our convolution network predicts `5`, we know that this corresponds to `airplane`.  Here we use internal utility functions, but anything that returns a dictionary mapping integers to appropriate string labels would be fine

label_map = label_map_util.load_labelmap(PATH_TO_LABELS)
categories = label_map_util.convert_label_map_to_categories(label_map, max_num_classes=NUM_CLASSES, use_display_name=True)
category_index = label_map_util.create_category_index(categories)
 

def runCamera(socketio, rd, id_camera, port_camera):
    cam = cv2.VideoCapture(port_camera)
    width = int(cam.get(3)) #width camera
    height = int(cam.get(4)) #height camera
    #Resize ảnh vaà lấy phần nguyên
    new_h=height//2
    new_w=width//2
    new_h = int(new_h)
    new_w = int(new_w)
    now = datetime.date.today()
    day = now.strftime("%Y-%m-%d")
    create_dir('./Server_data/Save_data/Camera/'+ id_camera +'/'+ day +'/')
    save_file_location = "./Server_data/Save_data/Camera/"+ id_camera + '/' + day + "/Camera_"+id_camera +"_"+ day + ".avi"
    
    Upload_time_set = now + datetime.timedelta(days=1)
    # print(now)
    # print(Upload_time_set)
    save_camera = cv2.VideoWriter(save_file_location, cv2.VideoWriter_fourcc(*'MJPG'),20.0, (new_w, new_h))

    

    while True:
        try:
            now = datetime.date.today()
            if now > Upload_time_set:
                # Xuống dưới chạy
                print("--------------------------UPLOAD TO CLOUD---------------------------------")
                break
            retval, image_read = cam.read()
            if image_read is not None:
                image = cv2.resize(image_read, (new_w, new_h))
                retval, buffer = cv2.imencode('.jpg', image)
                jpg_as_text = base64.b64encode(buffer)
                image_text = str(jpg_as_text, "utf-8")
                rd.set(str(id_camera), image_text)
                save_camera.write(image)
            # else:
            #     cam = cv2.VideoCapture(port_camera)
        except Exception as e:
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
            pass
    print("Camera have been stop.")            
    cam.release()
    # time.sleep(0.05)
    upload = threading.Thread(target=uploadToCloud, args=(socketio, rd, id_camera, port_camera,))
    upload.start()
    # Garbage collection
    # gc.collect()

def create_dir(file_path):
    directory = os.path.dirname(file_path)
    if not os.path.exists(directory):
        os.makedirs(directory)


