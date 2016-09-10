import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

    render() {
        return (<div>
                <Button>React <Icon/> Button</Button>
            </div>
        )
    }
}

class Button extends React.Component {
    //This allows you to access `heart` inside App
    render() {
        return <button>{this.props.children}</button>
    }
}

const Icon = () => {
    "use strict";
    return <span>❤</span>
}

export default App