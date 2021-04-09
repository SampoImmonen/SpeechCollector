import React, { Component } from 'react';
import VideoPreview from './VideoPreview'
import ClippingForm from './ClippingForm'
import AudioPreview from './AudioPreview.js'
import TranscriptionForm from './TranscriptionForm'
import axios from 'axios';

class YoutubeTranscription extends Component {

    state = {
        clipaudio : null,
        start: 0,
        end: 0
    }

    handleClipSubmit = (values) => {
        var formdata = new FormData()

        //Add validation ie if val1 smaller than val2
        formdata.append('start', values[0])
        formdata.append('end', values[1])
        axios.post('clipaudio', formdata, {responseType:'blob', headers: {'content-type':'multipart/form-data'}})
        .then((response) => {
            if(response){
                const blob = new Blob([response.data])
                this.setState({clipaudio:blob, start:values[0], end:values[1]})
            }
        })
    }

    render() {
        return (
            <div>
                <VideoPreview video={this.props.video} title={this.props.title}/>
                <ClippingForm vidlength={this.props.vidlength} handleSubmit={this.handleClipSubmit}/>
                <AudioPreview audio={this.state.clipaudio} start={this.state.start} end={this.state.end}/>
                <TranscriptionForm />
            </div>
        );
    }
}

export default YoutubeTranscription;