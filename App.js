import React from 'react';
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [

                {
                    "id": "57d3e2655f968976b4dedaae",
                    "age": 24,
                    "eyeColor": "blue",
                    "name": "West Henson",
                    "gender": "male"
                },
                {
                    "id": "57d3e265865e479142ab0b14",
                    "age": 25,
                    "eyeColor": "green",
                    "name": "Agnes Douglas",
                    "gender": "female"
                },
                {
                    "id": "57d3e265f5a600834424f74c",
                    "age": 27,
                    "eyeColor": "green",
                    "name": "Anna Mcfadden",
                    "gender": "female"
                },
                {
                    "id": "57d3e265c43efc13e6117aae",
                    "age": 28,
                    "eyeColor": "green",
                    "name": "Kayla Bender",
                    "gender": "female"
                },
                {
                    "id": "57d3e265f13687d20ad56b1e",
                    "age": 33,
                    "eyeColor": "brown",
                    "name": "Alexandria Finley",
                    "gender": "female"
                },
            ]
        };
    }

    render() {
        let rows = this.state.data.map(person => {
            return <PersonRow key={person.id} data={person}/>
        });
        return <table>
            <thead>
            <tr>
                <td>ID</td>
                <td>Age</td>
                <td>Eye Color</td>
                <td>Name</td>
                <td>Gender</td>
            </tr>
            </thead>

            <tbody>{rows}</tbody>
        </table>
    }
}


const PersonRow = (props) => {
    "use strict";
    return <tr>
        <td>{props.data.id}</td>
        <td>{props.data.age}</td>
        <td>{props.data.eyeColor}</td>
        <td>{props.data.name}</td>
        <td>{props.data.gender}</td>
    </tr>
};

export default App