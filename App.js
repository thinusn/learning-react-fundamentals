import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            val: 0
        };
        this.update = this.update.bind(this)
    }

    update() {
        this.setState({
            val: this.state.val + 1
        });
    }

    // Component is fully prepped and guaranteed to make it to the dom
    componentWillMount() {
        //This is called when you add the component to the dom.
        console.log('mounting');
    }

    render() {
        //This is called for each update/change to the component. In this case every time
        console.log('rendering');
        return (<div>
            <button onClick={this.update}> {this.state.val}</button>
        </div>)
    }

    // After component has been added to dom
    componentDidMount() {
        console.log('mounted');
    }

    // Called before removal of component
    componentWillUnmount() {
        console.log('unmounted');
    }
}


class Wrapper extends React.Component {
    constructor() {
        super();//sets this context
    }

    //Renders app to the Dom
    mount() {
        ReactDOM.render(<App />, document.getElementById('a'))
    }

    //Removes from the dom
    unmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('a'))
    }

    render() {
        return (
            <div>
                <button onClick={this.mount.bind(this)}>Mount</button>
                <button onClick={this.unmount.bind(this)}>Unmount</button>
                <div id="a"></div>
            </div>
        )
    }
}

export default Wrapper