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
from Upload_cloud import *
from Thread_heatmap import *
import signal
import sys
from Thread_upload_cloud import *

#%%
# # Model preparation 
# Any model exported using the `export_inference_graph.py` tool can be loaded here simply by changing `PATH_TO_CKPT` to point to a new .pb file.  
# By default we use an "SSD with Mobilenet" model here. See the [detection model zoo](https://github.com/tensorflow/models/blob/master/object_detection/g3doc/detection_model_zoo.md) for a list of other models that can be run out-of-the-box with varying speeds and accuracies.
# Màu của seaborn
retake_heatmap_count = 25
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
 

def runCamera(socketio, id_camera, port_camera):
    cam = cv2.VideoCapture(port_camera)
    width = int(cam.get(3)) #width camera
    height = int(cam.get(4)) #height camera
    # print(width,height)
    # width = 1000
    # height = 1000
    # height , width , layers =  img.shape
    #Resize ảnh vaà lấy phần nguyên
    new_h=height//2.5
    new_w=width//2.5
    new_h = int(new_h)
    new_w = int(new_w)
    # print(new_h,new_w)
    # matrix_heatmap = [[0 for x in range(new_w)] for y in range(new_h)]
    matrix_heatmap = [] 
    #Để 1 để lần đầu tiên chạy nó có thể chạy cái heatmap trước
    countdown_heatmap = 1
    now = datetime.datetime.now()
    day = now.strftime("%Y-%m-%d")
    create_dir('./Server_data/Save_data/Camera/'+ id_camera +'/'+ day +'/')
    save_file_location = "./Server_data/Save_data/Camera/"+ id_camera + '/' + day + "/"+ day + ".avi"
    save_frame_location = "./Server_data/Streaming_data/Camera/"+ id_camera + ".jpg"
    # uploadFile(day + ".avi", "./Server_data/Save_data/Camera/"+ id_camera + '/' + day + "/"+ day + ".avi", 'video/avi')
    
    Upload_time_set = now + datetime.timedelta(minutes=1)
    print(Upload_time_set)
    print(now)
    # filename = "./Server_data/Save_data/Camera/"+ id_camera +".avi"    
    save_camera = cv2.VideoWriter(save_file_location, cv2.VideoWriter_fourcc(*'MJPG'),10.0, (new_w, new_h))

    
    with detection_graph.as_default():
        with tf.Session(graph=detection_graph) as sess:
            ret = True
            while True:
                try:
                    now = datetime.datetime.now()
                    print(now)
                    if now > Upload_time_set:
                        # Xuống dưới chạy
                        print("--------------------------UPLOAD TO CLOUD---------------------------------")
                        break
                    countdown_heatmap = countdown_heatmap - 1
                    retval, image_read = cam.read()
                    if image_read is not None:
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
                        boxes = np.squeeze(boxes)
                        scores = np.squeeze(scores)
                        classes = np.squeeze(classes)
                        # chỉ check lấy người
                        indices = np.argwhere(classes == 1)
                        boxes = np.squeeze(boxes[indices])
                        scores = np.squeeze(scores[indices])
                        classes = np.squeeze(classes[indices])
                        counter, csv_line, the_result = vis_util.visualize_boxes_and_labels_on_image_array(cam.get(1),
                                                                                                        image,
                                                                                                        1,
                                                                                                        is_color_recognition_enabled,
                                                                                                        boxes,
                                                                                                        classes.astype(np.int32),
                                                                                                        scores,
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
                        # socketio.emit(id_camera, image_text)
                        
                        if countdown_heatmap == 0:
                            #Chạy heatmap sau khi chạy xong 25 frame
                            countdown_heatmap = retake_heatmap_count
                            heatmap = threading.Thread(target=viewHeatmapCamera, args=(socketio, id_camera, matrix_heatmap, box, new_w, new_h,))
                            heatmap.start()
                        save_camera.write(image)
                        cv2.imwrite(save_frame_location, image)
                        time.sleep(0.1) 
                        # socketio.sleep(0.5)
                    else:
                        cam = cv2.VideoCapture(port_camera)
                except Exception as e:
                    if hasattr(e, 'message'):
                        print(e.message)
                    else:
                        print(e)
                        
                    pass
    print("Camera have been stop.")            
    cam.release()
    time.sleep(1)
    upload = threading.Thread(target=uploadToCloud, args=(socketio, id_camera, port_camera,))
    upload.start()
    
def viewRawCamera(socketio, id_camera, port_camera):
    cam = cv2.VideoCapture(port_camera)
    while True:
        try:
            retval, image = cam.read()
            retval, buffer = cv2.imencode('.jpg', image)
            jpg_as_text = base64.b64encode(buffer)
            image_text = str(jpg_as_text, "utf-8")
            socketio.emit(id_camera, image_text)
        except:
            pass

    cam.release() #カメラオブジェクト破棄

def getFrameCamera(socketio, id_camera):
    # cap = cv2.VideoCapture('./streaming_data/video/1.avi')
    save_frame_location = "./Server_data/Streaming_data/Camera/"+ id_camera + ".jpg"
    save_heatmap_location = "./Server_data/Streaming_data/Heatmap/Live/"+ id_camera + ".png"
    countdown_heatmap = 1
    while True:
        try:
            countdown_heatmap = countdown_heatmap - 1
            # get stream camera
            image_camera = cv2.imread(save_frame_location)
            retval_camera, jpg_camera = cv2.imencode('.jpg', image_camera)
            jpg_camera_as_text = base64.b64encode(jpg_camera)
            stream_camera_text = str(jpg_camera_as_text, "utf-8")
            # print(image)
            socketio.sleep(0.1)
            socketio.emit("stream_camera", stream_camera_text)
            if countdown_heatmap == 0:
                # print(countdown_heatmap)
                countdown_heatmap = retake_heatmap_count
                #get heatmap và ko có nó tự thêm background
                image_heatmap = cv2.imread(save_heatmap_location, cv2.IMREAD_UNCHANGED)
                retval_heatmap, jpg_heatmap = cv2.imencode('.png', image_heatmap)
                jpg_heatmap_as_text = base64.b64encode(jpg_heatmap)
                stream_heatmap_text = str(jpg_heatmap_as_text, "utf-8")
                # print(image)
                socketio.sleep(0.1)
                socketio.emit("stream_heatmap", stream_heatmap_text)
        except:
            # 
            pass
    

def create_dir(file_path):
    directory = os.path.dirname(file_path)
    if not os.path.exists(directory):
        os.makedirs(directory)


