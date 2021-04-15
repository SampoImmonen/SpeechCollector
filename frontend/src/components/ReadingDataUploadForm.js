import React, { Component } from 'react';

class ReadingDataUploadForm extends Component {

    state = {
        file : null
    }

    handleFileUpload = (e) => {
        this.setState({file: e.target.files[0]})
    }

    handleUpload = (e) => {
        e.preventDefault()
        this.props.handledataupload(this.state.file)
    }

    render() {
        return (
            <div className="ui placeholder segment">
                <div className="ui icon header">
                    <i className="file outline icon"></i>
                    Upload a list of sentences
                </div>
                <input className="ui yellow button basic" type="file" onChange={this.handleFileUpload}/>
                <button className="ui black button" onClick={this.handleUpload}>Upload</button>
            </div>
        );
    }
}

export default ReadingDataUploadForm;