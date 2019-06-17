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
from Thread_heatmap import *
import signal
import sys
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


def runCamera(portCamera):
    cam = cv2.VideoCapture(portCamera)
    with detection_graph.as_default():
        with tf.Session(graph=detection_graph) as sess:
            ret = True
            while True:
                try:
                    retval, image = cam.read()
                    image_np_expanded = np.expand_dims(image, axis=0)
                    image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
                    # Each box represents a part of the image where a particular object was detected.
                    boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
                    # Each score represent how level of confidence for each of the objects.
                    # Score is shown on the result image, together with the class label.
                    scores = detection_graph.get_tensor_by_name('detection_scores:0')
                    classes = detection_graph.get_tensor_by_name('detection_classes:0')
                    num_detections = detection_graph.get_tensor_by_name('num_detections:0')
                    # Actual detection.
                    (boxes, scores, classes, num_detections) = sess.run(
                        [boxes, scores, classes, num_detections],
                        feed_dict={image_tensor: image_np_expanded})
                    # Visualization of the results of a detection.
                    is_color_recognition_enabled = 0
                    counter, csv_line, the_result = vis_util.visualize_boxes_and_labels_on_image_array(cam.get(1),
                                                                                                       image,
                                                                                                       1,
                                                                                                       is_color_recognition_enabled,
                                                                                                       np.squeeze(boxes),
                                                                                                       np.squeeze(classes).astype(np.int32),
                                                                                                       np.squeeze(scores),
                                                                                                       category_index,
                                                                                                       targeted_objects='person',
                                                                                                       use_normalized_coordinates=True,
                                                                                                       line_thickness=4,
                                                                                                       max_boxes_to_draw=None,
                                                                                                       min_score_thresh=0.4)
                                                                                                       
                except:
                    pass
                

    cam.release()     

def viewCamera(socketio, idCamera, portCamera):
    cam = cv2.VideoCapture(portCamera)
    width = int(cam.get(3)) #width camera
    height = int(cam.get(4)) #height camera
    # print(width,height)
    # width = 1000
    # height = 1000
    # height , width , layers =  img.shape
    #Resize ảnh còn 1 nửa
    new_h=height/2
    new_w=width/2
    new_h = int(new_h)
    new_w = int(new_w)
    # print(new_h,new_w)
    matrix_heatmap = [[0 for x in range(new_w)] for y in range(new_h)] 
    #Để 1 để lần đầu tiên chạy nó có thể chạy cái heatmap trước
    countdown_heatmap = 1
    now = datetime.datetime.now()
    count = 0
    day = now.strftime("%Y-%m-%d")
    create_dir('./streaming_data/video/'+ day +'/')
    filename = "./streaming_data/video/" + day + "/"+ day + now.strftime(" %Hh%Mp%Ss") + ".avi"    
    out = cv2.VideoWriter(filename, cv2.VideoWriter_fourcc(*'MJPG'),10.0, (new_w, new_h))
    with detection_graph.as_default():
        with tf.Session(graph=detection_graph) as sess:
            ret = True
            while True:
                try:
                    countdown_heatmap = countdown_heatmap - 1
                    retval, image_read = cam.read()
                    image = cv2.resize(image_read, (new_w, new_h))
                    image_np_expanded = np.expand_dims(image, axis=0)
                    image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
                    # Each box represents a part of the image where a particular object was detected.
                    boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
                    # Each score represent how level of confidence for each of the objects.
                    # Score is shown on the result image, together with the class label.
                    scores = detection_graph.get_tensor_by_name('detection_scores:0')
                    classes = detection_graph.get_tensor_by_name('detection_classes:0')
                    num_detections = detection_graph.get_tensor_by_name('num_detections:0')
                    # Actual detection.
                    (boxes, scores, classes, num_detections) = sess.run(
                        [boxes, scores, classes, num_detections],
                        feed_dict={image_tensor: image_np_expanded})
                    # Visualization of the results of a detection.
                    is_color_recognition_enabled = 0
                    counter, csv_line, the_result = vis_util.visualize_boxes_and_labels_on_image_array(cam.get(1),
                                                                                                       image,
                                                                                                       1,
                                                                                                       is_color_recognition_enabled,
                                                                                                       np.squeeze(boxes),
                                                                                                       np.squeeze(classes).astype(np.int32),
                                                                                                       np.squeeze(scores),
                                                                                                       category_index,
                                                                                                       targeted_objects='person',
                                                                                                       use_normalized_coordinates=True,
                                                                                                       line_thickness=2,
                                                                                                       max_boxes_to_draw=None,
                                                                                                       min_score_thresh=0.4)
                    # Đặt count vào màn hình
                    font = cv2.FONT_HERSHEY_SIMPLEX
                    if(the_result == ""):
                        cv2.putText(image, "...", (5, 25), font, 0.7, (0,255,255),2,cv2.FONT_HERSHEY_SIMPLEX)                       
                    else:
                        cv2.putText(image, the_result, (5, 25), font, 0.7, (0,255,255),2,cv2.FONT_HERSHEY_SIMPLEX)
                    #record video
                    box = np.squeeze(boxes)
                    retval, buffer = cv2.imencode('.jpg', image)
                    jpg_as_text = base64.b64encode(buffer)
                    image_text = str(jpg_as_text, "utf-8")
                    #truyền về id camera ở html
                    socketio.emit(idCamera, image_text)
                    
                    if countdown_heatmap == 0:
                        #Chạy heatmap sau khi chạy xong 25 frame
                        countdown_heatmap = 25
                        heatmap = threading.Thread(target=viewHeatmapCamera, args=(socketio, matrix_heatmap, box, new_w, new_h,))
                        heatmap.start()
                    out.write(image)
                    socketio.sleep(0.1)
                except Exception as e:
                    if hasattr(e, 'message'):
                        print(e.message)
                    else:
                        print(e)
                    pass
    cam.release()

def viewRawCamera(socketio, idCamera, portCamera):
    cam = cv2.VideoCapture(portCamera)
    while True:
        try:
            retval, image = cam.read()
            retval, buffer = cv2.imencode('.jpg', image)
            jpg_as_text = base64.b64encode(buffer)
            image_text = str(jpg_as_text, "utf-8")
            socketio.emit(idCamera, image_text)
        except:
            pass

    cam.release() #カメラオブジェクト破棄


def create_dir(file_path):
    directory = os.path.dirname(file_path)
    if not os.path.exists(directory):
        os.makedirs(directory)


