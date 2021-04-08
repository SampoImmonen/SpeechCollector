import React, { Component } from 'react';
import VideoPreview from './VideoPreview'
import ClippingForm from './ClippingForm'

class YoutubeTranscription extends Component {

    state = {
        clipaudio : null
    }

    render() {
        return (
            <div>
                <VideoPreview video={this.props.video} title={this.props.title}/>
                <ClippingForm />
            </div>
        );
    }
}

export default YoutubeTranscription;