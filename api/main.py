from fastapi import FastAPI, Form, UploadFile
from fastapi.responses import FileResponse

from videotools import getaudioclipcmd
from infotools import get_amount_of_data, get_number_of_files 

from audio2numpy import open_audio
import pytube
import os
import uuid
import shutil
import io
from pydub import AudioSegment
from pydub.playback import play

app = FastAPI()

title = ""
video_state = ""
youtube_dir = "youtubefiles/"
recordings_dir = "recordings/"
 


@app.get("/test")
async def root():
    return {"message": "Hello World"}


@app.post("/videofromurl")
def fromyoutube(url: str = Form(...)):
    
    global title
    global video_state

    yt = pytube.YouTube(url)
    video_length = yt.length
    video = yt.streams.first()
    video_state = 'video.mp4'
    if title!=video.title:
        print("downloading")
        video.download(filename="video")
    
    title = video.title
    response = FileResponse('video.mp4')
    print("täällä")
    try:
        response.headers['title'] = str(title)
    except:
        response.headers['title'] = "???"
    response.headers['length'] = str(video_length)
    return response
    

@app.post("/clipaudio")
def clipaudio(start: float = Form(...), end: float = Form(...)):
    print(start)
    print(end)
    getaudioclipcmd(start, end)
    return FileResponse('clipaudio.mp3')

def save_transcript(transcription, file_path):
    with open(file_path, 'w',encoding="utf-8") as f:
        f.write(transcription)
    return


def generate_unique_path(mode):

    exist = True
    while exist:
        filename = str(uuid.uuid4())
        filepath = filename+'.mp3'
        path = os.path.join(mode, "audio", filepath)
        exist = os.path.exists(path)
    return path, filename


def save_audio_file(path):
    shutil.copy("clipaudio.mp3", path)
    return


@app.post("/saveclip")
def saveaudio(audiofile: UploadFile = Form(...), transcription: str = Form(...)):
    
    # generate filepath
    # copy clipaudio with the new path
    # sace transcript filepath pair
    # 

    audiopath, filename = generate_unique_path("youtube")
    save_audio_file(audiopath)

    transcript_path = os.path.join("youtube", "transcripts", filename+'.txt')
    save_transcript(transcription, transcript_path)
    return {'audiopath': audiopath, 'transcript_path': transcript_path}

@app.get("/getinfo")
def getinfo():
    #get information about how much audio you have
    # how many clips from youtube
    # how many gigabytes 
    # same for own transcripts
    num_files_youtube = get_number_of_files('youtube/audio')
    size_youtube = get_amount_of_data('youtube/audio')
    num_files_records = get_number_of_files('recordings/audio')
    size_records = get_amount_of_data('recordings/audio')

    return {'num_clips_youtube': num_files_youtube, 'size_youtube':size_youtube, 'num_clips_records':num_files_records, 'size_records': size_records}


import json

@app.post('/uploadfile')
def uploadfile(data: UploadFile = Form(...)):
    data.file.seek(0)
    contents = data.file.read()
    sentences = contents.decode('utf-8').splitlines()
    return sentences


@app.post('/saverecording')
def saverecording(transcript: str = Form(...), audio: UploadFile = Form(...)):
    clip = AudioSegment.from_file(io.BytesIO(audio.file.read()), format="mp3")
    
    audiopath, filename = generate_unique_path("recordings")
    clip.export(audiopath, format="mp3")
    transcript_path = os.path.join("recordings", "transcripts", filename+'.txt')
    save_transcript(transcript, transcript_path)

    return {'a', 'ok'}