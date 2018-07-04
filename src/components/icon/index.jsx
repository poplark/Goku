import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'unique-classnames';
import omit from 'omit.js';

export default class Icon extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        type: PropTypes.string,
        spin: PropTypes.bool,
    }
    static defaultProps = {
        prefixCls: 'g-icon',
        type: '',
        spin: false
    }

    render() {
        const { prefixCls, type, className, spin } = this.props;
        const classes = classNames(prefixCls, {
            [`${prefixCls}-spin`]: !!spin || type === 'loading',
            [`${prefixCls}-${type}`]: true
        }, className);
        return (
            <i {...omit(this.props, ['prefixCls', 'type', 'spin'])} className={classes}/>
        )
    }
}