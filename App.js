import React from 'react';
import ReactDOM from 'react-dom';
/**
 * STATES
 * Collection of values that is managed by the component itself
 */
class App extends React.Component {
    //To initialise values
    constructor() {
        super();//Sets the `this` context for the component
        this.state = {txt: 'this is the state txt'}
    }

    //The updates method is used to manage/change the state
    update(event) {
        //passing the value of the state you are concerned about.
        this.setState({txt: event.target.value});
    }

    render() {
        //Accessing states are similar to accessing props
        return (<div>
                <input type="text"
                       onChange={this.update.bind(this)}
                />
                <h1>{this.state.txt}</h1>
            </div>
        )
    }
}


export default App