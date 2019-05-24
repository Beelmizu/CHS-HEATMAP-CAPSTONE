

import numpy as np
import os
import six.moves.urllib as urllib
import sys
import tarfile
import tensorflow as tf
import zipfile

from collections import defaultdict
from io import StringIO
from matplotlib import pyplot as plt
from PIL import Image


from utils import label_map_util

from utils import visualization_utils as vis_util
#Lấy webcam
import cv2
cap = cv2.VideoCapture(0)
#Dowload module name
MODEL_NAME = 'ssd_mobilenet_v1_coco_11_06_2017'
MODEL_FILE = MODEL_NAME + '.tar.gz' #ssd_mobilenet_v1_coco_11_06_2017.tar.gz
DOWNLOAD_BASE = 'http://download.tensorflow.org/models/object_detection/'
#Model chính để nhận dạng object
PATH_TO_CKPT = MODEL_NAME + '/frozen_inference_graph.pb' #ssd_mobilenet_v1_coco_11_06_2017/frozen_inference_graph.pb
# Những ký tự cho việc thêm label vào các box
PATH_TO_LABELS = os.path.join('data', 'mscoco_label_map.pbtxt')
NUM_CLASSES = 90

#Download Model

if not os.path.exists(PATH_TO_CKPT):
	print ('Downloading the model')
	opener = urllib.request.URLopener()
	opener.retrieve(DOWNLOAD_BASE + MODEL_FILE, MODEL_FILE)
	tar_file = tarfile.open(MODEL_FILE)
	for file in tar_file.getmembers():
	  file_name = os.path.basename(file.name)
	  if 'frozen_inference_graph.pb' in file_name:
	    tar_file.extract(file, os.getcwd())
	print ('Download complete')
else:
	print ('Model already exists')
    
#Load frozen model vào memory để chạy tensorflow
detection_graph = tf.Graph()
with detection_graph.as_default():
  od_graph_def = tf.GraphDef()
  with tf.gfile.GFile(PATH_TO_CKPT, 'rb') as fid:
    serialized_graph = fid.read()
    od_graph_def.ParseFromString(serialized_graph)
    tf.import_graph_def(od_graph_def, name='')
    
    
#Load label map
label_map = label_map_util.load_labelmap(PATH_TO_LABELS)
categories = label_map_util.convert_label_map_to_categories(label_map, max_num_classes=NUM_CLASSES, use_display_name=True)
category_index = label_map_util.create_category_index(categories)


# Running the tensorflow session
with detection_graph.as_default():
  with tf.Session(graph=detection_graph) as sess:
   ret = True
   while (ret):
      ret,image_np = cap.read()
      # Expand dimensions since the model expects images to have shape: [1, None, None, 3]
      image_np_expanded = np.expand_dims(image_np, axis=0)
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
      # Vẽ ra
      vis_util.visualize_boxes_and_labels_on_image_array(
          image_np,
          np.squeeze(boxes),
          np.squeeze(classes).astype(np.int32),
          np.squeeze(scores),
          category_index,
          use_normalized_coordinates=True,
          line_thickness=8)
      
      for i, b in enumerate (boxes[0]):
          if classes[0][i] == 1:
              if scores[0][i] > 0.5:
                  mid_x = boxes[0][i][3] + boxes[0][i][1] / 2
                  mid_y = boxes[0][i][2] + boxes[0][i][0] / 2
                  apx_distance = round(1 - (boxes[0][i][3] - boxes[0][i][1])**4, 1)
                  cv2.putText(image_np, '{}'.format(apx_distance), (int(mid_x*800), int(mid_y*450)), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 3)
                  
      
      cv2.imshow('image',cv2.resize(image_np,(1280,960)))
      if cv2.waitKey(25) & 0xFF == ord('q'):
          cv2.destroyAllWindows()
          cap.release()
          break