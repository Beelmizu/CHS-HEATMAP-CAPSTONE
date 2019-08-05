
import io
import base64
from flask_socketio import SocketIO, send
from heatmap import Heatmapper
from PIL import Image
import cv2
from io import BytesIO
from Thread_worker import *
import Thread_face as thread_fa
import Thread_db as thread_db
import datetime
import gc
import threading
import numpy as np
heatmapper = Heatmapper(
    point_diameter=50,  # the size of each point to be drawn
    point_strength=0.1,  # the strength, between 0 and 1, of each point to be drawn
    opacity=0.5,)
def viewHeatmapCamera(socketio, rd, id_camera, matrix_heatmap, box, width, height, currentTime, countNum):
    try:
        save_background_location = "./Server_data/Background/"+ str(width) +"x" + str(height) + ".png"
        # print(box)
        string_matrix = ""
        gender_list = ""
        age_list = ""
        # print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
        result = thread_fa.detectFace(rd, id_camera,)
        # face = threading.Thread(target=detectFace, args=(rd, id_camera, gender_list, age_list))
        # face.start()
        
        for i in range(len(box)):
            ymax = (int(box[i,0]*height))
            xmin = (int(box[i,1]*width))
            ymin = (int(box[i,2]*height))
            xmax = (int(box[i,3]*width))
            if(ymin == 0 and xmin == 0 and ymax == 0 and xmax == 0):
                break

            # y = (ymin+ymax)//2
            y = ymin
            x = (xmin+xmax)//2
            string_matrix = string_matrix + str(x)+"," + str(y) + ";"
            matrix_heatmap.append((x,y))
            # print("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx: ", x)
            # print("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy: ", y)
        try:
            background = Image.open(save_background_location)
        except:
            background_image = Image.new('RGBA', (width, height), (255,255,255,0))
            background_image.save(save_background_location)
            background = Image.open(save_background_location)
        heatmap = heatmapper.heatmap_on_img(matrix_heatmap, background)
            
        # Chuyển thành Base 64 và bỏ vào redis
        buffered = BytesIO()
        heatmap.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue())
        rd.set(str(id_camera) + "_HM", img_str)
        # print(matrix_heatmap)
        # setMatrixToDB(string_matrix, id_camera, currentTime)
        # print("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG: ",result["gender"])
        # print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: ",result["age"])
        if countNum != 0:
            db = threading.Thread(target=thread_db.addReport, args=(string_matrix, id_camera, currentTime, countNum, result["gender"], result["age"]))
            db.start()
        # Garbage collection
        # gc.collect()
    except Exception as e:
        if hasattr(e, 'message'):
            print(e.message)
        else:
            print(e)
        pass

def previewHeatmap(socketio, rd, id_camera, startDate, endDate):
    try:
        matrix_heatmap = []
        db = threading.Thread(target=thread_db.getPreviewHeatmap, args=(matrix_heatmap, id_camera, startDate, endDate,))
        db.start()
        image_base64 = rd.get(str(id_camera))
        # Từ base64 chuyển thành image
        decoded_data = base64.b64decode(image_base64.decode())
        np_data = np.fromstring(decoded_data,np.uint8)
        image = cv2.imdecode(np_data, cv2.IMREAD_UNCHANGED)
        # print(image)
        # Convert color
        img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        im_pil = Image.fromarray(img)
        heatmap = heatmapper.heatmap_on_img(matrix_heatmap, im_pil)
            
        buffered = BytesIO()
        heatmap.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue())
        socketio.emit('preview_heatmap', img_str.decode())
        # Garbage collection
        gc.collect()
    except Exception as e:
        if hasattr(e, 'message'):
            print(e.message)
        else:
            print(e)
        pass

