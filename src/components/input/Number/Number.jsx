import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'unique-classnames';
import omit from 'omit.js';

import { getPrecision } from '../../../utils/precision';
import Input, { InputPropTypes } from '../Input';
import InputNumberButton from './Button';

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
        inputPrefixCls: PropTypes.string,
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
        inputPrefixCls: 'goku-input',
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
        this.stop();
    }
    componentDidUpdate(preProps, preState) {
        // TODO - persist focused when click the add button
        // let { focused } = this.state;
        // if(focused) {
        //     this.focus();
        // }
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

    addStep() {
        const { step, max, value } = this.props;
        let val = this.getValidValue(value);

        const precisionFactor = this.getPrecisionFactor(val);
        let num = this.toNumber(val);
        let result = (num * precisionFactor + step * precisionFactor) / precisionFactor;
        if(result > max) {
            result = max;
        }
        return result;
    }
    subtractStep() {
        const { step, min, value } = this.props;
        let val = this.getValidValue(value);

        const precisionFactor = this.getPrecisionFactor(val);
        let num = this.toNumber(val);
        let result = (num * precisionFactor - step * precisionFactor) / precisionFactor;
        if(result < min) {
            result = min;
        }
        return result;
    }

    handleAddStep = recursive => {
        // click add button, or press up key
        const { formatter, onChange } = this.props;
        let { inputValue } = this.state;
        let newInputValue = this.addStep();
        let newViewValue = this.getViewValue(newInputValue, formatter);
        if(inputValue === newInputValue) {
            // do nothing - exceed the max
        } else {
            onChange && onChange(newInputValue);
            this.setState({
                inputValue: newInputValue,
                viewValue: newViewValue
            });
            this.autoStepTimer = setTimeout(() => {
                this.handleAddStep(true);
            }, recursive ? SPEED : DELAY);
        }
    }
    handleSubtractStep = recursive => {
        // click subtract button, or press down key
        const { formatter, onChange } = this.props;
        let { inputValue } = this.state;
        let newInputValue = this.subtractStep();
        let newViewValue = this.getViewValue(newInputValue, formatter);
        if(inputValue === newInputValue) {
            // do nothing - exceed the min
        } else {
            onChange && onChange(newInputValue);
            this.setState({
                inputValue: newInputValue,
                viewValue: newViewValue
            });
            this.autoStepTimer = setTimeout(() => {
                this.handleSubtractStep(true);
            }, recursive ? SPEED : DELAY);
        }
    }
    stop = () => {
        if(this.autoStepTimer) {
            clearTimeout(this.autoStepTimer);
        }
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
    handleFocus = e => {
        // this.setState({
        //     focused: true
        // });
        this.props.onFocus && this.props.onFocus(e);
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
        e.preventDefault();
        if (e.keyCode === 38) {
            this.handleAddStep();
            this.stop();
        } else if (e.keyCode === 40) {
            this.handleSubtractStep();
            this.stop();
        }
    }
    handleKeyUp = e => {
        e.preventDefault();
        this.stop();
    }

    renderAddBtn() {
        const { disabled, max } = this.props;
        let { inputValue } = this.state;
        let isDisabled = false;
        if(disabled) {
            isDisabled = true;
        }
        if(this.addStep() === max && inputValue >= max) {
            // exceed the max
            isDisabled = true;
        }
        return (
            <InputNumberButton disabled={isDisabled}
                onAddStep={this.handleAddStep}
                onStopStep={this.stop}/>
        )
    }
    renderSubtractBtn() {
        const { disabled, min } = this.props;
        let { inputValue } = this.state;
        let isDisabled = false;
        if(disabled) {
            isDisabled = true;
        }
        if(this.subtractStep() === min && inputValue <= min) {
            // exceed the min
            isDisabled = true;
        }
        return (
            <InputNumberButton disabled={isDisabled}
                onSubtractStep={this.handleSubtractStep}
                onStopStep={this.stop}/>
        )
    }
    render() {
        const { className, prefixCls, inputPrefixCls, suffix, ...others } = this.props;
        const { viewValue } = this.state;

        let classes = classNames(prefixCls, className);

        let newSuffix = (
            <React.Fragment>
                {suffix}
                <div className={`${prefixCls}-handler`}>
                    {this.renderAddBtn()}
                    {this.renderSubtractBtn()}
                </div>
            </React.Fragment>
        )

        return (
            <Input {...omit(others, ['formatter', 'parser'])}
                className={classes}
                prefixCls={inputPrefixCls}
                ref={ref=>this.input=ref}
                value={viewValue}
                suffix={newSuffix}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}/>
        )
    }
}
