import React, { Component } from 'react';
import { Consumer } from './context';

export default class Child extends Component {
    constructor(props, context) {
        super(props);

        console.log('ccccc', props, context);
    }

    render() {
        return (
            <Consumer>
                {
                    value => {
                        return (
                            <div>
                                <h5>child</h5>
                                <div>
                                    <p>{value.group.name}</p>
                                </div>
                                <div>
                                    <input onChange={value.onChange}/>
                                </div>
                            </div>
                        )
                    }
                }
            </Consumer>
        )
    }
}