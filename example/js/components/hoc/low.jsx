import React, { Component } from 'react';

import High from './high';

@High()
export default class Low extends Component {
    render() {
        return (
            <div>
                <h2>HOC</h2>
                <p>Use decorator on HOC</p>
            </div>
        )
    }
}