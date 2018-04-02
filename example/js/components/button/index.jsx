import React, { Component } from 'react';
import { Button } from 'goku';

export default class ButtonExample extends Component {
    handleClick = e => {
        console.log(e)
    }
    render() {
        return (
            <div>
                <div>
                    <Button onClick={this.handleClick}>normal</Button>
                    <Button disabled={true} onClick={this.handleClick}>disabled</Button>
                    <Button href="/#a" onClick={this.handleClick}>normal</Button>
                    <Button disabled={true} href="/#a" onClick={this.handleClick}>disabled</Button>
                </div>
                <div>
                    <Button.Group size="small" leftGap={4} rightGap={4}>
                        <Button style={{marginLeft: 10}} onClick={this.handleClick}>normal</Button>
                        <Button disabled={true} onClick={this.handleClick}>disabled</Button>
                        <Button href="/#a" onClick={this.handleClick}>normal</Button>
                        <Button disabled={true} href="/#a" onClick={this.handleClick}>disabled</Button>
                    </Button.Group>
                </div>
            </div>
        )
    }
}