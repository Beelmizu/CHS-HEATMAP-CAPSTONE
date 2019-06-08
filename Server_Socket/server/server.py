import socket
import numpy as np
import cv2
import time
from Thread_camera import *
import threading

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)#ソケットオブジェクト作成

s.bind((socket.gethostname(), 80))    # サーバー側PCのipと使用するポート
print("接続待機中")  

s.listen(1)                     # 接続要求を待機

camera_1 = threading.Thread(target=runCamera, args=("rtsp://admin:Admin@123@192.168.1.64/1",))
camera_1.start()
while True:
    soc, addr = s.accept() 
         # 要求が来るまでブロック
    portCamera = soc.recv(1024).decode('utf-8')
    print(str(portCamera)+"と接続完了")  
    camera_view = threading.Thread(target=viewCamera, args=(soc, portCamera,))
    camera_view.start()

