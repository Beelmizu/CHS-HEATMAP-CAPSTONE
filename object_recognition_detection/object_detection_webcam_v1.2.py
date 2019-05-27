
#%%
import numpy as np
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


from utils import label_map_util

from utils import visualization_utils as vis_util

#%%
# # Model preparation 
# Any model exported using the `export_inference_graph.py` tool can be loaded here simply by changing `PATH_TO_CKPT` to point to a new .pb file.  
# By default we use an "SSD with Mobilenet" model here. See the [detection model zoo](https://github.com/tensorflow/models/blob/master/object_detection/g3doc/detection_model_zoo.md) for a list of other models that can be run out-of-the-box with varying speeds and accuracies.

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

#%% Function

def create_dir(file_path):
    directory = os.path.dirname(file_path)
    if not os.path.exists(directory):
        os.makedirs(directory)
#%%
# ## Download Model

if not os.path.exists(MODEL_NAME + '/frozen_inference_graph.pb'):
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
#%%
# ## Load a (frozen) Tensorflow model into memory.

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


#%%
#intializing the web camera device
import cv2
#cap = cv2.VideoCapture(0)

#def capture_video(source):
#    cap = cv2.VideoCapture(source)
#
#    # Check if camera opened successfully
#    if (cap.isOpened() == False):
#        print("Unable to read camera feed")
#
#    # Default resolutions of the frame are obtained.The default resolutions are system dependent.
#    # We convert the resolutions from float to integer.
#    frame_width = int(cap.get(3))
#    frame_height = int(cap.get(4))
#
#    # Define the codec and create VideoWriter object.The output is stored in 'outpy.avi' file.
#    out = None
#    capturing = False
#
#    while(True):
#        ret, frame = cap.read()
#
#        if ret == True:
#
#            # Write the frame into the file 'output.avi'
#            if capturing:
#                out.write(frame)
#                cv2.putText(frame, 'CAPTURING', (30, 35),
#                    cv2.FONT_HERSHEY_SIMPLEX,
#                    0.7, (255, 255, 255), 2)
#
#            # Display the resulting frame
#            cv2.imshow('frame', frame)
#
#            # Press Q on keyboard to stop recording
#            keypress = cv2.waitKey(1) & 0xFF
#            if keypress == ord('q'):
#                break
#            
#            if keypress == ord('c'):
#                if out == None:
#                    out = cv2.VideoWriter('outpy.avi', cv2.VideoWriter_fourcc(
#                        'M', 'J', 'P', 'G'), 10, (frame_width, frame_height))
#                if capturing: 
#                    capturing = False
#                else:
#                    capturing = True
#                    
#        # Break the loop
#        else:
#            break
#
#    # When everything done, release the video capture and video write objectsqq
#    if out != None:
#        out.release()
#    cap.release()
#
#    # Closes all the frames
#    cv2.destroyAllWindows()

#%%
# Running the tensorflow session
with detection_graph.as_default():
  with tf.Session(graph=detection_graph) as sess:
    ret = True
    out = None
    capturing = True
    cap = cv2.VideoCapture(0)
    #cap = cv2.VideoCapture("input_video/video.mp4")
    now = datetime.datetime.now()
    count = 0
#    filename = strftime("%Y-%m-%d (%H:%M:%S)", gmtime()) + ".avi"
    day = now.strftime("%Y-%m-%d")
    create_dir('./'+ day +'/')
    filename = "./" + day + "/"+ day + now.strftime(" %Hh%Mp%Ss") + ".avi"
    #Create folder by date
    

    while (ret):
      ret,image_np = cap.read()
      frame_width = int(cap.get(3))
      frame_height = int(cap.get(4))
      if out == None:       
          #MJPG là chuẩn video
          out = cv2.VideoWriter(filename, cv2.VideoWriter_fourcc(*'MJPG'), 10, (frame_width, frame_height))
          #result = sum(item['name'] == "person" for item in categories)
          #count += result
          #print(result)
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
      # Visualization of the results of a detection.
      targeted_object = "person"
      is_color_recognition_enabled = 0
      counter, csv_line, the_result = vis_util.visualize_boxes_and_labels_on_image_array(cap.get(1),
                                                                                         image_np,
                                                                                         1,
                                                                                         is_color_recognition_enabled,
                                                                                         np.squeeze(boxes),
                                                                                         np.squeeze(classes).astype(np.int32),
                                                                                         np.squeeze(scores),
                                                                                         category_index,
                                                                                         targeted_objects='person',
                                                                                         use_normalized_coordinates=True,
                                                                                         line_thickness=4)
      font = cv2.FONT_HERSHEY_SIMPLEX
      if(len(the_result) == 0):
          cv2.putText(image_np, "...", (10, 35), font, 0.8, (0,255,255),2,cv2.FONT_HERSHEY_SIMPLEX)                       
      else:
          cv2.putText(image_np, the_result, (10, 35), font, 0.8, (0,255,255),2,cv2.FONT_HERSHEY_SIMPLEX)
                
                
                
      # plt.figure(figsize=IMAGE_SIZE)
#      plt.imshow(image_np)
      
#      if cv2.waitKey(25) & 0xFF == ord('q'):
#          cv2.destroyAllWindows()
#          capture_video(0)
      
      if capturing:
          out.write(image_np)
          cv2.putText(image_np, 'CAPTURING', (230, 35),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7, (255, 255, 255), 2)
        
      cv2.imshow('Video',cv2.resize(image_np,(1024,720)))
      
      keypress = cv2.waitKey(1) & 0xFF
      if keypress == ord('q'):
         break
if out != None:
    out.release()
cap.release()

# Closes all the frames
cv2.destroyAllWindows()
#%%



