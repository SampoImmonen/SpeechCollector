import React, { Component } from 'react';

import Chart from "react-google-charts";

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
                    <p>number of audiofiles from youtube:  {this.state.info.num_clips_youtube}</p>
                    <p>number of audiofiles from recordings:  {this.state.info.num_clips_records}</p>
                    <p>goal filled {this.state.goal.num_clips}/{this.state.info.num_clips_youtube+this.state.info.num_clips_records}</p>
                    <p>size of audio data from youtube: {(this.state.info.size_records+this.state.info.size_youtube)/10**6} Mb</p>
                    </div>
                    <div className="ui segment lifted">
                        <h3>Data distribution</h3>
                        <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Source', 'Clips'],
                                ['Youtube', this.state.info.num_clips_youtube],
                                ['Recordings', this.state.info.num_clips_records]
                            ]
                            }
                        />
                    </div>
                    <div className="ui segment lifted">
                        <h3>Goal</h3>
                        <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Segment', 'Clips'],
                                ['Gathered', this.state.info.num_clips_youtube+this.state.info.num_clips_records],
                                ['Todo', 4000-(this.state.info.num_clips_youtube+this.state.info.num_clips_records)]
                            ]
                            }
                            options={{
                                slices:{
                                    0: { color: 'black'},
                                    1: {color: 'white'}
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoApp;