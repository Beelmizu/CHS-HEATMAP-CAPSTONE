
import io
import base64
from flask_socketio import SocketIO, send
from heatmappy import Heatmapper
from PIL import Image
import cv2
def viewHeatmapCamera(socketio, idCamera, matrix_heatmap, box, width, height):
    try:
        # img = io.BytesIO()
        strW = str(width)
        strH = str(height)
        save_heatmap_location = "./Server_data/Streaming_data/Heatmap/Live/"+ idCamera + ".png"
        save_frame_location = "./Server_data/Streaming_data/Camera/"+ idCamera + ".jpg"
        save_background_location = "./Server_data/Streaming_data/Heatmap/Background/"+ strW +"x" + strH + ".png"
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
            # print(ymin, xmin, ymax, xmax)
            # for y in range(ymin, ymax):
            #     for x in range(xmin, xmax):
            #         # print(y,x)
            #         matrix_heatmap[y][x] = matrix_heatmap[y][x]+1
            # point = [(x, y)]
            matrix_heatmap.append((x,y))
            heatmapper = Heatmapper(
                point_diameter=50,  # the size of each point to be drawn
                point_strength=0.05,  # the strength, between 0 and 1, of each point to be drawn
                opacity=0.5,  # the opacity of the heatmap layer
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
            # background_image = Image.new('RGBA', (width, height), (0,0,0,0))
            # background_image.save(save_background_location)
            # background = Image.open(save_frame_location)
            heatmap = heatmapper.heatmap_on_img(matrix_heatmap, background)
            heatmap.save(save_heatmap_location)
            # plt.close()
            # img.seek(0)

            # plot_url = base64.b64encode(img.getvalue())
            # image_text = str(plot_url, "utf-8")
            # socketio.emit("2", image_text)
    except Exception as e:
        if hasattr(e, 'message'):
            print(e.message)
        else:
            print(e)
        pass

