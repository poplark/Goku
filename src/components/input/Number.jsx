import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';

import { getPrecision } from '../../utils/precision';
import Input, { InputPropTypes } from './Input';
import Icon from '../icon';
import Button from '../button';

/**
 * When click and hold on a button - the speed of auto changin the value.
 */
const SPEED = 200;

/**
 * When click and hold on a button - the delay before auto changin the value.
 */
const DELAY = 600;

export default class InputNumber extends Component {
    static propTypes = Object.assign({}, InputPropTypes, {
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,
        precision: PropTypes.number,
        defaultValue: PropTypes.number,
        value: PropTypes.number,
        formatter: PropTypes.func,
        parser: PropTypes.func,
    })

    static defaultProps = {
        prefixCls: 'goku-input-number',
        min: -Infinity,
        max: Infinity,
        step: 1,
        formatter: (val) => (val),
        parser: (val) => (val.replace(/[^\w.-]+/g, ''))
    }

    focus() {
        this.input.focus();
    }
    blur() {
        this.input.blur();
    }
    select() {
        this.input.select();
    }

    constructor(props) {
        super(props);
        let value = 0;
        if('value' in props) {
            value = props.value;
        } else if('defaultValue' in props) {
            value = props.defaultValue;
        }
        value = this.getValidValue(value);
        if(value !== props.value) {
            props.onChange && props.onChange(value);
        }
        const { formatter, parser } = this.props;
        this.state = {
            viewValue: this.getViewValue(value, formatter),
            inputValue: value
        }
    }
    getMaxPrecision(value) {
        if('precision' in this.props) {
            return this.precision;
        }
        const { step } = this.props;
        const stepPrecision = getPrecision(step);
        const valuePrecision = getPrecision(value);
        return Math.max(valuePrecision, stepPrecision);
    }
    getPrecisionFactor(value) {
        const precision = this.getMaxPrecision(value);
        return Math.pow(10, precision);
    }

    isInvalidInput(val) {
        // wrong format
        return (
            isNaN(val) ||
            val === '' ||
            val === null ||
            (val && val.toString().indexOf('.') === val.toString().length - 1) || // '1.' '1x' 'xx' '' => are not complete numbers
            /\.\d*0$/.test(val) || // '1.0' '1.00'  => may be a inputing number
            val.length > 16 // val.length > 16 => prevent input large number will became Infinity
        )
    }
    toNumber(val) {
        let result;
        if('number' === typeof val) {
            result = val;
        } else {
            const precision = this.getMaxPrecision(val);
            result = Number(Number(val).toFixed(precision));
        }
        return result;
    }
    getValidValue(val) {
        let result = this.toNumber(val);
        const { min, max } = this.props;
        if(result < min) {
            result = min;
        }
        if(result > max) {
            result = max;
        }
        return result;
    }

    getViewValue(value, formatter) {
        let result = value;
        if(formatter && 'function' === typeof formatter) {
            result = formatter(value);
        }
        return result;
    }
    getInputValue(formattedValue, parser) {
        let result = formattedValue;
        if(parser && 'function' === typeof parser) {
            result = parser(formattedValue);
        }
        return result;
    }

    componentWillReceiveProps(nextProps) {
        let { value, formatter, parser } = nextProps;
        if(value !== this.props.value) {
            let validValue = this.getValidValue(value);
            if(value !== validValue) {
                nextProps.onChange && nextProps.onChange(validValue);
            }
            this.setState({
                viewValue: this.getViewValue(value, formatter),
                inputValue: value
            });
        }
    }
    componentWillUnmount() {
        // clear timer
    }

    get value() {
        const { parser, value, onBlur } = this.props;
        let result;
        let inputValue = this.getInputValue(this.input.value, parser);
        if(this.isInvalidInput(inputValue)) {
            result = value;
        } else {
            result = this.toNumber(inputValue);
        }
        return result;
    }

    addStep(val) {
        const { step, max } = this.props;
        const precisionFactor = this.getPrecisionFactor(val);
        let num = this.toNumber(val);
        let result = (num * precisionFactor + step * precisionFactor) / precisionFactor;
        if(result > max) {
            result = max;
        }
        return result;
    }
    subtractStep(val) {
        const { step, min } = this.props;
        const precisionFactor = this.getPrecisionFactor(val);
        let num = this.toNumber(val);
        let result = (num * precisionFactor - step * precisionFactor) / precisionFactor;
        if(result < min) {
            result = min;
        }
        return result;
    }

    handleChange = e => {
        let val = e.target.value;
        const { parser, formatter, onChange } = this.props;
        let inputValue = this.getInputValue(val, parser);
        let viewValue = this.getViewValue(inputValue, formatter);
        if(this.isInvalidInput(inputValue)) {
            // do nothing
        } else {
            // update the value of outer
            let value = this.getValidValue(this.toNumber(inputValue));
            onChange && onChange(value);
        }
        this.setState({
            inputValue,
            viewValue
        });
    }
    handleBlur = e => {
        let val = this.input.value;
        const { parser, formatter, value, onChange, onBlur } = this.props;
        let inputValue = this.getInputValue(val, parser);
        let viewValue = this.getViewValue(inputValue, formatter);
        if(this.isInvalidInput(inputValue)) {
            // restore the outer value
            inputValue = value;
            viewValue = this.getViewValue(inputValue, formatter);
            onChange && onChange(value);
        } else {
            // valid input but the value is too big or too small
            inputValue = this.getValidValue(inputValue);
            viewValue = this.getViewValue(inputValue, formatter);
        }
        this.setState({
            inputValue,
            viewValue
        });
        onBlur && onBlur(e);
    }
    handleKeyDown = e => {
    }
    handleKeyUp = e => {
    }

    renderInput() {
        const props = this.props;
        const { viewValue, value } = this.state;

        return (
            <Input ref={ref=>this.input=ref}
                value={viewValue}
                onChange={this.handleChange}
                onBlur={this.handleBlur}/>
        )
    }
    renderAddBtn() {
    }
    renderSubtractBtn() {
    }
    render() {
        const { prefix, suffix } = this.props;

        return this.renderInput();
    }
}
