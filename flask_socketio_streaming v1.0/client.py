import socket
import numpy as np
import cv2

    
soc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)#ソケットオブジェクト作成

soc.connect((socket.gethostname(), 80))#サーバー側のipと使用するポート(ポートはサーバーと同じにする。)
print("Connect success")

while(1):
    data = soc.recv(921600)#引数は下記注意点参照
    #921600 for 480, 640
    #2764800 for 720, 1280
    data = np.fromstring(data,dtype=np.uint8)#バイトデータ→ndarray変換

    data = np.reshape(data,(480,640,3))#形状復元(これがないと一次元行列になってしまう。)　reshapeの第二引数の(480,640,3)は引数は送られてくる画像の形状

    cv2.imshow("",data)


    k = cv2.waitKey(1)
    if k & 0xFF == ord('q'):
        break

cv2.destroyAllWindows() # 作成したウィンドウを破棄   