import React, { Component } from 'react';
import Child from './child';

export default class Middle extends Component {
    constructor(props, context) {
        super(props);
        console.log('middle', props, context);
    }

    render() {

        return (
            <div>
                <h3>middle</h3>
                <Child/>
            </div>
        )
    }
}