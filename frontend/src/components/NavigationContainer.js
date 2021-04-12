import React, { Component } from 'react';
import YoutubeAnnotationApp from './YoutubeAnnotationApp'
import InfoApp from './InfoApp'
import RecordingApp from './RecordingApp'
import './component.css'

class NavigationContainer extends Component {

    state = {
        app: 'youtube'
    }
    
    getApp = () => {
        if (this.state.app === 'youtube'){
            return <YoutubeAnnotationApp />
        }
        if (this.state.app === 'info') {
            return <InfoApp/>
        }
        if (this.state.app === 'recorder') {
            return <RecordingApp />
        }
    }

    handleChangeApp = (e) => {
        this.setState({app:e.target.name})
    }

    render() {
        return (
            <div className="ui grid">
                <div className="two wide column">
                    <div className="ui vertical menu">
                        <a className="item" name="youtube" onClick={this.handleChangeApp}>YoutubeApp</a>
                        <a className="item" name="recorder" onClick={this.handleChangeApp}>RecordingApp</a>
                        <a className="item" name="info" onClick={this.handleChangeApp}>InfoApp</a>
                    </div>
                </div>
                <div className="ten wide centered stretched column ">
                    <div className="ui segment appcontainer">
                    {this.getApp()}
                    </div>
                </div>
            </div>
        );
    }
}

export default NavigationContainer;