# -*- coding: utf-8 -*-
"""getDiagnose.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1Rj5Uniegi1LUfeDuvcDSK-_ybokbKFV4
"""
print("IN")
import io
print("IN io")
from PIL import Image
print("IN PIL")
import sys
print("IN SYS")
import tensorflow as tf
print("IN Tensor")
import cv2
import numpy as np
from tensorflow.keras.models import Model
from keras.layers import Activation, Dropout, Flatten, Dense
import requests 
import pickle
#print("IN 2")
def INCV3():

    #image_input = Input(shape=(224,224,3), name='ImageInput')
    base_model =tf.keras.applications.InceptionV3(
                include_top=True,
                weights=None,
                input_tensor=None,
                input_shape=(224,224,3),
                pooling='avg',
                classes=1000,
                classifier_activation="softmax",
               )

    

    x=base_model.output
    
    #x = Flatten()(x)
    x = Dense(512, activation='relu')(x)
    x = Dropout(0.5)(x)
    x = Dense(128, activation='relu')(x)
    x = Dropout(0.5)(x)
    x = Dense(2, activation='softmax')(x)
    model = Model(inputs = base_model.input, outputs = x)


    return model

model = INCV3()
model.load_weights('./bestmodelinception.h5')
response = requests.get(sys.argv[1])
#print("im in python now")
img = np.array(Image.open(io.BytesIO(response.content))) / 255
#print("IMG" , img.shape)


#img1 = cv2.imread("22.png")/255 
#print("IMG1" , img1.shape)
img_modify_size = cv2.resize(img,(224,224))
img_modify_shape = img_modify_size.reshape(1,224,224,3)
result = model(img_modify_shape)
#print(result)

a = result[0][0].numpy()
b = result[0][1].numpy()
if a>b:
  #print(a * 100,"Covid")
  print("Your Result is: %.2f" % round(a * 100, 2) + "%","Covid")
  #print("%.2f" % round(b * 100, 2) + "%","Normal")
else:
  print("Your Result is: %.2f" % round(b * 100, 2) + "%","Normal")
  #print("%.2f" % round(a * 100, 2) + "%","Covid")
