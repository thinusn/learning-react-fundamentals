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
Used to pass values to your components as static values or methods. This is like passing/setting a value in normal js/html
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
## States
Collection of values that is managed by the component itself
### Setting and retrieving states
```js
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
```

## Owner Ownee relationships.

### Parent 
 When one component renders another component. The parent component is also called the composite component
```
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
```

## Refs
A way to reference an instance of a react component in our application. Thus when adding multiple widgets to a page
they should all display and update their own `txt` value and not the composite components `txt` value.
Thus all the Widgets on the page will consume and update tier own different txt values.
```js
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
             *     // Here the `div` will be `this.refs.red` to get to the input you need to use (this.refs.red.refs.myInput).value
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
        //The ref tags allows you to indicate what state it needs to be updated
        return (<div>
                <h1> Slide for RGB values </h1>
                <h2>Red</h2>
                //Here we are sying the thius slider should have a ref of `red`
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
    return (...)
};

// The component used, here the input tag will be given a ref when added rendered by App
class Slider extends React.Component {
    render() {
        return (<input type="range" min="0" max="255" onChange={this.props.update}/>)
    };
}
```

## Accessing child properties
When you want to access the inner html or nested components of another components you can use
### inner html
To display a inner html => `React Button`
The Button component takes `React Button` from parent and displays it within the `Button`
```js
 class App extends React.Component {
     render() {
         return (<div>
                    <Button>React Button</Button>
                 </div>)
     }
 }
 
 class Button extends React.Component {
     //This allows you to access `React Button` inside App
     render() {
         return <button>{this.props.children}</button>
     }
 }
```
### nested components
To display a nested component => `React ❤ Button`
The Button component takes `React <Icon/> Button` from parent and displays it within the `Button` 
```js
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
```

## Component Lifecycle Mounting
## Basics
 Mounting/Unmounting a component - adding or removing components to the dom

```js
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
```

#### Actions taken 
 
1. Mount 
2. Btn
3. Btn
4. Btn
5. Unmount 
6. Mount

#### Output 
- mounting
- rendering
- mounted
- 3 rendering
- unmounted
- mounting
- rendering
- mounted

## Higher Order components /mixins
Each button and label below share a state but update their own values independent of one another. 
But functionality is shared even across different components .
```js
let Mixin = InnerComponent => class extends React.Component {
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

    render() {
        return <InnerComponent
            update={this.update}
            {...this.state}
            {...this.props}
        />
    }
};


const Button = (props) => <button onClick={props.update}>{props.txt} - {props.val}</button>;
const Label = (props) => <label onMouseMove={props.update}>{props.txt} - {props.val}</label>;


let ButtonMixed = Mixin(Button);
let LabelMixed = Mixin(Label);

class App extends React.Component {

    render() {
        return (<div>
            <ButtonMixed txt="My btn 1"></ButtonMixed>
            <LabelMixed txt="My label"></LabelMixed>
            <ButtonMixed txt="My btn 3"></ButtonMixed>
        </div>)
    }
}
```


## Composable Components

This allows you to make a function more genertic and re usable. By passing in params to a component you can reeuse and change based on setting a few things. 
```js
class App extends React.Component {
    //To initialise values
    constructor() {
        super();//Sets the `this` context for the component
        this.state = {
            red: 0
        };
        this.update = this.update.bind(this);
    }
    update(event) {
        //passing the value of the state you are concerned about.
        this.setState({
            red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
        });
    }

    render() {
        //The ref tags allows you to indicate what state it needs to be updated
        return (<div>
                <NumInput ref='red'
                          min={0}
                          max={255}
                          step={1}
                          type="number"
                          label="Red"
                          val={+this.state.red}
                          update={this.update}/>
            </div>
        )
    }
}

class NumInput extends React.Component {
    render() {
        let label =  this.props.label !== '' ?
            <label>{this.props.label} - {this.props.val}</label> : '';

        return (<div>
            <input ref="inp"
                    type={this.props.type}
                   min={this.props.min}
                   max={this.props.max}
                   step={this.props.step}
                   defaultValue ={this.props.val}
                   onChange={this.props.update}/>
            <br/>
            {label}
        </div>)
    };
}

NumInput.propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step:React.PropTypes.number,
    val:React.PropTypes.number,
    label: React.PropTypes.string,
    update: React.PropTypes.func.required,
    type: React.PropTypes.oneOf(['number', 'range'])
};

NumInput.defaultProps = {
    min: 0,
    max: 0,
    step:1,
    val:0,
    label: '',
    type: 'range'
};
```