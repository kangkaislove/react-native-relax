/**
 * Created by k.k on 2017/8/8.
 */

import React from "react";
import {View,Dimensions,Platform} from "react-native";
import {DrawerNavigator, StackNavigator, TabBarBottom, TabNavigator} from "react-navigation";
import MyDrawerComponent from "../widget/MyDrawerComponent";
import Splash from '../pages/Splash';
import Joke from "./joke/Joke";
import WeChat from "./wechat/WeChat";
import BeautyAtlas from "./beautyatlas/BeautyAtlas";
import WebViewPage from "./wechat/WebViewPage";
import ImgPage from "./beautyatlas/ImageDetail";
import AboutMe from "./AboutMe";

const {width} = Dimensions.get('window');
const screenWidth = width;

/*这个声明需放在实例化DrawerNavigator之前*/
const CustomDrawerContentComponent = (props) => (
    <View style={{flex: 1, backgroundColor: 'white'}}>
        <MyDrawerComponent {...props}/>
    </View>
);

const TabContainer = TabNavigator(
    {
        one: {
            screen: Joke,
        },
        two: {
            screen: BeautyAtlas,
        },
        three: {
            screen: WeChat,
        }
    },
    {
        initialRouteName:'two',
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#3e9ce9',
            inactiveTintColor: '#999999',
            showIcon: true,
            style: {
                backgroundColor: '#fff'
            },
            indicatorStyle: {
                opacity: 0
            },
            tabStyle: {
                padding: 0
            }
        }
    }
);

const MyDraw = DrawerNavigator({
        Tab: {
            screen: TabContainer,
        }
    },
    {
        drawerWidth: 250,
        drawerPosition: 'left',
        contentComponent:  CustomDrawerContentComponent,
        //     props =>
        //
        //         <View style={styles.Container}>
        //             <View style={styles.headerView}>
        //                 <Image style={styles.userIcon} source={require('./../../../images/dog.jpg')}/>
        //                 <Text style={styles.userText}>总有刁民想害朕</Text>
        //                 <Text style={styles.userSign}>I am me, a different color of fireworks！</Text>
        //             </View>
        //             {/*<View style={styles.drawerItems}>*/}
        //                 {/*<DrawerItems {...props} />*/}
        //             {/*</View>*/}
        //             <View style={styles.footView}>
        //                 <TouchableOpacity style={styles.btn} onPress={() => Alert.alert('这里怎么跳转咯')}>
        //                     <Icon name='md-settings' size={20} color='#3e9ce9'/>
        //                     <Text style={styles.settingText}>设置</Text>
        //                 </TouchableOpacity>
        //                 <TouchableOpacity style={styles.btn} onPress={() => Alert.alert('这里怎么跳转咯')}>
        //                     <Icon name='md-moon' size={20} color='#3e9ce9'/>
        //                     <Text style={styles.nightText}>夜间</Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>
        // ,
        // contentOptions: {
        //     inactiveTintColor: '#3e9ce9',
        //     activeTintColor: 'green'
        // }
    }
);


const mDrawStack = StackNavigator(
    {
        Splash: { screen: Splash },
        MyDraw: {
            screen: MyDraw,
            navigationOptions: {
                header: null
            }
        },
        Web: {
            screen: WebViewPage,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: '#3e9ce9',
                },
                headerTitleStyle: {
                    color: '#fff',
                    fontSize: 16,
                    alignSelf:'center',
                    marginRight:Platform.OS === 'android' ? 50 : 0,
                },
                headerTintColor: '#fff',
            }

        },
        Images: {
            screen: ImgPage,
            navigationOptions: {
                header: null
            }
        },
        AboutMe:{
            screen:AboutMe
        }

    });



export default mDrawStack;