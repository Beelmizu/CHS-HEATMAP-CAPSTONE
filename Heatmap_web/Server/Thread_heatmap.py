
import io
import seaborn as sns
import pandas as pd
import matplotlib as mpl
from matplotlib import pyplot as plt
import base64
from flask_socketio import SocketIO, send
width = 640
height = 480
def viewHeatmapCamera(socketio, matrix_heatmap, box):
    try:
        img = io.BytesIO()
        # sns.set_style("dark") #E.G.

        # y = [1,2,3,4,5]
        # x = [0,2,1,3,4]

        # plt.plot(x,y)
        # list_2d = [[0, 1, 2], [3, 4, 5]]
        # list_2d = np.random.rand(1280,720)
        for i in range(len(box)):
            ymin = (int(box[i,0]*height))
            xmin = (int(box[i,1]*width))
            ymax = (int(box[i,2]*height))
            xmax = (int(box[i,3]*width))
            if(ymin == 0 and xmin == 0 and ymax == 0 and xmax == 0):
                break

            for ymin in range(ymax):
                for xmin in range(xmax):
                    matrix_heatmap[ymin][xmin] = matrix_heatmap[ymin][xmin]+1


        
        plt.figure()
        # YlOrRd là mã style của seaborn
        sns.heatmap(matrix_heatmap, cmap='YlOrRd')
        # sns.heatmap(matrix_heatmap, cmap='YlOrRd', xticklabels=True, yticklabels=True)
        plt.savefig(img, format='jpg')
        plt.close()
        img.seek(0)

        plot_url = base64.b64encode(img.getvalue())
        image_text = str(plot_url, "utf-8")
        socketio.emit("2", image_text)
        socketio.sleep(10)
    except Exception as e:
        if hasattr(e, 'message'):
            print(e.message)
        else:
            print(e)
        pass