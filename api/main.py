from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
import pytube

app = FastAPI()

title = ""
video_state = ""

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
    
