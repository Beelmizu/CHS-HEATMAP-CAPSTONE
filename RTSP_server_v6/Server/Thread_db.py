import pymysql.cursors
import Thread_db as thread_db
import datetime
import time


def get_connection():  
    # Bạn có thể thay đổi các thông số kết nối.
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='1234',                             
                                 db='heatmapsystem')
    return connection
# Nếu có lỗi về connection thì bật MySql lên
def add_report(string_matrix, id_camera, current_time, count_number, gender, age):
    try:
        # now = datetime.datetime.now()            
        #kết nối DB
        connection = thread_db.get_connection()
        # print("Connect successful!!!!!!!!!!!!!!!!!!!!!!!!!!!!") 
        cursor = connection.cursor()
        sql = "INSERT INTO report(rep_time, rep_count, rep_heatmap, rep_cam_id, rep_people_gender, rep_people_age) values(%s, %s, %s, %s, %s, %s)"
        # print("Insert count: ", count_number)
        cursor.execute(sql, (current_time, count_number, string_matrix, id_camera, gender, age))
        connection.commit()

        # cursor = connection.cursor()
        # sql = "INSERT INTO heatmap(htm_matrix, htm_time, htm_cam_id) values(%s, %s, %s)"
        # print("Insert boxxxxxxxxxxx: ", string_matrix)
        # cursor.execute(sql, (string_matrix, current_time, id_camera))
        # connection.commit()
    except Exception as e:
        if hasattr(e, 'message'):
            print(e.message)
        else:
            print(e)
            pass
    finally:
        connection.close()

def get_total_matrix(id_camera, current_date):
    matrix_heatmap = []
    now = datetime.datetime.now()
    try:                     
        #kết nối DB
        connection = thread_db.get_connection()
        # print("Connect successful!") 
        # print(current_date)
        cursor = connection.cursor()
        # sql = "SELECT * FROM heatmapsystem.heatmap WHERE htm_cam_id = %s and htm_time like '%s%'"
        # cursor.execute(sql, (id_camera, current_date, ))
        current_date ='%'+current_date+'%'
        sql = "SELECT rep_heatmap FROM report WHERE rep_cam_id = %s AND rep_time Like %s"
        cursor.execute(sql, (id_camera,current_date,))
        records = cursor.fetchall()
        # print("Total number of rows is: ", cursor.rowcount)
        for row in records:
            # row kế bên row id
            # print(row[1])
            # lenStr = len(row[1])
            # lenStr = int(lenStr)
            try:
                number = ""
                for char in row[0]:
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
            except:
                pass

        print("total matrix heatmap: ", matrix_heatmap)
        cursor.close()
        return matrix_heatmap
    except Exception as e:
        if hasattr(e, 'message'):
            print(e.message)
        else:
            print(e)
                        
            pass
    finally:
        connection.close()
def get_preview_heatmap(matrix_heatmap, id_camera, start_date, end_date):
    # matrix_heatmap = []
    now = datetime.datetime.now()
    try:                     
        #kết nối DB
        connection = thread_db.get_connection()
        cursor = connection.cursor()
        sql = "Select rep_heatmap from report where rep_cam_id = %s AND rep_time BETWEEN %s AND %s;"
        cursor.execute(sql, (id_camera, start_date, end_date))
        records = cursor.fetchall()
        # print("Total number of rows is: ", cursor.rowcount)
        for row in records:
            number = ""
            for char in row[0]:
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

def get_all_camera():
    # matrix_heatmap = []
    now = datetime.datetime.now()
    try:                     
        #kết nối DB
        connection = thread_db.get_connection()
        cursor = connection.cursor()
        sql = "SELECT cam_id, cam_ip, cam_account, cam_password FROM heatmapsystem.camera Where cam_status = 'active';"
        cursor.execute(sql)
        records = cursor.fetchall()
        cursor.close()
        return records
    except Exception as e:
        if hasattr(e, 'message'):
            print(e.message)
        else:
            print(e)
                        
            pass
    finally:
        connection.close()