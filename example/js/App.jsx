import React, { Component } from "react";

import HOC from './components/hoc';

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>Goku</h1>
                <HOC/>
            </div>
        )
    }
}