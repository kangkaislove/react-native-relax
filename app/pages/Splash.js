/**
 *  启动页
 */
import React from 'react';
import {Dimensions, Animated, StatusBar, View} from 'react-native';
const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
import NavigationUtil from '../utils/NavigationUtil';
const splashImg = require('./../images/splash.jpg');

class Splash extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1)
        };
    }

    componentDidMount() {
        const {navigate} = this.props.navigation;
        Animated.timing(this.state.bounceValue, {
            toValue: 1,
            duration: 2000
        }).start();
        this.timer = setTimeout(() => {
            NavigationUtil.reset(this.props.navigation, 'MyDraw');
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={{flex:1}}>
                < StatusBar hidden={true} translucent={true}/>
                <Animated.Image
                    style={{
                        width: maxWidth,
                        height: maxHeight,
                        transform: [{scale: this.state.bounceValue}]
                    }}
                    source={splashImg}
                />
            </View>
        );
    }
}

export default Splash;
