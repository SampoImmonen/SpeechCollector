import React, { Component } from 'react';
import ClippingForm from './ClippingForm'
import AudioPreview from './AudioPreview.js'
import TranscriptionForm from './TranscriptionForm'
import axios from 'axios';

class YoutubeTranscription extends Component {

    state = {
        clipaudio : null,
        start: 0,
        end: 0,
        transcription: '',
        previewmode: false,
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

    handleTranscriptSubmit = (trans) => {
        this.setState({transcription: trans})
    }

    validateTranscript = () => {
        // improve later
        if (this.state.clipaudio!==null){
            if (this.state.transcription.length > 0) {
                return true
            }
        }
        return false
    }

    openValidation = (e) => {
        e.preventDefault()
        this.setState({previewmode: true})
    }

    isAudioClip = () => {
        if (this.state.clipaudio!==null){
            return true
        }
        return false
    }

    handleDelete = () => {
        this.props.handleDelete()
    }

    handleSaveClip = (e) => {
        e.preventDefault()
        let formdata = new FormData()
        let file = new File([this.state.clipaudio], "audio.mp3")
        formdata.append("transcription", this.state.transcription)
        formdata.append("audiofile", file)

        axios.post('/saveclip', formdata ,{headers: {'content-type':'multipart/form-data'}})
        .then((response) => {
            if (response){
                console.log(response)
            }
        })
    }

    cancelClip = () => {
        this.setState({previewmode:false})
    }

    render() {

        if (this.state.previewmode){
            return(
            <div>
                <div className="ui segment">
                <h1>Confirm to save the following clip</h1>
                </div>
                <AudioPreview 
                audio={this.state.clipaudio} 
                start={this.state.start} 
                end={this.state.end}
                transcription={this.state.transcription}
                />
                <div className="inline">
                <div className="ui green button" onClick={this.handleSaveClip}>save clip</div>
                <div className="ui basic black button" onClick={this.cancelClip}>Cancel</div>
                </div>
            </div>
            )

        } else {
            return (
                <div>
                    <ClippingForm vidlength={this.props.vidlength} handleSubmit={this.handleClipSubmit}/>
                    <AudioPreview 
                    audio={this.state.clipaudio} 
                    start={this.state.start} 
                    end={this.state.end}
                    transcription={this.state.transcription}
                    />
                    <TranscriptionForm
                    isaudioclip={this.isAudioClip()}
                    handleSubmit={this.handleTranscriptSubmit}
                    />
                    <div className="ui segment">
                        <button className="ui green button" onClick={this.openValidation} disabled={!this.validateTranscript()}>Submit Transcription</button>
                        <button className="ui red button" onClick={this.handleDelete}> Delete</button>
                    </div>
                </div>
            );
        }
    }
}

export default YoutubeTranscription;