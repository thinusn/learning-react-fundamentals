import React from 'react';
import ReactDOM from 'react-dom';
/**
 * Refs
 * A way to reference an instance of a react component in our application. Thus when adding multiple widgets to a page
 * they should all display and update their own `txt` value and not the composite components `txt` value.
 * Thus all the Widgets on the page will consume and update tier own different txt values.
 */
class App extends React.Component {
    //To initialise values
    constructor() {
        super();//Sets the `this` context for the component
        this.state = {
            red: 0,
            green: 0,
            blue: 0
        };
        this.update = this.update.bind(this);
    }

    /**
     * We could create updateRed, updateBlue, updateGreen methods thus they all have their own state but we want them
     * to all be party of the same state and updated via the update method
     */
    update(event) {
        //passing the value of the state you are concerned about.
        this.setState({
            /** The `ReactDOM.findDOMNode(this.refs.red).value` will only work if the Component returns a single value
             * Thus if our slider was wrapped in a div `ReactDOM.findDOMNode(this.refs.red).value` would fail as
             * `this.refs` would then reference the parent i.e. the div.
             * To solve this problem you can give the child input its own ref tag and then via dot notation you gain
             * access to the values. e.g
             * <code>
             *     // Here the `div` will be `this.refs.red` to get to the input you need to use this.refs.red.myInput
             *     class Slider extends React.Component {
             *          render() {
             *               return (<div><input ref="myInput" type="range" min="0" max="255" onChange={this.props.update}/></div>)
             *           };
             *       }
             * </code>
             **/
            red: ReactDOM.findDOMNode(this.refs.red).value,
            green:  ReactDOM.findDOMNode(this.refs.green).value,
            blue:  ReactDOM.findDOMNode(this.refs.blue).value
        });
    }

    render() {
        //The ref tags allows you to indicate what state nit needs to be updated
        return (<div>
                <h1> Slide for RGB values </h1>
                <h2>Red</h2>
                <Slider ref='red' update={this.update}/> <span> - {this.state.red} </span>
                <br />
                <h2>Green</h2>
                <Slider ref='green' update={this.update}/><span> - {this.state.green} </span>
                <br />
                <h2>Blue</h2>
                <Slider ref='blue' update={this.update}/><span> - {this.state.blue} </span>
                <br />
            </div>
        )
    }
}
// Refs do not work with stateless function components, so you cant use a ref with Widget
const Widget = (props) => {
    "use strict";
    return (<div>
            <input type="text"
                   onChange={props.update}
            />
            <h1>{props.txt}</h1>
        </div>
    )
};

class Slider extends React.Component {
    render() {
        return (<input type="range" min="0" max="255" onChange={this.props.update}/>)
    };
}


export default App