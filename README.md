# learning-react-fundamentals

My companion repo to egghead.io tutorial on react fundamentals

Here are my various notes and comments on react

# Cheat Sheet
## Components
### Stateful class component, this can have state(s)
```js
class App extends React.Component{
    /**
     * Expected to return other methods or components
     * In this method JSX is returned . JSX is an HTML like syntax that gets converted to JS
     * e.g. <h1>Hello world</h1> will get passed to `React.createElement('h1', null, 'Hello world')`
     *
     * @returns {XML}
     */
    render(){
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
        return <h1>Hello world</h1>
    }
}
```
### Stateless function component, does not have a state
```js
const App = () => <h1>Hello world</h1>
```
## Properties 
Used to pass values to your components. This is like passing/setting a value in normal js/html
### Declaring them
```js
 // Property types App is expecting
 App.propTypes = {
     // Here way say `theName` is a {string}
     theName: React.PropTypes.string,
     myVar: React.PropTypes.number.isRequired
 };
 
 App.defaultProps = {
     // Here way say `theName` should default to the following 
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
```
### Consuming them in a Component
```js
class App extends React.Component {
 /** Can access's props by enclosing with {} braces and use the name defined in the `ReactDOM.render(` prop
  *  e.g. `<App theName="this is the text for this prop"/>,` is aceessed by  `{this.props.theName}`
  * @returns {XML}
  */
 render() {
     let text = this.props.theName;
     return <h1> {text}</h1>
 }
}
```
 