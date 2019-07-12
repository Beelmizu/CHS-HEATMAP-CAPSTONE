import pymysql.cursors
import Thread_db as thread_db
import datetime
import time


def getConnection():  
    # Bạn có thể thay đổi các thông số kết nối.
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='1234',                             
                                 db='heatmapsystem')
    return connection
# Nếu có lỗi về connection thì bật MySql lên
def setMatrixToDB(string_matrix, id_camera, currentTime):
    try:
        # now = datetime.datetime.now()            
        #kết nối DB
        connection = thread_db.getConnection()
        # print("Connect successful!!!!!!!!!!!!!!!!!!!!!!!!!!!!") 

        cursor = connection.cursor()
        sql = "INSERT INTO heatmap(htm_matrix, htm_time, htm_cam_id) values(%s, %s, %s)"
        print("Insert boxxxxxxxxxxx: ", string_matrix)
        cursor.execute(sql, (string_matrix, currentTime, id_camera))
        connection.commit()
    except Exception as e:
        if hasattr(e, 'message'):
            print(e.message)
        else:
            print(e)
            pass
    finally:
        connection.close()

def getTotalMatrix(matrix_heatmap, id_camera, currentDate):
    # matrix_heatmap = []
    now = datetime.datetime.now()
    try:                     
        #kết nối DB
        connection = thread_db.getConnection()
        # print("Connect successful!") 
        # print(currentDate)
        cursor = connection.cursor()
        # sql = "SELECT * FROM heatmapsystem.heatmap WHERE htm_cam_id = %s and htm_time like '%s%'"
        # cursor.execute(sql, (id_camera, currentDate, ))
        currentDate ='%'+currentDate+'%'
        sql = "SELECT * FROM heatmap WHERE htm_cam_id = %s AND htm_time Like %s"
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

        # print("total matrix heatmap: ", matrix_heatmap)
        cursor.close()

    except Exception as e:
        if hasattr(e, 'message'):
            print(e.message)
        else:
            print(e)
                        
            pass
    finally:
        connection.close()
def getPreviewHeatmap(matrix_heatmap, id_camera, startDate, endDate):
    # matrix_heatmap = []
    now = datetime.datetime.now()
    try:                     
        #kết nối DB
        connection = thread_db.getConnection()
        cursor = connection.cursor()
        sql = "Select * from heatmap where htm_cam_id = %s AND htm_time BETWEEN %s AND %s;"
        cursor.execute(sql, (id_camera, startDate, endDate))
        records = cursor.fetchall()
        # print("Total number of rows is: ", cursor.rowcount)
        for row in records:
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

        print("preview matrix heatmap: ", matrix_heatmap)
        cursor.close()
        
    except Exception as e:
        if hasattr(e, 'message'):
            print(e.message)
        else:
            print(e)
                        
            pass
    finally:
        connection.close()

def setCount(countNum, id_camera, currentTime):
    try:
        # now = datetime.datetime.now()            
        #kết nối DB
        connection = thread_db.getConnection()
        print("Connect successful!") 

        cursor = connection.cursor()
        sql = "INSERT INTO report(rep_time, rep_count, rep_cam_id) values(%s, %s, %s)"
        print("Insert count: ", countNum)
        cursor.execute(sql, (currentTime, countNum, id_camera))
        connection.commit()
    except Exception as e:
        if hasattr(e, 'message'):
            print(e.message)
        else:
            print(e)
            pass
    finally:
        connection.close()