import React, { Component } from "react";

import HOC from './components/hoc';
import Context from './components/context';
import ButtonExample from './components/button';
import IconExample from './components/icon';
import InputExample from './components/input';
import TooltipExample from './components/tooltip';

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>Goku</h1>
                <HOC/>
                <Context/>
                <IconExample/>
                <ButtonExample/>
                <InputExample/>
                <TooltipExample/>
            </div>
        )
    }
}