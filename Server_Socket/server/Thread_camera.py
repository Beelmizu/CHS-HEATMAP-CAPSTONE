import socket
import numpy as np
import cv2
import time


def runCamera(soc, portCamera):
    while (True):
        cam = cv2.VideoCapture(portCamera)
        flag,img = cam.read()       #カメラから画像データを受け取る

        img = img.tostring()        #numpy行列からバイトデータに変換
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

def viewCamera(soc, portCamera):
    while (True):
        cam = cv2.VideoCapture(portCamera)
        flag,img = cam.read()       #カメラから画像データを受け取る

        img = img.tostring()        #numpy行列からバイトデータに変換
        try:
            soc.send(img) # ソケットにデータを送信
        except:
            print(str(portCamera)+"と終了")
            pass
                  

        #time.sleep(0.5)            #フリーズするなら#を外す。

        k = cv2.waitKey(1)         #↖ 
        if k== 27:                #←　ENTERキーで終了
            break                  #↙

    cam.releace()                  #カメラオブジェクト破棄