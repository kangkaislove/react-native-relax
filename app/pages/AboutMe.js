/**
 * Created by k.k on 2017/8/7.
 */

import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from "react-native";


class AboutMe extends React.Component {
    static navigationOptions = {
        headerTitle: '关于作者',
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={{padding:20}} onPress={() =>this._onPress()} >
                    <Text>
                        about Me
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    _onPress(){
        const {navigate, goBack, state} = this.props.navigation; // 在第二个页面,在goBack之前,将上个页面的方法取到,并回传参数,这样回传的参数会重走render方法
        state.params.callback('回调参数');
        goBack();
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});


export default AboutMe;