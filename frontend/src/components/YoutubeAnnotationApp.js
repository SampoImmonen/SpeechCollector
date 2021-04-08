import React, { Component } from 'react';
import YoutubeInputForm from './YoutubeInputForm'
import YoutubeTranscription from './YoutubeTranscription'

import axios from 'axios';

class YoutubeAnnotationApp extends Component {

    state = {
        name: '',
        video: null,
        video_length: null,
    }

    handleUrlSubmit = (url) => {
        let formdata = new FormData()
        formdata.append('url', url)
        axios.post('/videofromurl', formdata, {responseType:'blob', headers: {'content-type' : 'multipart/form-data'}})
        .then((response) => {
            if(response) {
                const blob = new Blob([response.data])
                let title = response.headers['title']
                let length = response.headers['length']
                console.log(length)
                this.setState({video : blob, name: title, video_length:length})
            }
        })
    }

    getComponent = () => {
        if (this.state.video===null){
            return( 
                <YoutubeInputForm handleSubmit={this.handleUrlSubmit}/>
            )
        } else {
            return <YoutubeTranscription video={this.state.video} title={this.state.name}/>
        }
    }

    render() {
        return (
            <div className="ui center aligned container">
                <h1 className="ui segment lifted">Youtube Transcription App</h1>
                <div className="ui center aligned container segment lifted">
                    {this.getComponent()}
                </div>
            </div>
        );
    }
}

export default YoutubeAnnotationApp;