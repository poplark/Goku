import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext({
    name: 'default',
    onChange: (name) => {
        this.name = name;
    }
});

export { Provider, Consumer };