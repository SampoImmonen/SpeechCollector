import React, { Component } from 'react';

import Recorder from 'react-mp3-recorder'
import RecorderAudioPreview from './RecorderAudioPreview'

class RecordingApp extends Component {

    state = {
        audio: null,
        transcript: '',
        data: null,
    }

    _onRecordingComplete = (blob) => {
        this.setState({audio: blob})
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


    render() {
        return (
            <div className="ui center aligned container">
                <h1 className="ui segment lifted">Recording App</h1>
                <div className="ui center aligned container segment lifted">
                    <h1>Record the sentence below</h1>
                    <Recorder
                        onRecordingComplete={this._onRecordingComplete}
                        onRecordingError={this._onRecordingError}
                    />
                </div>
                <div className="ui segment lifted">
                    <h4>Read from here</h4>
                </div>
                    <RecorderAudioPreview audio={this.state.audio} transcript={this.state.transcript}/>
            </div>
        );
    }
}

export default RecordingApp;