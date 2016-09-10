import React from 'react';

/**
 * Stateful class component, this can have state(s)
 */
class App extends React.Component {
    /**
     * Expected to return other methods or components
     *
     *
     * In this method JSX is returned . JSX is an HTML like syntax that gets converted to JS
     * e.g. <h1>Hello world</h1> will get passed to `React.createElement('h1', null, 'Hello world')`
     *
     * @returns {XML}
     */
    render() {
        /**
         * Can only return single node, this is because behind teh scenes JSX converts ` <h1>Hello world</h1>`
         * to `React.createElement('h1', null, 'Hello world')` and you cant have 2 functions after one another.
         * To return multiple nodes you need to wrap then in a container/parent node e.g.
         * <code> 
         *     return ( <div>
         *                  <h1>Hello world</h1><h2>I am below the h1</h2>
         *              </div>
         *             )
         * </code>
         */
        return (
            <div>
                <h1>Hello world</h1><h2>I am below the h1</h2>
            </div>
        )
    }
}

/**
 * Stateless function component, does not have a state
 */
// const App = () => <h1>Hello world</h1>

export default App