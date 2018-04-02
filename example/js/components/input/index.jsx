import React, { Component } from 'react';
import { Input, Icon } from 'goku';

export default class Inputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: null
        }
    }
    handleClick = e => {
        console.log('clicked');
    }
    handleChange = e => {
        let val = e.target.value;
        console.log('ccccc', val);
        this.setState({
            inputValue: val
        })
    }
    handleRefresh = e => {
        this.setState({
            inputValue: null
        })
    }

    render() {
        let reloadIcon = <Icon type="reload"/>;
        let refreshIcon = <Icon type="refresh" onClick={this.handleRefresh}/>;
        let { inputValue } = this.state;

        return (
            <div>
                <Input placeholder="text"
                    value={inputValue}
                    prefix={reloadIcon}
                    onClick={this.handleClick}
                    onChange={this.handleChange}/>
                <Input placeholder="text"
                    value={inputValue}
                    suffix={refreshIcon}
                    onClick={this.handleClick}
                    onChange={this.handleChange}/>
                <Input placeholder="text"
                    value={inputValue}
                    addonBefore={<select><option key='1' value='1'>1</option></select>}
                    onClick={this.handleClick}
                    onChange={this.handleChange}/>
            </div>
        )
    }
}