import React, { Component } from 'react';
import { Button } from 'goku';

export default class ButtonExample extends Component {
    handleClick = e => {
        console.log(e)
    }
    render() {
        return (
            <div>
                <h2>Button</h2>
                <div>
                    <h3>Button</h3>
                    <Button onClick={this.handleClick}>normal</Button>
                    <Button disabled={true} onClick={this.handleClick}>disabled</Button>
                    <Button href="/#a" onClick={this.handleClick}>normal</Button>
                    <Button disabled={true} href="/#a" onClick={this.handleClick}>disabled</Button>
                </div>
                <div>
                    <h3>Button.Group</h3>
                    <Button.Group size="small" leftGap={4} rightGap={4}>
                        <Button style={{marginLeft: 10}} icon="refresh" onClick={this.handleClick}>normal</Button>
                        <Button disabled={true} onClick={this.handleClick}>disabled</Button>
                        <Button icon="refresh" href="/#a" onClick={this.handleClick}>normal</Button>
                        <Button disabled={true} href="/#a" onClick={this.handleClick}>disabled</Button>
                    </Button.Group>
                </div>
            </div>
        )
    }
}