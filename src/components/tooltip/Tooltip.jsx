import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'unique-classnames';
import eventListener from '../../utils/event';
import offset from '../../utils/offset';

let container;
const getContainer = function() {
    if(!container) {
        container = document.createElement('div');
        document.body.append(container);
    }
    return container;
}

export default class Tooltip extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        title: PropTypes.node,
        children: PropTypes.any,
        display: PropTypes.bool,
    }
    static defaultProps = {
        prefixCls: 'goku-tooltip',
        trigger: 'hover',
    }
    constructor(props) {
        super(props);
        const { prefixCls, title } = props;
        let tip = (
            <div className={`${prefixCls}-wrapper`}>
                {title}
            </div>
        );
        this.state = { tip: tip }
    }
    componentWillMount() {
        // this.container = getContainer();
    }
    componentDidMount() {
        this.bindEventListener();
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.title && nextProps.title !== this.props.title) {
            let prefixCls = nextProps.prefixCls,
                title = nextProps.title;
            let tip = (
                <div className={`${prefixCls}-wrapper`}>
                    {title}
                </div>
            )
            this.setState({ tip: tip });
        }
    }
    componentWillUnmount() {
        this.unbindEventListener();
        this.container.remove();
    }
    enterListener = e => {
        // const { top, right, bottom, left, pageTop, pageLeft } = offset.getOffset(e.currentTarget);
        // todo - compute the position
        
        const { tip } = this.state;
        this.container = this.container || getContainer();
        ReactDOM.render(tip, this.container, ref => {
            this.tip = ReactDOM.findDOMNode(tip);
            console.log('rerrrrrf', this.tip)
        });
    }
    leaveListener = e => {
        ReactDOM.unmountComponentAtNode(this.container);
    }
    bindEventListener() {
        eventListener.on(this.element, 'mouseenter', this.enterListener);
        // eventListener.on(this.element, 'mouseleave', this.leaveListener);
    }
    unbindEventListener() {
        eventListener.off(this.element, 'mouseenter', this.enterListener);
        // eventListener.off(this.element, 'mouseleave', this.leaveListener);
    }
    render() {
        const { prefixCls, className, trigger, children, ...others } = this.props;
        let classes = classNames(prefixCls, className);

        return (
            <span ref={ref=>this.element = ref}
                className={classes} {...others}>
                { children }
            </span>
        )
    }
}