import React, { Component } from 'react';

import Recorder from 'react-mp3-recorder'
import RecorderAudioPreview from './RecorderAudioPreview'
import ReadPrompt from './ReadPrompt'
import ReadingDataUploadForm from './ReadingDataUploadForm'

import axios from 'axios';

class RecordingApp extends Component {

    state = {
        audio: null,
        transcript: '',
        data: null,
        preview: false
    }

    _onRecordingComplete = (blob) => {
        var audio = new File([blob], 'audio.mp3')
        this.setState({audio: audio})
      }
     
    _onRecordingError = (err) => {
    console.log('recording error', err)
    }

    getComponent = () => {
        if (this.props.audio!==null){
            console.log("moi")
            return (<audio src={URL.createObjectURL(this.state.audio)} controls></audio>)
        } else {
            return <h4> No recording </h4>
        }
    }


    getData = () => {
        if (this.state.data!==null) {
            return this.state.data[0]
        }
        else {
            return ""
        }
    }

    changeTranscript = (value) => {
        this.setState({transcript:value})
    }

    getReadingComponent = () => {
        if (this.state.data !== null) {
            return <ReadPrompt transcript={this.state.transcript} handleChange={this.changeTranscript}/>
        }

        else {
            return <ReadingDataUploadForm handledataupload={this.handleDataUpload}/>
        }
    }

    handleDataUpload = (file) => {

        const formdata = new FormData()
        formdata.append('data', file)
        axios.post('/uploadfile', formdata, {headers: {'Content-type' : 'multipart-formdata'}})
        .then(response => {
            //console.log(response.data[0])
            this.setState({data: response.data, transcript: response.data[0]})
        }
        )
    }

    handlePreview = (e) => {
        if (e.target.name ==="submit"){
            this.setState({preview:true})
            return
        }
        if (e.target.name==='cancel'){
            this.setState({preview:false})
        }
    }

    updatedata = () => {
        if (this.state.data.length > 1) {
            return this.state.data.slice(1)
        }
        else {
            return null
        }
    }

    saveClip = () => {
        //send audio and transcript to server
        //receive confirmation
        // update state to null audio and next transcript from data
        const formdata = new FormData()
        formdata.append('transcript', this.state.transcript)
        formdata.append('audio', this.state.audio)
        axios.post("/saverecording", formdata, {headers: {'content-type':'multipart/form-data'}})
        .then(response => {
            if (response){
                var newdata = this.updatedata()
                var trans = null
                if (newdata!==null) {
                    trans = newdata[0]
                }
                this.setState({preview: false, data:newdata, transcript:trans, audio: null})
            }
        })
    }

    getPreview = () => {
        if (this.state.preview){
            return (
                <div>
                    <h3>Confirm to save the following clip</h3>
                    <div>
                    <RecorderAudioPreview audio={this.state.audio} transcript={this.state.transcript}/>
                        <div>
                        <button className="ui button green" onClick={this.saveClip}>Submit</button>
                        <button className="ui black basic button" name="cancel" onClick={this.handlePreview}>Cancel</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                <div className="ui center aligned container segment lifted">
                <h1>Record the sentence below</h1>
                <Recorder
                    onRecordingComplete={this._onRecordingComplete}
                    onRecordingError={this._onRecordingError}
                />
            </div>
            <div className="ui segment lifted">
                {this.getReadingComponent()}
            </div>
            <div>
                <button className="ui black button">Prev</button>
                <button className="ui black button">Next</button>
            </div>
            <RecorderAudioPreview audio={this.state.audio} transcript={this.state.transcript}/>
            <div>
            <button className="ui button green" name="submit" disabled={this.state.audio===null} onClick={this.handlePreview}>Submit</button>
            <button className="ui red button">Delete</button>
            </div>
            </div>            
            )
        }
    }
    render() {
        return (
            <div className="ui center aligned container">
                <h1 className="ui segment lifted">Recording App</h1>
                {this.getPreview()}
            </div>
        );
    }
}

export default RecordingApp;