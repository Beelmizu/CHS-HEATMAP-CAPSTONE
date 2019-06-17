
import io
import seaborn as sns
import pandas as pd
import matplotlib as mpl
import base64
from flask_socketio import SocketIO, send
from matplotlib import pyplot as plt
def viewHeatmapCamera(socketio, idCamera, matrix_heatmap, box, width, height):
    try:
        img = io.BytesIO()
        save_heatmap_location = "./Server_data/Streaming_data/Heatmap/"+ idCamera + ".jpg"
        # print(box)
        for i in range(len(box)):
            ymin = (int(box[i,0]*height))
            xmin = (int(box[i,1]*width))
            ymax = (int(box[i,2]*height))
            xmax = (int(box[i,3]*width))
            if(ymin == 0 and xmin == 0 and ymax == 0 and xmax == 0):
                break
                        
            # print(ymin, xmin, ymax, xmax)
            for y in range(ymin, ymax):
                for x in range(xmin, xmax):
                    # print(y,x)
                    matrix_heatmap[y][x] = matrix_heatmap[y][x]+1


                    
            plt.figure()
            # YlOrRd là mã style của seaborn
            # sns.heatmap(matrix_heatmap, cmap='YlOrRd')
            hmap = sns.heatmap(matrix_heatmap, cmap='YlOrRd', xticklabels=False, yticklabels=False)
            #Đảo ngược trục y để 0 đếm từ dưới cùng lên trên
            # hmap.invert_yaxis()
            plt.savefig(save_heatmap_location)
            plt.close()
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