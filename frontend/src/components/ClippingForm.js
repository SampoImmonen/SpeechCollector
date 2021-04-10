import React, { Component } from 'react';
import Slider from '@material-ui/core/Slider';

class ClippingForm extends Component {

    state = {
        value : [0, 1]
    }

    handleChange = (event, newValue) => {
        this.setState({value : newValue})
    }
    
    handleBoxChange = (e) => {
        if (e.target.name === 'min') {

            let list = [e.target.value, this.state.value[1]]
            this.setState({value:list})
        }
        if (e.target.name === 'max') {
            let list = [this.state.value[0], e.target.value]
            this.setState({value: list})
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

    handleSubmit = (e) => {
        e.preventDefault()
        //var newValues = [this.state.value[1], this.state.value[1]+10]
        this.props.handleSubmit(this.state.value)
        //this.setState({value:newValues})
    }



    render() {
        return (
            <div className="ui segment">
                <label className="ui label">Time Interval</label>
                <div>
                    <p>{this.formatTime(this.state.value[0]) + '  -  ' + this.formatTime(this.state.value[1]) }</p>
                </div>
                <Slider
                value={this.state.value}
                onChange={this.handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={parseInt(this.props.vidlength)}
                />
                
                <div className="ui input">
                    <input type="text" value={this.state.value[0]} name="min" onChange={this.handleBoxChange}/>
                    <input type="text" value={this.state.value[1]} name="max" onChange={this.handleBoxChange}/>
                </div>
                
                <div className="ui segment">
                <button className="ui basic black button" onClick={this.handleSubmit}>Clip Audio</button>
                </div>
            </div>
        );
    }
}

export default ClippingForm;