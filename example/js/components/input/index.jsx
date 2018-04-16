import React, { Component } from 'react';
import { Input, Icon } from 'goku';

export default class Inputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: null,
            inputNumber: 20
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
    handlePressEnter = e => {
        console.log(e.keyCode);
        this.setState({
            inputValue: null
        })
    }
    handleSearch = val => {
        console.log('search', val)
        this.inputSearch.select();
    }

    handleNumberChange = val => {
        console.log('number changed ', val, ' type: ', typeof val);
        this.setState({
            inputNumber: val
        })
    }

    render() {
        let reloadIcon = <Icon type="reload"/>;
        let refreshIcon = <Icon type="refresh" onClick={this.handleRefresh}/>;
        let { inputValue, inputNumber } = this.state;

        return (
            <div>
                <div>
                    <Input placeholder="text"
                        defaultValue="test"
                        prefix={reloadIcon}
                        onClick={this.handleClick}
                        onChange={this.handleChange}/>
                    <Input placeholder="text"
                        autoFocus={true}
                        value={inputValue}
                        onPressEnter={this.handlePressEnter}
                        onChange={this.handleChange}/>
                    <Input type="password" placeholder="text"
                        value={inputValue}
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
                <div>
                    <Input.Search placeholder="text"
                        defaultValue="test"
                        onSearch={this.handleSearch}/>
                    <Input.Search placeholder="text"
                        ref={ref=>this.inputSearch=ref}
                        defaultValue="test"
                        onSearch={this.handleSearch}
                        enterButton={true}/>
                </div>
                <div>
                    <h4>Input.Number</h4>
                    <Input.Number defaultValue={1}
                        value={inputNumber} min={-10} max={10}
                        onChange={this.handleNumberChange}/>
                </div>
            </div>
        )
    }
}