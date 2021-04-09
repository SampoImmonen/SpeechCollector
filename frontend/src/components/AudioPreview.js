import React, { Component } from 'react';

class AudioPreview extends Component {

    getComponent = () => {
        if (this.props.audio!==null){
            return (<audio src={URL.createObjectURL(this.props.audio)} controls></audio>)
        } else {
            return
        }
    }

    formatTime = (time) => { 
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = ~~time % 60;
    
        var ret = "";
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }


    render() {
        return (
            <div>
                <div className="ui segment">
                    <div>
                    <label className="ui label">Clip Preview</label>
                    </div>
                    <div>
                        {this.formatTime(this.props.start) + '  -  ' + this.formatTime(this.props.end)}
                    </div>
                    {this.getComponent()}
                </div>
            </div>
        );
    }
}

export default AudioPreview;