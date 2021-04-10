from fastapi import FastAPI, Form, UploadFile
from fastapi.responses import FileResponse
from videotools import getaudioclipcmd

from audio2numpy import open_audio
import pytube

app = FastAPI()

title = ""
video_state = ""
audio_dir = "audiofiles/"
recordings_dir ="recordings/"


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
    response.headers['title'] = title
    response.headers['length'] = str(video_length)
    return response
    

@app.post("/clipaudio")
def clipaudio(start: int = Form(...), end: int = Form(...)):
    print(start)
    print(end)
    getaudioclipcmd(start, end)
    return FileResponse('clipaudio.mp3')

def save_transcript(transcription, file_path):
    pass

def generate_unique_path():
    pass

def save_audio_file(path):
    pass


@app.post("/saveclip")
def saveaudio(audiofile: UploadFile = Form(...), transcription: str = Form(...)):
    
    # generate filepath
    # copy clipaudio with the new path
    # sace transcript filepath pair
    # 
    print(transcription)
    return {'a': 'ok'}