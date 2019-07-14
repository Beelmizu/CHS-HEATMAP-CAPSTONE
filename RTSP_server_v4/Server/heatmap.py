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

def setOpacity(img, opacity):
        img = img.copy()
        alpha = img.split()[3]
        alpha = alpha.point(lambda p: int(p * opacity))
        img.putalpha(alpha)
        return img


class Heatmapper:
    def __init__(self, point_diameter=50, point_strength=0.2, opacity=0.65):
        """
        :param opacity: opacity (between 0 and 1) of the generated heatmap overlay
        :param colours: Either 'default', 'reveal',
                        OR the path to horizontal image which will be converted to a scale
                        OR a matplotlib LinearSegmentedColorMap instance.
        :param grey_heatmapper: Required to draw points on an image as a greyscale
                                heatmap. If not using the default, this must be an object
                                which fulfils the GreyHeatmapper interface.
        """

        self.opacity = opacity
        self.point_diameter = point_diameter
        self.point_strength = point_strength

    def heatmap_on_img(self, points, img):
        width, height = img.size
        return self.heatmap(width, height, points, base_img=img)
        
    def heatmap(self, width, height, points, base_img=None):
        """
        :param points: sequence of tuples of (x, y), eg [(9, 20), (7, 3), (19, 12)]
        :return: If base_path of base_img provided, a heat map from the given points
                 is overlayed on the image. Otherwise, the heat map aplone is returned
                 with a transparent background.
        """
        # Lấy màu
        self._cmap = self.getColorMap(asset_file + 'HeatmapColor.png')
        # Vẽ điểm đen trên nền trắng
        heatmap = self.drawDot(width, height, points)
        # Từ điểm đen thành màu
        heatmap = self.drawColor(heatmap)
        # set opacity của ảnh
        heatmap = setOpacity(heatmap, self.opacity)
        return Image.alpha_composite(base_img.convert('RGBA'), heatmap)


    def drawColor(self, img):
        """ maps values in greyscale image to colours """
        arr = numpy.array(img)
        rgba_img = self._cmap(arr, bytes=True)
        # coloru = Image.fromarray(rgba_img)
        # coloru.save('colour.png')
        return Image.fromarray(rgba_img)

    def getColorMap(self, img_path):
        # Lấy màu từ image default.png
        img = Image.open(img_path)
        img = img.resize((256, img.height))
        colours = (img.getpixel((x, 0)) for x in range(256))
        
        colours = [(r/255, g/255, b/255, a/255) for (r, g, b, a) in colours]
        # print(colours)
        return LinearSegmentedColormap.from_list('from_image', colours)

    def drawDot(self, width, height, points):
        # Chuyển thành màu xám
        heat = Image.new('L', (width, height), color=255)

        dot = (Image.open(asset_file + '450pxdot.png').copy()
                    .resize((self.point_diameter, self.point_diameter), resample=Image.ANTIALIAS))
        dot = setOpacity(dot, self.point_strength)
        # Vẽ điểm đen trên đó
        for x, y in points:
            x, y = int(x - self.point_diameter/2), int(y - self.point_diameter/2)
            heat.paste(dot, (x, y), dot)
        # heat.save('heat.png')
        return heat