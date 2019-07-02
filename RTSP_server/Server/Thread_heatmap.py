
import io
import base64
from flask_socketio import SocketIO, send
from heatmappy import Heatmapper
from PIL import Image
import cv2
from io import BytesIO
def viewHeatmapCamera(socketio, rd, id_camera, matrix_heatmap, box, width, height):
    try:
        strW = str(width)
        strH = str(height)
        save_background_location = "./Server_data/Background/"+ strW +"x" + strH + ".png"
        # print(box)
        for i in range(len(box)):
            ymin = (int(box[i,0]*height))
            xmin = (int(box[i,1]*width))
            ymax = (int(box[i,2]*height))
            xmax = (int(box[i,3]*width))
            if(ymin == 0 and xmin == 0 and ymax == 0 and xmax == 0):
                break

            y = (ymin+ymax)//2
            x = (xmin+xmax)//2
            matrix_heatmap.append((x,y))
            heatmapper = Heatmapper(
                point_diameter=50,  # the size of each point to be drawn
                point_strength=0.2,  # the strength, between 0 and 1, of each point to be drawn
                opacity=0.7,  # the opacity of the heatmap layer
                colours='default',  # 'default' or 'reveal'
                                    # OR a matplotlib LinearSegmentedColorMap object 
                                    # OR the path to a horizontal scale image
                grey_heatmapper='PIL'  # The object responsible for drawing the points
                                    # Pillow used by default, 'PySide' option available if installed
            )
            try:
                background = Image.open(save_background_location)
            except:
                background_image = Image.new('RGBA', (width, height), (255,255,255,0))
                background_image.save(save_background_location)
                background = Image.open(save_background_location)
            heatmap = heatmapper.heatmap_on_img(matrix_heatmap, background)
            buffered = BytesIO()
            heatmap.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue())
            rd.set(str(id_camera) + "_HM", img_str)
    except Exception as e:
        if hasattr(e, 'message'):
            print(e.message)
        else:
            print(e)
        pass

