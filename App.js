import React from 'react';

/**
 * Stateful class component, this can have state(s)
 */
class App extends React.Component{
    /**
     * Expected to return other methods or components
     * In this method JSX is returned . JSX is an HTML like syntax that gets converted to JS
     * e.g. <h1>Hello world</h1> will get passed to `React.createElement('h1', null, 'Hello world')`
     *
     * @returns {XML}
     */
    render(){
        return <h1>Hello world</h1>
    }
}

/**
 * Stateless function component, does not have a state
 */
const App = () => <h1>Hello world</h1>

export default App