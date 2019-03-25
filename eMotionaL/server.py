#!flask/bin/python
from flask import Flask
from flask import render_template

from sklearn.preprocessing import LabelEncoder
import pandas as pd
import librosa
import librosa.display
import numpy as np
import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
import keras
from keras.models import load_model
import os
import tensorflow as tf
import prediction as prediction
from flask import Flask, url_for, render_template, request, Response
from flask_static_compress import FlaskStaticCompress
from flask_cors import CORS
import logging
tf.logging.set_verbosity(tf.logging.ERROR)
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
app = Flask(__name__)
CORS(app)

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods = ['GET'])
def predict():
    # 0 is angry, 1 is happy, 2 is neutral, 3 is sad 
    print("eMotionaL has received an emotion request.")
    emotion = request.args.get('emotion')
    return prediction.predict(emotion)

@app.route('/predict', methods = ['POST'])
def livePredict():
    # 0 is angry, 1 is happy, 2 is neutral, 3 is sad 
    print("eMotionaL has received an emotion request.")
    file = request.files['audio_file']
    path = "filestorage/" + request.form['name'] + ".wav"
    f = open(path,"xb")
    f.write(file.read())
    return prediction.livepredict(path)
 

if __name__ == '__main__':
    app.run(debug=True)