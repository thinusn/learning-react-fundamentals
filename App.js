import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Rendering directly from the App.js
 **/
class App extends React.Component {
    /** Can access's props by enclosing with {} braces and use the name defined in the `ReactDOM.render(` prop
     *  e.g. `<App theName="this is the text for this prop"/>,` is aceessed by  `{this.props.theName}`
     * @returns {XML}
     */
    render() {
        let text = this.props.theName;
        return <h1> {text} - {this.props.myVar}</h1>
    }
}

/**
 * Properties
 *
 * Used to pass values to your components. This is like passing/setting a value in normal js/html
 */
//Property types App is expecting
App.propTypes = {
    //Here way say `theName` is a {string}
    theName: React.PropTypes.string,
    myVar: React.PropTypes.number.isRequired
};

App.defaultProps = {
    //Here way say `theName` should default to the following 
    theName: "I am a default string"
};
// Adding a property to App
ReactDOM.render(
    <App
        myVar={5}
        theName="this is the text for this prop"
    
    />,
    document.getElementById('app')
);


export default App