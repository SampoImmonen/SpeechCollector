import React, { Component } from 'react';

class TranscriptionForm extends Component {

    state = {
        text: ''
    }

    handleChange = (e) => {
        this.setState({text:e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
    }

    render() {
        return (
            <div>
                <form className="ui form">
                    <div className="field">
                        <label>Transcription</label>
                        <input type="text" 
                        placeholder="transcription" 
                        value={this.state.text}
                        onChange={this.handleChange}
                        />
                    </div>
                    <button className="ui basic button" onClick={this.handleSubmit}>Save</button>
                </form>
            </div>
        );
    }
}

export default TranscriptionForm;