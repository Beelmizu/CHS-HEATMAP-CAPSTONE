import socket
import numpy as np
import cv2
import time



s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)#ソケットオブジェクト作成

s.bind((socket.gethostname(), 80))    # サーバー側PCのipと使用するポート

print("Connecting...")  

s.listen(1)                     # 接続要求を待機

soc, addr = s.accept()          # 要求が来るまでブロック

print(str(addr)+"と接続完了")  
cam = cv2.VideoCapture(0)#カメラオブジェクト作成


while (True):
    
    #cam = cv2.VideoCapture('rtsp://admin:Admin@123@192.168.1.64/1')
    flag,img = cam.read()       #カメラから画像データを受け取る
        
    #img = img.tostring()        #numpy行列からバイトデータに変換
    
    try:
        soc.send(img) # ソケットにデータを送信
    except:
        print(str(addr)+"と終了")
        soc, addr = s.accept()
        print(str(addr)+"と接続完了") 
        pass
                  

    #time.sleep(0.5)            #フリーズするなら#を外す。

    k = cv2.waitKey(1)         #↖ 
    if k== 27:                #←　ENTERキーで終了
        break                  #↙

cam.releace()                  #カメラオブジェクト破棄
