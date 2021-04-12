from fastapi import FastAPI, Form, UploadFile
from fastapi.responses import FileResponse

from videotools import getaudioclipcmd
from infotools import get_amount_of_data, get_number_of_files 

from audio2numpy import open_audio
import pytube
import os
import uuid
import shutil


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
    response.headers['title'] = str(title)
    response.headers['length'] = str(video_length)
    return response
    

@app.post("/clipaudio")
def clipaudio(start: int = Form(...), end: int = Form(...)):
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
    num_files = get_number_of_files('youtube/audio')
    size = get_amount_of_data('youtube/audio')

    return {'num_clips': num_files, 'size':size}