import React, { Component } from 'react';

import { Icon } from 'goku';
import 'goku/components/icon/style/index.less';

export default class Icons extends Component {

    render() {
        return (
            <div>
                <h2>Icon</h2>
                <Icon type='node-web'/>
                <Icon type='refresh'/>
            </div>
        );
    }
}