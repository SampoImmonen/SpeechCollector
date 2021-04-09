import React, { Component } from 'react';
import LoadingIndicator from './LoadingIndicator'

class YoutubeInputForm extends Component {

    state = {
        url: ''
    }

    handleChange = (e) => {
        this.setState({url: e.target.value})
    }

    validateUrl = () => {
        return true
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.validateUrl()){
            this.props.handleSubmit(this.state.url)
        } else {
            console.log("url not legit")
        }
    }


    render() {
        return (
            <div>
                <form className="ui form">
                    <h1>Upload Youtube Url</h1>
                    <LoadingIndicator/>
                    <div className="field">
                        <label>Youtube Url</label>
                        <input type="text" 
                        name="url" 
                        placeholder="url" 
                        onChange={this.handleChange} 
                        value={this.state.url}/>
                    </div>
                    <button className="ui basic green button" onClick={this.handleSubmit}>Get Audio</button>
                </form>
            </div>
        );
    }
}

export default YoutubeInputForm;