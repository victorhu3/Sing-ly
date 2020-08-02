#!/usr/bin/env python
# coding: utf-8

# In[63]:


import numpy, scipy, matplotlib.pyplot as plt, math
import librosa, librosa.display


# In[64]:
class songdist:
    def compare(f1, f2):
        x, sr = librosa.load(f1)
        fmin = librosa.midi_to_hz(36)
        x2, sr2 = librosa.load(f2)
        fmin2 = librosa.midi_to_hz(36)
        hop_length = 512
        chromagram = librosa.feature.chroma_cens(x, sr=sr, hop_length=hop_length)
        #plt.figure(figsize=(15, 5))
        #librosa.display.specshow(chromagram, x_axis='time', y_axis='chroma', hop_length=hop_length, cmap='coolwarm')
        chromagram2 = librosa.feature.chroma_cens(x2, sr=sr2, hop_length=hop_length)
        #plt.figure(figsize=(15, 5))
        #librosa.display.specshow(chromagram2, x_axis='time', y_axis='chroma', hop_length=hop_length, cmap='coolwarm')
        avg_vec = []
        sum = 0
        for i in chromagram:
            for x in i:
                sum+=x
            sum/=len(chromagram[0])
            avg_vec.append(sum)
            sum = 0
        #print(avg_vec)
        avg_vec2 = []
        sum = 0
        for i in chromagram2:
            for x in i:
                sum+=x
            sum/=len(chromagram2[0])
            avg_vec2.append(sum)
            sum = 0
        #print(avg_vec2)
        avg_vec = numpy.array(avg_vec)
        avg_vec2 = numpy.array(avg_vec2)
        cX = numpy.concatenate((avg_vec,avg_vec2))
        avg = numpy.histogram(avg_vec,bins=10,range=(min(cX),max(cX)), density=True)[0]
        avg2 = numpy.histogram(avg_vec2,bins=10,range=(min(cX),max(cX)), density=True)[0]
        print(avg)
        print(avg2)

        coeff = 0
        for i in range(10):
            p1 = avg[i]
            p2 = avg2[i]
            coeff += math.sqrt(p1*p2) * (max(cX)-min(cX))/10
        coeff = -1*math.log(coeff)
        print(coeff)
        return ((2-coeff)*50), coeff







# In[66]:



"""
C = librosa.cqt(x, sr=sr, fmin=fmin, n_bins=72, hop_length=hop_length)
C2 = librosa.cqt(x2, sr=sr2, fmin=fmin2, n_bins=72, hop_length=hop_length)
"""

# In[67]:

"""
logC = librosa.amplitude_to_db(numpy.abs(C))
plt.figure(figsize=(15, 5))
librosa.display.specshow(logC, sr=sr, x_axis='time', y_axis='cqt_note', fmin=fmin, cmap='coolwarm')
logC2 = librosa.amplitude_to_db(numpy.abs(C2))
plt.figure(figsize=(15, 5))
librosa.display.specshow(logC2, sr=sr2, x_axis='time', y_axis='cqt_note', fmin=fmin2, cmap='coolwarm')
"""

# In[68]:




# In[ ]:
