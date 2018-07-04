import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'unique-classnames';
import omit from 'omit.js';

import Input, { InputPropTypes } from './Input';
import Icon from '../icon';
import Button from '../button';

export default class Search extends Component {
    static propTypes = Object.assign({}, InputPropTypes, {
        inputPrefixCls: PropTypes.string,
        enterButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
        onSearch: PropTypes.func
    })

    static defaultProps = {
        inputPrefixCls: 'g-input',
        prefixCls: 'g-input-search',
        enterButton: false
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
    handleSearch = e => {
        if(this.props.disabled) {
            return e.stopPropagation();
        }
        // `this.input.value` will invoke the value getter of Input component
        let value = this.input.value;
        // or you can use `this.input.input.value` to get value from the input HtmlElement
        // - because the `input` is a memeber of Input component (this.input),
        // - and it's the reference of the input HtmlElement of Input component
        // let value = this.input.input.value;
        this.props.onSearch && this.props.onSearch(value);
        this.input.focus();
    }

    render() {
        const { className, disabled, prefixCls, inputPrefixCls, size, enterButton, suffix, ...others } = this.props;

        let button = enterButton ? (
            <Button className={`${prefixCls}-btn`}
                type="primary"
                size={size}
                disabled={disabled}
                onClick={this.handleSearch}
                >
                {
                    enterButton === true ? (
                        <Icon type="search"/>
                    ) : enterButton
                }
            </Button>
        ) : (
            <Icon className={`${prefixCls}-icon`} type="search" onClick={this.handleSearch}/>
        );

        let suffixElem = suffix ?  [suffix, button] : button;
        const classes = classNames(prefixCls, className);
        return (
            <Input ref={ref=>(this.input=ref)}
                className={classes}
                prefixCls={inputPrefixCls}
                size={size}
                suffix={suffixElem}
                {...omit(others, ['onSearch'])}
                onPressEnter={this.handleSearch}/>
        )
    }
}