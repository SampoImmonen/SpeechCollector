import React, { Component } from 'react';

class VideoPreview extends Component {
    render() {
        return (
            <div className="ui container">
                <h1>{this.props.title}</h1>
                    <video src={URL.createObjectURL(this.props.video)} 
                    width="100%" 
                    height="100%" 
                    controls>
                    </video>   
            </div>
        );
    }
}

export default VideoPreview;