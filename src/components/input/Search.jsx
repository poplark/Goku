import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';

import Input, { InputPropTypes } from './Input';
import Icon from '../icon';
import Button from '../button';

export default class Search extends Component {
    static propTypes = Object.assign({
        inputPrefixCls: PropTypes.string,
        enterButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
        onSearch: PropTypes.func
    }, InputPropTypes)

    static defaultProps = {
        inputPrefixCls: 'goku-input',
        prefixCls: 'goku-input-search',
        enterButton: false
    }

    handleSearch = e => {
        if(this.props.disabled) {
            return e.stopPropagation();
        }
        let value = this.input.value; // value's getter, or can use this.input.input.value - ref
        this.props.onSearch && this.props.onSearch(value);
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