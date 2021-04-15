import React, { Component } from 'react';

class ReadPrompt extends Component {

    state = {
        edit: false
    }

    toggleEdit = (e) => {
        console.log(e.target.name)
        if (e.target.name === 'open'){
            this.setState({edit:true})
        }
        if (e.target.name === 'close') {
            this.setState({edit:false})
        }
    }

    handleChange = (e) => {
        this.props.handleChange(e.target.value)
    }

    getEdit = () => {
        if (this.state.edit) {
            return (
                <div>
                    <div className="ui form">
                        <input className="ui input" type="text" value={this.props.transcript} onChange={this.handleChange}/>
                    </div>
                    <button className="ui black basic button" name="close" onClick={this.toggleEdit}>close</button>
                </div>
            )
        } else {
            return <button className="ui green basic button" name="open" onClick={this.toggleEdit}>Edit</button>
        }
    }

    render() {
        return (
            <div>
                <label className="ui label">Read this sentence</label>
                <h3>{this.props.transcript}</h3>
                <div>
                    {this.getEdit()}
                </div>
            </div>
        );
    }
}

export default ReadPrompt;