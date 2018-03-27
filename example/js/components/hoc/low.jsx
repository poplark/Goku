import React, { Component } from 'react';

import High from './high';

@High()
export default class Low extends Component {
    render() {
        return (
            <h1>low component</h1>
        )
    }
}