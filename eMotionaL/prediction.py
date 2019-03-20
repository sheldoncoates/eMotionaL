from sklearn.preprocessing import LabelEncoder
import pandas as pd
import librosa
import librosa.display
import numpy as np
import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
import keras
import tensorflow as tf
from keras.models import load_model
from keras import backend as K
import os

# These suppress logs to help the console be more readable
tf.logging.set_verbosity(tf.logging.ERROR)
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

def predict(value):
    # data, sample = librosa.load('/Users/Jacob/Documents/PythonProjects/eMotionaL/backend/testdata/happy.wav')
    # plt.figure(figsize=(15, 5))
    # librosa.display.waveplot(data, sr=sample)
    # plt.show()

    df = pd.DataFrame(columns=['feature'])

    X, sample_rate = librosa.load('./testdata/'+value+'.wav', res_type='kaiser_fast', duration=3, sr=22050*2, offset=0.5)

    mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=13), axis=1)
    test = librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=13)
    df.loc[0] = [mfccs]

    testfeatures = pd.DataFrame(df['feature'].values.tolist())

    lb = LabelEncoder()
    lb.classes_ = np.load('./classes.npy')

    X_test = np.array(testfeatures)
    x_testcnn = np.expand_dims(X_test, axis=2)

    model = load_model('./saved_models/eMotionaL.h5')
    preds = model.predict(x_testcnn, batch_size=32, verbose=1)
    print("The predictions " + str(preds))

    actual = preds.argmax(axis=1)

    # abc needs to be inverse_transformed before we try to use it
    abc = actual.astype(int).flatten()
    returnValue = str(lb.inverse_transform(abc))
    K.clear_session() 
    return returnValue

def livepredict(value):
    df = pd.DataFrame(columns=['feature'])
    X, sample_rate = librosa.load(value, res_type='kaiser_fast', duration=3, sr=22050*2, offset=0.5)

    mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=13), axis=1)
    test = librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=13)
    df.loc[0] = [mfccs]

    testfeatures = pd.DataFrame(df['feature'].values.tolist())

    lb = LabelEncoder()
    lb.classes_ = np.load('./classes.npy')

    X_test = np.array(testfeatures)
    x_testcnn = np.expand_dims(X_test, axis=2)

    model = load_model('./saved_models/eMotionaL.h5')
    preds = model.predict(x_testcnn, batch_size=32, verbose=1)
    print("The predictions " + str(preds))

    actual = preds.argmax(axis=1)

    # abc needs to be inverse_transformed before we try to use it
    abc = actual.astype(int).flatten()
    returnValue = str(lb.inverse_transform(abc))
    K.clear_session() 
    return returnValue

if __name__ == "__main__":
    predict('angry')
