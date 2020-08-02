import flask
from flask import request
from Chroma import songdist
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
import librosa
import librosa.display
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import tensorflow as tf
from tensorflow.keras import models
import os
import sys



cred = credentials.Certificate("/home/sidsrivastava/api/singingproject-8a562-firebase-adminsdk-kxf16-4f8d24982c.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'singingproject-8a562.appspot.com'
})
bucket = storage.bucket()

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    x = "2"
    if('song' in request.args and 'name1' in request.args and 'user' in request.args):
        song = request.args['song']
        name1 = request.args['name1']
        user = request.args['user']
        path1 = user+"/"+name1+".m4a"
        path2 = "Songs"+"/"+song+".m4a"
        print(path1)
        print(path2)
        blob = bucket.blob(path1)
        blob2 = bucket.blob(path2)
        blob.download_to_filename("1.m4a")
        blob2.download_to_filename("2.m4a")
        x, a = songdist.compare("1.m4a", "2.m4a")
        x = str(x)
        print(x)
    return x
@app.route('/ml', methods=['Get'])
def ml():
    print(sys.path)
    if('user' in request.args and 'file' in request.args):
        path = request.args['user']+"/"+request.args['file']+".m4a"
        blob = bucket.blob(path)
        blob.download_to_filename("ml.m4a")
        file_name = "ml.m4a"
        max_pad_len = 862
        audio, sample_rate = librosa.load(file_name, res_type='kaiser_fast', duration=20)
        mfccs = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=40)
        pad_width = max_pad_len - mfccs.shape[1]
        mfccs = np.pad(mfccs, pad_width=((0, 0), (0, pad_width)), mode='constant')
        mfccs = mfccs.reshape(1, 40, max_pad_len, 1)
        print(mfccs.shape)
        print("OS:", os.getcwd())
        model = tf.keras.models.load_model('/home/sidsrivastava/api/my_model')
        le = LabelEncoder()
        le.fit(["breathy", "neutral", "pressed", "flow"])
        predicted_vector = model.predict_classes(mfccs)
        predicted_class = le.inverse_transform(predicted_vector)
    else:
        return sys.path
    return predicted_class[0]

if __name__ == '__main__':
    app.run()
