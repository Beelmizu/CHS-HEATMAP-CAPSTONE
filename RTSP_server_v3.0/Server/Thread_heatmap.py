
import io
import base64
from flask_socketio import SocketIO, send
from heatmappy import Heatmapper
from PIL import Image
import cv2
from io import BytesIO
from Thread_worker import *
import datetime
import gc
now = datetime.datetime.now()
currentDate = now.strftime("%Y-%m-%d")

def viewHeatmapCamera(socketio, rd, id_camera, matrix_heatmap, box, width, height):
    try:
        save_background_location = "./Server_data/Background/"+ str(width) +"x" + str(height) + ".png"
        # print(box)
        string_matrix = ""
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
            heatmapper = Heatmapper(
                point_diameter=50,  # the size of each point to be drawn
                point_strength=0.1,  # the strength, between 0 and 1, of each point to be drawn
                opacity=0.7,  # the opacity of the heatmap layer
                colours='default',  # 'default' or 'reveal'
                                    # OR a matplotlib LinearSegmentedColorMap object 
                                    # OR the path to a horizontal scale image
                grey_heatmapper='PIL'  # The object responsible for drawing the points
                                    # Pillow used by default, 'PySide' option available if installed
            )
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
        getMatrix(string_matrix, id_camera)
        # Garbage collection
        gc.collect()
    except Exception as e:
        if hasattr(e, 'message'):
            print(e.message)
        else:
            print(e)
        pass

def getMatrix(string_matrix, id_camera):
    try:
                        
        #kết nối DB
        connection = getConnection()
        # print("Connect successful!!!!!!!!!!!!!!!!!!!!!!!!!!!!") 

        cursor = connection.cursor()
        sql = "INSERT INTO heatmap(htm_matrix, htm_time, htm_cam_id) values(%s, %s, %s)"
        print("Insert boxxxxxxxxxxx: ", string_matrix)
        cursor.execute(sql, (string_matrix, now, id_camera))
        connection.commit()
    except Exception as e:
        if hasattr(e, 'message'):
            print(e.message)
        else:
            print(e)
            pass
    finally:
        connection.close()

def Convert(string):
    li = list(string.split(";"))
    return li

def totalMatrix(matrix_heatmap, id_camera, currentDate):
    # matrix_heatmap = []
    now = datetime.datetime.now()
    currentDate = now.strftime("%Y-%m-%d")
    try:                     
        #kết nối DB
        connection = getConnection()
        # print("Connect successful!") 
        # print(currentDate)
        cursor = connection.cursor()
        # sql = "SELECT * FROM heatmapsystem.heatmap WHERE htm_cam_id = %s and htm_time like '%s%'"
        # cursor.execute(sql, (id_camera, currentDate, ))
        currentDate ='%'+currentDate+'%'
        sql = "SELECT * FROM heatmapsystem.heatmap WHERE htm_cam_id = %s AND htm_time Like %s"
        cursor.execute(sql, (id_camera,currentDate,))
        records = cursor.fetchall()
        # print("Total number of rows is: ", cursor.rowcount)
        for row in records:
            # row kế bên row id
            # print(row[1])
            # lenStr = len(row[1])
            # lenStr = int(lenStr)
            number = ""
            for char in row[1]:
                if char == ",":
                    x = int(number)
                    # print(x)
                if char == ";":
                    y =int(number)
                    # print(y)
                    matrix_heatmap.append((x,y))
                
                if char == "," or char == ";":
                    number = ""
                else:
                    number = number + str(char)
            # print(matrix_heatmap)
            # matrix_heatmap.append(Convert(row[1]))

        print("total matrix heatmap: ", matrix_heatmap)
        cursor.close()

    except Exception as e:
        if hasattr(e, 'message'):
            print(e.message)
        else:
            print(e)
                        
            pass
    finally:
        connection.close()