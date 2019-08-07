from abc import ABCMeta, abstractmethod
from functools import partial
import io
import os
import random

from matplotlib.colors import LinearSegmentedColormap
import numpy
from PIL import Image



# _asset_file = partial(os.path.join, os.path.dirname(__file__), 'assets_heatmap')
asset_file = "./assets_heatmap/"

def set_opacity(img, opacity):
        img = img.copy()
        # Lấy màu sáng tối từ trắng tới đen
        # return: 1 mảng gồm RGB
        alpha = img.split()[3]
        alpha = alpha.point(lambda p: int(p * opacity))
        img.putalpha(alpha)
        # img.save('opacity.png')
        return img


class Heatmapper:
    def __init__(self, point_diameter=50, point_strength=0.2, opacity=0.65):

        self.opacity = opacity
        self.point_diameter = point_diameter
        self.point_strength = point_strength

    def heatmap_on_img(self, points, img):
        width, height = img.size
        return self.heatmap(width, height, points, base_img=img)
        
    def heatmap(self, width, height, points, base_img=None):
        # Lấy màu
        self.cmap = self.get_color_map(asset_file + 'HeatmapColor.png')
        # Vẽ điểm đen trên nền trắng
        heatmap = self.draw_dot(width, height, points)
        # heatmap.save('step_1.png')
        # Từ điểm đen thành màu
        heatmap = self.draw_color(heatmap)
        # heatmap.save('step_2.png')
        # set opacity của ảnh
        heatmap = set_opacity(heatmap, self.opacity)
        # heatmap.save('step_3.png')
        return Image.alpha_composite(base_img.convert('RGBA'), heatmap)


    def draw_color(self, img):
        arr = numpy.array(img)
        # print(arr)
        rgba_img = self.cmap(arr, bytes=True)
        # print(rgba_img)
        return Image.fromarray(rgba_img)

    def get_color_map(self, img_path):
        # Lấy màu từ image default.png
        img = Image.open(img_path)
        img = img.resize((256, img.height))
        colours = (img.getpixel((x, 0)) for x in range(256))
        
        colours = [(r/255, g/255, b/255, a/255) for (r, g, b, a) in colours]
        # print(colours)
        return LinearSegmentedColormap.from_list('from_image', colours)

    def draw_dot(self, width, height, points):
        # Chuyển thành màu xám
        heat = Image.new('L', (width, height), color=255)

        dot = (Image.open(asset_file + '450pxdot.png').copy()
                    .resize((self.point_diameter, self.point_diameter), resample=Image.ANTIALIAS))
        dot = set_opacity(dot, self.point_strength)
        # Vẽ điểm đen trên đó
        for x, y in points:
            x, y = int(x - self.point_diameter/2), int(y - self.point_diameter/2)
            heat.paste(dot, (x, y), dot)
        # heat.save('heat.png')
        return heat