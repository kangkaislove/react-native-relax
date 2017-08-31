/**
 * 自定义的抽屉内容的组件
 * Created by k.k on 2017/8/8.
 */

import React, {Component} from "react";
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "./CustomButton";
import NavigationUtil from '../utils/NavigationUtil';

class MyDrawerComponent extends Component{

    constructor(props){
        super(props)
        this._onPress=this._onPress.bind(this);
    }

    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.Container}>
                    <View style={styles.headerView}>
                        <Image style={styles.userIcon} source={require('../images/dog.jpg')}/>
                        <Text style={styles.userText}>总有刁民想害朕</Text>
                        <Text style={styles.userSign}>I am me, a different color of fireworks！</Text>
                    </View>
                    <View style={styles.drawerItems}>
                        <View style={styles.view2}>
                            <Image style={styles.classifyIcon} source={require('../images/cert.png')}/>
                            <CustomButton  text="文章干货" beijingyanse="white" onPress={() => this._onPress('Article')}/>
                        </View>
                        <View style={styles.view2}>
                            <Image style={styles.classifyIcon} source={require('../images/cert.png')}/>
                            <CustomButton  text="我的项目" beijingyanse="white" onPress={() =>this._onPress('MyProject')}/>
                        </View>
                        <View style={styles.view2}>
                            <Image style={styles.classifyIcon} source={require('../images/cert.png')}/>
                            <CustomButton  text="关于作者" beijingyanse="white" onPress={() => this._onPress('AboutMe')}/>
                        </View>
                    </View>
                    <View style={styles.footView}>
                        <TouchableOpacity style={styles.btn} onPress={() => this._onPress('AboutMe')}>
                            <Icon name='md-settings' size={20} color='#3e9ce9'/>
                            <Text style={styles.settingText}>设置</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => Alert.alert('这里怎么跳转咯')}>
                            <Icon name='md-moon' size={20} color='#3e9ce9'/>
                            <Text style={styles.nightText}>夜间</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }

    _onPress(prarm) {
        this.props.navigation.navigate('DrawerClose');
        this.props.navigation.navigate(prarm);

    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'column',
    },
    headerView: {
        flex: 5,
        flexDirection: 'column',
        backgroundColor: '#3e9ce9'
    },
    drawerItems: {
        flex: 4,
    },
    footView: {
        flex: 7,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    userIcon: {
        width: 80,
        height: 80,
        marginTop: 30,
        marginLeft: 16,
        borderRadius: 5,
    },
    userText: {
        fontSize: 18,
        color: 'white',
        marginTop: 20,
        marginLeft: 16
    },
    userSign: {
        fontSize: 12,
        color: 'white',
        marginTop: 4,
        marginLeft: 16
    },
    settingText: {
        fontSize: 14,
        color: '#3e9ce9',
        marginLeft: 6,
        marginRight: 15,

    },
    nightText: {
        fontSize: 14,
        color: '#3e9ce9',
        marginLeft: 6,
        marginRight: 10,
    },
    btn: {
        flexDirection: 'row',
        padding: 16
    },
    view2:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    },
    classifyIcon:{
        width:12,
        height:12,
        marginLeft:16,
    },

});

export default MyDrawerComponent;

