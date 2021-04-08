import React, { Component } from 'react';
import NavigationContainer from './components/NavigationContainer.js'
import './components/component.css'

class App extends Component {

  render() {
    return (
      <div className="ui centered containersitecontainer">
        <NavigationContainer/>
      </div>
    );
  }
}

export default App;
