/**
 * 自定义头部组件
 * Created by k.k on 2017/8/18.
 */
import React, {Component} from 'react';
import Icon from "react-native-vector-icons/Ionicons"
import {
    Dimensions,
    View,
    StyleSheet,
    Text, TouchableOpacity, Platform
} from 'react-native';

const {width} = Dimensions.get('window');
const screenWidth = width;
const menuWidth = 40;
class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.Container}>
                <TouchableOpacity style={styles.btn} onPress={this.props.onPress}>
                    <Icon name='md-menu' size={24} color='#EEE'/>
                </TouchableOpacity>
                <View style={styles.Title}>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#3e9ce9',
        flexDirection: 'row',
        paddingTop: Platform.OS === 'android' ? 10 : 25,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
    },
    btn: {
        width: menuWidth,
        backgroundColor: '#3e9ce9'
    },
    Title: {
        flex: 1,
        backgroundColor: '#3e9ce9',
        flexDirection: 'row'
    },
    titleText: {
        color: '#fff',
        fontSize: 18,
        marginLeft: (screenWidth / 2 - 2 * menuWidth)
    }
})

export default Header;
