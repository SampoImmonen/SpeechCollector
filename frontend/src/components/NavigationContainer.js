import React, { Component } from 'react';
import YoutubeAnnotationApp from './YoutubeAnnotationApp'
import './component.css'

class NavigationContainer extends Component {

    state = {
        app: 'youtube'
    }

    render() {
        return (
            <div className="ui grid">
                <div className="two wide column">
                    <div className="ui vertical menu">
                        <a className="item active black">YoutubeApp</a>
                        <a className="item">RecordingApp</a>
                        <a className="item">InfoApp</a>
                    </div>
                </div>
                <div className="ten wide centered stretched column ">
                    <div className="ui segment appcontainer">
                    <YoutubeAnnotationApp />
                    </div>
                </div>
            </div>
        );
    }
}

export default NavigationContainer;