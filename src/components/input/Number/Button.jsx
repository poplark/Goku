import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';

import Button from '../../button';

export default class InputNumberButton extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        onStopStep: PropTypes.func,
        onAddStep: PropTypes.func,
        onSubtractStep: PropTypes.func,
    }
    static defaultProps = {
    }

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
    }

    handleClick = e => {
        let { onAddStep, onSubtractStep, disabled } = this.props;
        if(!disabled) {
            if(onAddStep) {
                onAddStep();
            }
            if(onSubtractStep) {
                onSubtractStep();
            }
        }
    }

    render() {
        const { className, onAddStep, onSubtractStep, onStopStep, ...others } = this.props;

        let icon;
        if(onAddStep) {
            icon = 'caret-up';
        }
        if(onSubtractStep) {
            icon = 'caret-down';
        }
        return (
            <Button icon={icon}
                {...others}
                onMouseDown={this.handleClick}
                onMouseUp={onStopStep}
                onMouseLeave={onStopStep}/>
        )
    }
}