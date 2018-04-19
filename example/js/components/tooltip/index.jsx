import React, { Component } from 'react';
import { Tooltip, Icon, Button } from 'goku';

import './index.less';

export default class Tooltips extends Component {
    render() {
        return (
            <div>
                <h2>Tooltips</h2>
                <div>
                    <h3>Tooltip</h3>
                    <Tooltip title="test">
                        <p>
                            tooltip with button.
                        </p>
                        <Button>click me</Button>
                    </Tooltip>
                </div>
                <div>
                    <h3>Tooltip</h3>
                    <Tooltip title={<div className="goku-tooltip-test"><Icon type="refresh"/><Button>Click Me</Button></div>}>
                        tooltip with button. <Button>click me</Button>
                    </Tooltip>
                </div>
            </div>
        )
    }
}