# Import required modules
import cv2
import math
import time
import argparse
import redis
import base64
import numpy as np
import datetime
import Thread_db as thread_db
import threading

def get_face_box(net, frame, conf_threshold=0.7):
    frame_opencv_dnn = frame.copy()
    frame_height = frame_opencv_dnn.shape[0]
    frame_width = frame_opencv_dnn.shape[1]
    blob = cv2.dnn.blobFromImage(frame_opencv_dnn, 1.0, (300, 300), [104, 117, 123], True, False)

    net.setInput(blob)
    detections = net.forward()
    bboxes = []
    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > conf_threshold:
            x1 = int(detections[0, 0, i, 3] * frame_width)
            y1 = int(detections[0, 0, i, 4] * frame_height)
            x2 = int(detections[0, 0, i, 5] * frame_width)
            y2 = int(detections[0, 0, i, 6] * frame_height)
            bboxes.append([x1, y1, x2, y2])
    return frame_opencv_dnn, bboxes



face_proto = "opencv_face_detector.pbtxt"
face_model = "opencv_face_detector_uint8.pb"

age_proto = "age_deploy.prototxt"
age_model = "age_net.caffemodel"

gender_proto = "gender_deploy.prototxt"
gender_model = "gender_net.caffemodel"

MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)
age_list = ['(0-2)', '(4-6)', '(8-12)', '(15-20)', '(25-32)', '(38-43)', '(48-53)', '(60-100)']
gender_list = ['Male', 'Female']

# Load network
age_net = cv2.dnn.readNet(age_model, age_proto)
gender_net = cv2.dnn.readNet(gender_model, gender_proto)
face_net = cv2.dnn.readNet(face_model, face_proto)

# Open a video file or an image file or a camera stream
def detect_face(rd, id_camera,):
    try:
        padding = 20
        # print("Get in FACEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
        # while True:
        # Lấy ảnh từ redis và decode
        image_base64 = rd.get(str(id_camera))
        if image_base64 is not None:
            # Từ base64 chuyển thành image
            decoded_data = base64.b64decode(image_base64.decode())
            np_data = np.fromstring(decoded_data,np.uint8)
            image = cv2.imdecode(np_data, cv2.IMREAD_UNCHANGED)
            # Read frame
            current_time = datetime.datetime.now()
            hour = current_time.strftime("%H:%M")
            frame_face, bboxes = get_face_box(face_net, image)
            male_number = 0
            female_number = 0
            gender_list = ""
            age_list = ""
            for bbox in bboxes:
                # print(bbox)
                face = image[max(0,bbox[1]-padding):min(bbox[3]+padding,image.shape[0]-1),max(0,bbox[0]-padding):min(bbox[2]+padding, image.shape[1]-1)]
                # print(face)
                blob = cv2.dnn.blobFromImage(face, 1.0, (227, 227), MODEL_MEAN_VALUES, swapRB=False)
                # Check Gender
                gender_net.setInput(blob)
                gender_preds = gender_net.forward()
                gender = gender_list[gender_preds[0].argmax()]
                gender_list = gender_list + gender + ";"
                if gender == "Male":
                    male_number = male_number + 1
                else:
                    female_number = female_number + 1
                # Check Age
                age_net.setInput(blob)
                age_preds = age_net.forward()
                age = age_list[age_preds[0].argmax()]
                age_list = age_list + age + ";"
                # db = threading.Thread(target=thread_db.setAnalysis, args=(gender, age, id_camera, current_time))
                # db.start()

            report = "Male: "+ str(male_number) + "  Female: " + str(female_number) + " In: " + str(hour)
            print(report)
            # print("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG: ",gender_list)
            # print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: ",age_list)
            rd.set(str(id_camera) + "_FR", report)
            return {
                "gender":gender_list,
                "age":age_list
            }
            # time.sleep(60)
    except Exception as e:

        if hasattr(e, 'message'):
            print(e.message)
        else:
            print(e)  
            pass
    