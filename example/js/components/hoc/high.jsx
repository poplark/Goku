import React, { Component } from 'react';

const high = () => WrappedComponent => {

    console.log('high');

    return class High extends Component {
        render() {
            console.log('render low component');
            return (
                <WrappedComponent {...this.props}/>
            )
        }
    }
}
export default high;