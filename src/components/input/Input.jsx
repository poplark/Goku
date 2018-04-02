import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';

export const InputSize = ['small', 'large'];
export const InputWSize = ['small', 'large'];

function fixControlledValue(value) {
    if(typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

export const InputPropTypes = {
    prefixCls: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    placeholder: PropTypes.string,

    size: PropTypes.oneOf(InputSize),
    wSize: PropTypes.oneOf(InputWSize),
    defaultValue: PropTypes.any,
    value: PropTypes.any,

    addonBefore: PropTypes.node,
    addonAfter: PropTypes.node,
    prefix: PropTypes.node,
    suffix: PropTypes.node,

    // action handlers
    onClick: PropTypes.func,
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
}

export default class Input extends Component {
    static propTypes = Object.assign({}, InputPropTypes)

    static defaultProps = {
        prefixCls: 'goku-input',
        type: 'text',
        disabled: false,
    }

    /*
    focus() {
        this.input.focus();
    }
    blur() {
        this.input.blur();
    }
    */

    get value() {
        return this.input.value;
    }

    handleKeyDown = e => {
        const { onPressEnter, onKeyDown } = this.props;
        if(e.keyCode === 13 && onPressEnter) {
            onPressEnter(e);
        }
        if(onKeyDown) {
            onKeyDown(e);
        }
    }

    getSizeCls() {
        const { size } = this.props;
        let sizeCls = '';
        switch(size) {
            case 'large':
                sizeCls = 'lg';
                break;
            case 'small':
                sizeCls = 'sm';
                break;
            default:
                break;
        }
        return sizeCls;
    }
    getInputClassName() {
        const { prefixCls, type, size, wSize, className, disabled } = this.props;

        let sizeCls = this.getSizeCls();
        return classNames(prefixCls, {
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${sizeCls}`]: sizeCls,
            [`${prefixCls}-disabled`]: disabled,
        });
    }
    renderInput() {
        const { value, className } = this.props;
        const otherProps = omit(this.props, [
            'prefixCls',
            'onPressEnter', // ?????
            'addonBefore',
            'addonAfter',
            'prefix',
            'suffix'
        ]);
        if('value' in this.props) {
            otherProps.value = fixControlledValue(value);
            delete otherProps.defaultValue;
        }
        return (
            <input {...otherProps}
                className={classNames(this.getInputClassName(), className)}
                onKeyDown={this.handleKeyDown}
                ref={ref=>this.input=ref}/>
        );
    }
    renderAffixWrapper(children) {
        const { prefixCls, prefix, suffix, className, style } = this.props;
        if(!prefix && !suffix) {
            return children;
        }

        let prefixElem = prefix ? (
            <span className={`${prefixCls}-prefix`}>
                { prefix }
            </span>
        ) : null;
        let suffixElem = suffix ? (
            <span className={`${prefixCls}-suffix`}>
                { suffix }
            </span>
        ) : null;
        let sizeCls = this.getSizeCls();
        let affixWrapperCls = classNames(className, `${prefixCls}-affix-wrapper`, {
            [`${prefixCls}-affix-wrapper-${sizeCls}`]: sizeCls,
        });
        return (
            <span className={affixWrapperCls} style={style}>
                {prefixElem}
                {React.cloneElement(children, {style: null, className: this.getInputClassName()})}
                {suffixElem}
            </span>
        )
    }
    renderAddonWrapper(children) {
        const { prefixCls, addonBefore, addonAfter, className, size, style } = this.props;
        if(!addonBefore && !addonAfter) {
            return children;
        }

        let beforeElem = addonBefore ? (
            <span className={`${prefixCls}-addon`}>
                { addonBefore }
            </span>
        ) : null;
        let afterElem = addonAfter ? (
            <span className={`${prefixCls}-addon`}>
                { addonAfter }
            </span>
        ) : null;
        // wrapper
        let sizeCls = this.getSizeCls();
        let wrapperCls = classNames(className, `${prefixCls}-wrapper`, {
            [`${prefixCls}-wrapper-${sizeCls}`]: sizeCls
        });
        if(beforeElem || afterElem) {
            return (
                <span className={wrapperCls} style={style}>
                    {beforeElem}
                    {React.cloneElement(children, {style: null, className: this.getInputClassName()})}
                    {afterElem}
                </span>
            )
        }
        return (
            <span className={wrapperCls}>
                {beforeElem}
                {children}
                {afterElem}
            </span>
        )
    }

    render() {
        return this.renderAddonWrapper(
            this.renderAffixWrapper(
                this.renderInput()
            )
        );
    }
}