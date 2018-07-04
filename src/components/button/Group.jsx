import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'unique-classnames';

import Button, { ButtonSize } from './Button';

export default class Group extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        // type: PropTypes.oneOf(ButtonType),
        // shape: PropTypes.oneOf(ButtonShape),
        size: PropTypes.oneOf(ButtonSize),
        leftGap: PropTypes.number,
        rightGap: PropTypes.number,
        className: PropTypes.string,
    }
    static defaultProps = {
        prefixCls: 'g-btn-group',
        leftGap: 0,
        rightGap: 0
    }

    render() {
        const { prefixCls, size, leftGap, rightGap, className, children, others } = this.props;

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
        const classes = classNames(prefixCls, {
            [`${prefixCls}-${sizeCls}`]: sizeCls,
        }, className);
        let leftGapStyle = {
            marginLeft: `${leftGap}px`
        }
        let rightGapStyle = {
            marginRight: `${rightGap}px`
        }
        let length = React.Children.count(children);

        return (
            <div {...others} className={classes}>
                {
                    React.Children.map(children, (child, idx) => {
                        let props = {style: {}};
                        if(idx === 0) {
                            props.style = Object.assign({}, rightGapStyle, child.props.style);
                        } else if(idx === length - 1) {
                            props.style = Object.assign({}, leftGapStyle, child.props.style);
                        } else {
                            props.style = Object.assign({}, rightGapStyle, leftGapStyle, child.props.style);
                        }
                        return React.cloneElement(child, props);
                    })
                }
            </div>
        )
    }
}
