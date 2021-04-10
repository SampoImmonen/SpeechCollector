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
        this.props.handleSubmit(this.state.text)
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
                    <button className="ui basic black button" 
                    onClick={this.handleSubmit}
                    disabled={!this.props.isaudioclip}
                    >Add transcription</button>
                </form>
            </div>
        );
    }
}

export default TranscriptionForm;