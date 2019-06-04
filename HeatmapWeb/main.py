#!/usr/bin/env python
#
# Project: Video Streaming with Flask
# Author: Log0 <im [dot] ckieric [at] gmail [dot] com>
# Date: 2014/12/21
# Website: http://www.chioka.in/
# Description:
# Modified to support streaming out with webcams, and not just raw JPEGs.
# Most of the code credits to Miguel Grinberg, except that I made a small tweak. Thanks!
# Credits: http://blog.miguelgrinberg.com/post/video-streaming-with-flask
#
# Usage:
# 1. Install Python dependencies: cv2, flask. (wish that pip install works like a charm)
# 2. Run "python main.py".
# 3. Navigate the browser to the local webpage.
from flask import Flask, render_template, Response
from camera import VideoCamera
from flask import flash, redirect, render_template, request, session, abort
from threading import Thread
from time import sleep
import os

app = Flask(__name__)
app.secret_key = 'super secret key'
@app.route('/')
def home():
        if not session.get('logged_in'):
                return render_template('login.html')
        else:
                return camera_view()



@app.route('/login', methods=['POST'])
def do_admin_login():
        if request.form['password'] == 'password' and request.form['username'] == 'admin':
                session['logged_in'] = True
                return camera_view()
        else:
                flash('wrong password!')
                return home()
@app.route("/logout")
def logout():
        session['logged_in'] = False
        return home()




def camera_view():
        return render_template('camera_view.html')

def gen(camera):
    camera_thread = Thread(target = count_people, args=[camera])
    camera_thread.start()
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

def count_people(camera):
    while True:
        camera.count_people()

    
@app.route('/video_feed')
def video_feed():
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
       

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
    