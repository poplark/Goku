import React, { Component } from "react";

import HOC from './components/hoc';
import ButtonExample from './components/button';
import IconExample from './components/icon';
import InputExample from './components/input';

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>Goku</h1>
                <HOC/>
                <IconExample/>
                <ButtonExample/>
                <InputExample/>
            </div>
        )
    }
}