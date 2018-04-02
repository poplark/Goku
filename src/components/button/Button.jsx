import React, { Component } from 'react';
// import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';

export const ButtonType = ['primary', 'dashed', 'danger'];
export const ButtonShape = ['cirle', 'circle-outline'];
export const ButtonSize = ['small', 'large'];
const ButtonHtmlType = ['submit', 'button', 'reset'];

export default class Button extends Component {

    static propTypes = {
        type: PropTypes.oneOf(ButtonType),
        htmlType: PropTypes.oneOf(ButtonHtmlType),
        shape: PropTypes.oneOf(ButtonShape),
        size: PropTypes.oneOf(ButtonSize),
        icon: PropTypes.string,
        onClick: PropTypes.func,
        // onMouseUp: PropTypes.func,
        // onMouseDown: PropTypes.func,
        // onKeyPress: PropTypes.func,
        // onKeyDown: PropTypes.func,
        // tabIndex: PropTypes.number,
        loading: PropTypes.bool,
        disabled: PropTypes.bool,
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        target: PropTypes.string,
        href: PropTypes.string,
        // download: PropTypes.string,
    }

    static defaultProps = {
        prefixCls: 'goku-btn',
        loading: false,
    }

    timeout = 0
    delayTimeout = 0

    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading,
            clicked: false
        }
    }

    componentWillReceiveProps(nextProps) {
        const currentLoading = this.props.loading;
        const loading = nextProps.loading;
        if(currentLoading) {
            clearTimeout(this.delayTimeout);
        }
        if(typeof loading !== 'boolean' && loading && loading.delay) {
            this.delayTimeout = window.setTimeout(() => this.setState({ loading }), loading.delay);
        } else {
            this.setState({ loading });
        }
    }
    componentWillUnmount() {
        if(this.timeout) {
            clearTimeout(this.timeout);
        }
        if(this.delayTimeout) {
            clearTimeout(this.delayTimeout);
        }
    }

    handleClick = e => {
        if(this.props.disabled) {
            return e.preventDefault();
        }
        this.setState({ clicked: true });
        clearTimeout(this.timeout);
        this.timeout = window.setTimeout(() => this.setState({ clicked: true }), 500);
        this.props.onClick && this.props.onClick(e);
    }

    render() {
        const {
            type, shape, size, className, htmlType, children, icon, prefixCls, ...others
        } = this.props;
        const { loading, clicked } = this.state;
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
        const ComponentProp = others.href ? 'a' : 'button';
        const classes = classNames(prefixCls, className, {
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${shape}`]: shape,
            [`${prefixCls}-${sizeCls}`]: sizeCls,
            [`${prefixCls}-icon-only`]: !children && icon,
            [`${prefixCls}-loading`]: loading,
            [`${prefixCls}-clicked`]: clicked
        })
        const iconType = loading ? 'loading' : icon;
        const iconNode = iconType ? <span type={iconType}/> : null;

        return (
            <ComponentProp
                {...omit(others, ['loading'])}
                type={others.href ? undefined : (htmlType || 'button')}
                className={classes}
                onClick={this.handleClick}
            >
                {iconNode}{React.Children.map(children, child => {
                    if(typeof child !== 'string' && typeof child !== 'number') {
                        return React.cloneElement(child, {})
                    }
                    if(typeof child === 'string') {
                        return <span>{child}</span>
                    }
                    return child;
                })}
            </ComponentProp>
        )
    }
}