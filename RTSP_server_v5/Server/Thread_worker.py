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
from io import BytesIO
from time import gmtime, strftime
from collections import defaultdict
from io import StringIO
from matplotlib import pyplot as plt
from mpl_toolkits.mplot3d import axes3d
from PIL import Image, ImageDraw, ImageFont
import seaborn as sns
import pandas as pd
import matplotlib as mpl
mpl.use('Agg')
from utils import label_map_util
from utils import visualization_utils as vis_util
import io
import threading
from Upload_cloud import *
import Thread_heatmap as thread_hm
import Thread_db as thread_db
import signal
import sys
from Thread_upload_cloud import *
from Thread_face import * 
import redis

import pymysql.cursors
#%%
# # Model preparation 
# Any model exported using the `export_inference_graph.py` tool can be loaded here simply by changing `PATH_TO_CKPT` to point to a new .pb file.  
# By default we use an "SSD with Mobilenet" model here. See the [detection model zoo](https://github.com/tensorflow/models/blob/master/object_detection/g3doc/detection_model_zoo.md) for a list of other models that can be run out-of-the-box with varying speeds and accuracies.
# Font chữ
font = ImageFont.truetype("./font/arial.ttf", 18)
fontFaceRe = ImageFont.truetype("./font/arial.ttf", 14)
retake_heatmap_count = 200
# What model to download.
MODEL_NAME = 'faster_rcnn_inception_v2_coco_2018_01_28'
MODEL_FILE = MODEL_NAME + '.tar.gz'
DOWNLOAD_BASE = 'http://download.tensorflow.org/models/object_detection/'
#VIDEO_NAME = 'a.mp4'
#CWD_PATH = os.getcwd()

# Path to frozen detection graph. This is the actual model that is used for the object detection.
PATH_TO_CKPT = MODEL_NAME + '/frozen_inference_graph.pb'

# List of the strings that is used to add correct label for each box.
PATH_TO_LABELS = os.path.join('data', 'mscoco_label_map.pbtxt')

#PATH_TO_VIDEO = os.path.join(CWD_PATH,VIDEO_NAME)

NUM_CLASSES = 1

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



def detectObject(socketio, rd, id_camera):
    
    currentTime = datetime.datetime.now()
    currentDate = currentTime.strftime("%Y-%m-%d")
    upload_time = currentTime + datetime.timedelta(days=1)
    upload_time = upload_time.replace(hour=0, minute=0, second=0, microsecond=0)
    matrix_heatmap = thread_db.getTotalMatrix(id_camera, currentDate,)
    # print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    # db = threading.Thread(target=thread_db.getTotalMatrix, args=(matrix_heatmap, id_camera, currentDate,))
    # db.start()
    # Chạy nhận dạng gender và age
    # face = threading.Thread(target=detectFace, args=(rd, id_camera,))
    # face.start()
#     #Để 1 để lần đầu tiên chạy nó có thể chạy cái heatmap trước
    countdown_heatmap = 1
    heatmapTime = datetime.datetime.now()
    heatmapRunTime = heatmapTime + datetime.timedelta(minutes=1)

    with detection_graph.as_default():
        with tf.Session(graph=detection_graph) as sess:
            ret = True
            while True:
                try:
                    countdown_heatmap = countdown_heatmap - 1
                    # Lấy ảnh từ redis và decode
                    image_base64 = rd.get(str(id_camera))
                    # Từ base64 chuyển thành image
                    decoded_data = base64.b64decode(image_base64.decode())
                    np_data = np.fromstring(decoded_data,np.uint8)
                    image = cv2.imdecode(np_data, cv2.IMREAD_UNCHANGED)
                    height, width, channel = image.shape
                    # Địa chỉ lấy background
                    save_background_location = "./Server_data/Background/"+ str(width) +"x" + str(height) + ".png"
                    if image is not None:
                        # image = cv2.resize(image_read, (new_w, new_h))
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
                        counter, csv_line, the_result = vis_util.visualize_boxes_and_labels_on_image_array(1,
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
                                                                                                        min_score_thresh=0.5)
                        #record video
                        box = np.squeeze(boxes)
                        retval, buffer = cv2.imencode('.jpg', image)
                        jpg_as_text = base64.b64encode(buffer)
                        image_text = str(jpg_as_text, "utf-8")
                        #truyền về id camera ở html
                        # Load background và tạo mới nếu chưa có
                        try:
                            background_OD = Image.open(save_background_location)
                        except:
                            background_image = Image.new('RGBA', (width, height), (255,255,255,0))
                            background_image.save(save_background_location)
                            background_OD = Image.open(save_background_location)

                        dr = ImageDraw.Draw(background_OD)
                        # Vẽ Ô vuông lên hình
                        for i in range(len(box)):
                            ymin = (int(box[i,0]*height))
                            xmin = (int(box[i,1]*width))
                            ymax = (int(box[i,2]*height))
                            xmax = (int(box[i,3]*width))
                            if(ymin == 0 and xmin == 0 and ymax == 0 and xmax == 0):
                                break
                            
                            cor = (xmin, ymin, xmax, ymax)
                            dr.rectangle(cor, outline="green")

                        # Vẽ chữ count
                        try:
                            countNum = int(''.join(filter(str.isdigit, the_result)))
                        except Exception as e:
                            countNum = 0
                            pass
                        #font chữ load ở bên trên
                        dr.text((250, 10),"Person: " + str(countNum),(0,255,0), font=font)
                        # Lấy kết quả của nhận dạng gender vs age
                        face_re = rd.get(str(id_camera) + "_FR").decode()
                        if face_re == None:
                            face_re = "Loading..."
                        dr.text((250, 30),face_re,(0,255,0), font=fontFaceRe)
                        heatmapTime = datetime.datetime.now()
                        # print(upload_time)
                        if heatmapTime > heatmapRunTime:
                            #Chạy heatmap sau khi chạy xong retake_heatmap_count frame
                            # countdown_heatmap = retake_heatmap_count
                            heatmapRunTime = heatmapTime + datetime.timedelta(minutes=1)
                            # setCount(countNum, id_camera)
                            currentTime = datetime.datetime.now()
                            # print("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
                            # print(now)
                            # print(upload_time)
                            if currentTime > upload_time:
                                upload_time = upload_time + datetime.timedelta(days=1)
                                upload_time = upload_time.replace(hour=0, minute=0, second=0)
                                matrix_heatmap = []
                            heatmap = threading.Thread(target=thread_hm.viewHeatmapCamera, args=(socketio, rd, id_camera, matrix_heatmap, box, width, height, heatmapTime, countNum,))
                            heatmap.start()
                        # Chuyển thành base64 để đẩy lên redis
                        buffered = BytesIO()
                        background_OD.save(buffered, format="PNG")
                        img_str = base64.b64encode(buffered.getvalue())
                        rd.set(str(id_camera) + "_OD", img_str)

                        
                        time.sleep(1) 
                        # socketio.sleep(0.5)
                    # else:
                        # cam = cv2.VideoCapture(port_camera)
                except Exception as e:
                    if hasattr(e, 'message'):
                        print(e.message)
                    else:
                        print(e)
                        
                    pass


