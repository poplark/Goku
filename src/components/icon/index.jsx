import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';

export default class Icon extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        type: PropTypes.string,
        spin: PropTypes.bool,
    }
    static defaultProps = {
        prefixCls: 'goku-icon',
        type: '',
        spin: false
    }

    render() {
        const { prefixCls, type, className, spin } = this.props;
        const classes = classNames(prefixCls, className, {
            [`${prefixCls}-spin`]: !!spin || type === 'loading',
            [`${prefixCls}-${type}`]: true
        });
        return (
            <i {...omit(this.props, ['prefixCls', 'type', 'spin'])} className={classes}/>
        )
    }
}