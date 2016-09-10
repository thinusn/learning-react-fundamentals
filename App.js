import React from 'react';
import ReactDOM from 'react-dom';
/**
 * Owner Ownee relationships.
 * When one component renders another component. The parent component is also called the composite component
 */

/**
 * Here we add multiple widgets to a page where they all display and update the composite components `txt` value via
 * the composite components `update` method. Thus all the Widgets on the page will consume and update the Apps txt values
 */

 class App extends React.Component {
    //To initialise values
    constructor() {
        super();//Sets the `this` context for the component
        this.state = {txt: ''};
        this.update = this.update.bind(this);
    }

    //The updates method is used to manage/change the state
    update(event) {
        //passing the value of the state you are concerned about.
        this.setState({txt: event.target.value});
    }

    render() {
        //Creating a widget using ESX syntax
        return (<div>
                    <Widget txt={this.state.txt} update={this.update}/>
                    <Widget txt={this.state.txt} update={this.update}/>
                    <Widget txt={this.state.txt} update={this.update}/>
                    <Widget txt={this.state.txt} update={this.update}/>
                </div>
        )
    }
}

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


export default App