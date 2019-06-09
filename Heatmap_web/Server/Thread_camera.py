import socket
import numpy as np
import cv2
import time
from flask import Flask ,request
from flask_socketio import SocketIO, send
import base64

def runCamera(socketio, portCamera):
    while (True):
        cam = cv2.VideoCapture(portCamera)
        flag,img = cam.read()       #カメラから画像データを受け取る

        img = img.tostring()
        print("1")        #numpy行列からバイトデータに変換
        #try:
            #soc.send(img) # ソケットにデータを送信
        #except:
            #print(str(addr)+"と終了")
            #soc, addr = s.accept()
            #print(str(addr)+"と接続完了") 
            #pass
                  

        #time.sleep(0.5)            #フリーズするなら#を外す。

        k = cv2.waitKey(1)         #↖ 
        if k== 27:                #←　ENTERキーで終了
            break                  #↙

    cam.releace()                  #カメラオブジェクト破棄

def viewCamera(socketio, portCamera):
    cam = cv2.VideoCapture(portCamera)
    while True:
        retval, image = cam.read()
        retval, buffer = cv2.imencode('.jpg', image)
        jpg_as_text = base64.b64encode(buffer)
        image_text = str(jpg_as_text, "utf-8")
        socketio.emit('image', image_text)

    cam.releace()                  #カメラオブジェクト破棄