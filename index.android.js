import React, {PureComponent} from 'react';
import { AppRegistry } from 'react-native';

import App from './app/pages/index';

export default class Relax extends PureComponent {
    render() {
        return (
            <App />
        );
    }
}

AppRegistry.registerComponent('Relax', () => Relax);
