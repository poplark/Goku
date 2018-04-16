import React, { Component } from 'react';
import { Provider } from './context';
import Middle from './middle';

export default class Parent extends Component {
    constructor(props, context) {
        console.log('parent', props, context, Provider);
        super(props);
        this.state = {
            group: {
                name: 'default',
            }
        }
    }

    handleChange = e => {
        let value = e.target.value;
        let { group } = this.state;
        group.name = value;
        this.setState({
            group
        });
    }
    render() {
        let { group } = this.state;
        return (
            <div>
                <h2>Context - react 16.3</h2>
                <Provider value={{group, onChange: this.handleChange}}>
                    <div style={{padding: '0 16px 16px 16px', border: '1px solid #eee'}}>
                        <h3>parent</h3>
                        <div>
                            <p>{group.name}</p>
                        </div>
                        <div>
                            <input onChange={this.handleChange}/>
                        </div>
                        <Middle></Middle>
                    </div>
                </Provider>
            </div>
        )
    }
}