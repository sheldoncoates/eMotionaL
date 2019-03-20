import os
import pandas as pd
import librosa
import librosa.display
import numpy as np
import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
import tensorflow as tf
import keras
from keras.preprocessing import sequence
from keras.models import Sequential
from keras.layers import Dense, Embedding
from keras.preprocessing.sequence import pad_sequences
from keras.utils import to_categorical
from keras.layers import Input, Flatten, Dropout, Activation
from keras.layers import Conv1D, MaxPooling1D, AveragePooling1D
from keras.models import Model


# Retrieve all input data and load into list
mylist = os.listdir('/Users/Jacob/Desktop/Capstone/OrganizedSpeechData/All')

# Initialize each input data with it's associated label (filename is labelled)
feeling_list = []
for item in mylist:
    if "happy" in item:
        feeling_list.append("happy")
    elif "sad" in item:
        feeling_list.append("sad")
    elif "neutral" in item:
        feeling_list.append("neutral")
    elif "angry" in item:
        feeling_list.append("angry")

# Converts list to table
labels = pd.DataFrame(feeling_list)

i = 1;
df = pd.DataFrame(columns=['feature'])
bookmark=0

print("Getting MFCC's")

for index,y in enumerate(mylist):
    if (y == '.DS_Store'):
        print("DS_Store thing")

    else:
        X, sample_rate = librosa.load('/Users/Jacob/Desktop/Capstone/OrganizedSpeechData/All/'+y, res_type='kaiser_fast',duration=3,sr=22050*2,offset=0.5)
        mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=13), axis=1)

        df.loc[bookmark] = [mfccs]
        bookmark=bookmark+1


print("Done getting MFCC's")
df3 = pd.DataFrame(df['feature'].values.tolist())

#Combine MFCC chart and labels with their associated MFCCs
newdf = pd.concat([df3,labels], axis=1)

#Shuffling the data to remove bias
from sklearn.utils import shuffle
rnewdf = shuffle(newdf)

#Replacing NaN values with 0
rnewdf = rnewdf.fillna(0)
newdf1 = np.random.rand(len(rnewdf)) < 0.8

train = rnewdf[newdf1]
test = rnewdf[~newdf1]

trainfeatures = train.iloc[:, :-1]
#2073, 216
trainlabel = train.iloc[:, -1:]
#2073,1
testfeatures = test.iloc[:, :-1]
#495, 216
testlabel = test.iloc[:, -1:]
#495, 1

from keras.utils import np_utils
from sklearn.preprocessing import LabelEncoder

X_train = np.array(trainfeatures)
y_train = np.array(trainlabel)
X_test = np.array(testfeatures)
y_test = np.array(testlabel)

lb = LabelEncoder()

#this error is meaningless
y_train = np_utils.to_categorical(lb.fit_transform(y_train))
y_test = np_utils.to_categorical(lb.fit_transform(y_test))

print('Pad sequences')
x_traincnn =np.expand_dims(X_train, axis=2)
x_testcnn= np.expand_dims(X_test, axis=2)


model = Sequential()
model.add(Conv1D(128, 5,padding='same',input_shape=(13,1)))
model.add(Activation('relu'))
model.add(Conv1D(128, 5,padding='same'))
model.add(Activation('relu'))
model.add(Dropout(0.1))
model.add(MaxPooling1D(pool_size=(8)))
model.add(Conv1D(128, 5,padding='same',))
model.add(Activation('relu'))
model.add(Conv1D(128, 5,padding='same',))
model.add(Activation('relu'))
model.add(Conv1D(128, 5,padding='same',))
model.add(Activation('relu'))
model.add(Dropout(0.2))
model.add(Conv1D(128, 5,padding='same',))
model.add(Activation('relu'))
model.add(Flatten())
model.add(Dense(4))
model.add(Activation('softmax'))
opt = keras.optimizers.rmsprop(lr=0.00001, decay=1e-6)

model.compile(loss='categorical_crossentropy', optimizer=opt,metrics=['accuracy'])

print (x_traincnn.shape)
print (y_test.shape)
#(2023, 216, 1)
#(495, 3)

cnnhistory=model.fit(x_traincnn, y_train, batch_size=32, epochs=750, validation_data=(x_testcnn, y_test))

#sigmoid
plt.plot(cnnhistory.history['acc'])
plt.plot(cnnhistory.history['val_acc'])
plt.title('model accuracy')
plt.ylabel('accuracy')
plt.xlabel('epoch')
plt.legend(['train', 'test'], loc='upper left')
plt.show()


model_name = 'eMotionaL.h5'
save_dir = os.path.join(os.getcwd(), 'saved_models')

# Save model and weights
if not os.path.isdir(save_dir):
    os.makedirs(save_dir)
model_path = os.path.join(save_dir, model_name)
model.save(model_path)
print("")
print('Saved trained model at %s ' % model_path)
print("")