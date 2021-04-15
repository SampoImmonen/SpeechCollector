import React, { Component } from 'react';

class RecorderAudioPreview extends Component {

    getComponent = () => {
        if (this.props.audio!==null){
            return (<audio src={URL.createObjectURL(this.props.audio)} controls></audio>)
        } else {
            return
        }
    }

    render() {
        return (
            <div>
                <div className="ui segment">
                    <div>
                    <label className="ui label">Clip Preview</label>
                    </div>
                    {this.getComponent()}
                    <div>
                        <label className="ui label">Transcript</label>
                    </div>
                    <div className="ui container">
                        <b>{this.props.transcript}</b>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecorderAudioPreview;