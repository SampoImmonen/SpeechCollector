import React, { Component } from 'react';
import axios from 'axios';

class InfoApp extends Component {

    state = {
        info: '',
        goal: {num_clips: 4000}
    }

    componentDidMount = () => {
        axios.get('getinfo')
        .then(response => this.setState({info:response.data}))
    }

    render() {
        return (
            <div className="ui center aligned container">
                <h1 className="ui segment lifted">Information App</h1>
                <div className="ui center aligned container segment lifted">
                    <div className="ui segment lifted">
                    <h3>Simple stats</h3>
                    <p>number of audiofiles from youtube:  {this.state.info.num_clips}</p>
                    <p>goal filled {this.state.goal.num_clips}/{this.state.info.num_clips}</p>
                    <p>size of audio data from youtube: {this.state.info.size/10**6} Mb</p>
                    </div>
                    <div className="ui segment lifted">
                        <h3>Data distribution</h3>
                        <p>Pie chart here</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoApp;