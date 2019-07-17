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

def getFaceBox(net, frame, conf_threshold=0.7):
    frameOpencvDnn = frame.copy()
    frameHeight = frameOpencvDnn.shape[0]
    frameWidth = frameOpencvDnn.shape[1]
    blob = cv2.dnn.blobFromImage(frameOpencvDnn, 1.0, (300, 300), [104, 117, 123], True, False)

    net.setInput(blob)
    detections = net.forward()
    bboxes = []
    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > conf_threshold:
            x1 = int(detections[0, 0, i, 3] * frameWidth)
            y1 = int(detections[0, 0, i, 4] * frameHeight)
            x2 = int(detections[0, 0, i, 5] * frameWidth)
            y2 = int(detections[0, 0, i, 6] * frameHeight)
            bboxes.append([x1, y1, x2, y2])
    return frameOpencvDnn, bboxes



faceProto = "opencv_face_detector.pbtxt"
faceModel = "opencv_face_detector_uint8.pb"

ageProto = "age_deploy.prototxt"
ageModel = "age_net.caffemodel"

genderProto = "gender_deploy.prototxt"
genderModel = "gender_net.caffemodel"

MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)
ageList = ['(0-2)', '(4-6)', '(8-12)', '(15-20)', '(25-32)', '(38-43)', '(48-53)', '(60-100)']
genderList = ['Male', 'Female']

# Load network
ageNet = cv2.dnn.readNet(ageModel, ageProto)
genderNet = cv2.dnn.readNet(genderModel, genderProto)
faceNet = cv2.dnn.readNet(faceModel, faceProto)

# Open a video file or an image file or a camera stream
def detectFace(rd, id_camera,):
    try:
        padding = 20
        # print("Get in FACEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
        # while True:
        # Lấy ảnh từ redis và decode
        image_base64 = rd.get(str(id_camera))
        # Từ base64 chuyển thành image
        decoded_data = base64.b64decode(image_base64.decode())
        np_data = np.fromstring(decoded_data,np.uint8)
        image = cv2.imdecode(np_data, cv2.IMREAD_UNCHANGED)
        # Read frame
        currentTime = datetime.datetime.now()
        hour = currentTime.strftime("%H:%M")
        frameFace, bboxes = getFaceBox(faceNet, image)
        maleNum = 0
        femaleNum = 0
        gender_list = ""
        age_list = ""
        for bbox in bboxes:
            # print(bbox)
            face = image[max(0,bbox[1]-padding):min(bbox[3]+padding,image.shape[0]-1),max(0,bbox[0]-padding):min(bbox[2]+padding, image.shape[1]-1)]
            # print(face)
            blob = cv2.dnn.blobFromImage(face, 1.0, (227, 227), MODEL_MEAN_VALUES, swapRB=False)
            # Check Gender
            genderNet.setInput(blob)
            genderPreds = genderNet.forward()
            gender = genderList[genderPreds[0].argmax()]
            gender_list = gender_list + gender + ";"
            if gender == "Male":
                maleNum = maleNum + 1
            else:
                femaleNum = femaleNum + 1
            # Check Age
            ageNet.setInput(blob)
            agePreds = ageNet.forward()
            age = ageList[agePreds[0].argmax()]
            age_list = age_list + age + ";"
            # db = threading.Thread(target=thread_db.setAnalysis, args=(gender, age, id_camera, currentTime))
            # db.start()

        report = "Male: "+ str(maleNum) + "  Female: " + str(femaleNum) + " In: " + str(hour)
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
    