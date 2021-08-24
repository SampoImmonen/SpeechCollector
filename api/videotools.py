import moviepy.editor as mp
from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip
import subprocess

def getaudioclip(start: int, end: int):
    ffmpeg_extract_subclip("video.mp4", start, end, targetname="video_clip.mp4")
    clip = mp.AudioFileClip('video_clip.mp4')
    clip.write_audiofile("clipaudio.mp3")
    return True

def getaudioclipcmd(start: int, end: int):
    subprocess.call(f"ffmpeg -y -ss {start} -i video.mp4 -to {end-start} -loglevel quiet -c copy output.mp4")
    subprocess.call("ffmpeg -y -i output.mp4 -q:a 0 -map a -loglevel quiet clipaudio.mp3")
    return True