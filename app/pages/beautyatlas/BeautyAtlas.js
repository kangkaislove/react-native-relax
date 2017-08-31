/**
 * Created by k.k on 2017/8/8.
 */

import React, {Component} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import ScrollableTabView, {DefaultTabBar} from "react-native-scrollable-tab-view";
import {Alert, Animated, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import LoadingView from "../../widget/LoadingView";
import LoadingMoreView from "../../widget/LoadingMoreView";
import getUrl from "./../../utils/url";
import Header from "./../../widget/Header";
const AnimatedList = Animated.createAnimatedComponent(FlatList);
let dataBlob = [];

class BeautyAtlas extends Component {
    static navigationOptions = {
        // drawerLabel: '美女图集',
        // drawerIcon: ({tintColor}) =>
        //     <Icon name="md-images" size={25} color={tintColor}/>,
        tabBarLabel: '美女图集',
        tabBarIcon: ({tintColor}) =>
            <Icon name="md-images" size={25} color={tintColor}/>
    }

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            dataArray: [],
            typeIds: [1],//随便给一个初始值，就不会报错了，尼玛
            typeList: [],
            currentId: 1,//当前的分类id
            currentPage: 1,//当前的分类的页数
            refreshing: false,//正在刷新的标志
            isLoadMore: false,//正在加载的标志
        }
        this._onPress = this._onPress.bind(this);
        this._onMenuPress = this._onMenuPress.bind(this);
        this.fetchData2 = this.fetchData2.bind(this);
        this.renderGirls = this.renderGirls.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        this.fetchData2(1, 1);
    }

    fetchData() {
        fetch(getUrl('beauty', null))
            .then((response) => response.json())
            .then(
                (responseData) => {
                    let itemData = responseData.showapi_res_body.data;
                    // console.log('itemData=', itemData);
                    let titleData = [...itemData];
                    let idData = new Set();
                    itemData.forEach((item) => {
                        idData.add(item.id)
                    });
                    let idData2 = Array.from(idData);
                    // console.log('idData2=', idData2);
                    this.setState({
                        typeList: titleData,
                        typeIds: idData2,
                        currentId: idData2[0]//对currentId赋值，默认为分类的第一项
                    });
                }
            ).catch(function (e) {
            Alert.alert(e);
        })
            .done()
    }

    render() {
        return (
            <View style={{flex: 1}}>
                < StatusBar backgroundColor='#3e9ce9'/>
                <Header title="美女图集" onPress={() => this._onMenuPress()}/>
                <ScrollableTabView
                    renderTabBar={() =>
                        <DefaultTabBar tabStyle={styles.tab} textStyle={styles.tabText}/>
                    }
                    tabBarPosition='top'
                    tabBarBackgroundColor="#fcfcfc"
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    tabBarActiveTextColor="#3e9ce9"
                    tabBarInactiveTextColor="#aaaaaa"
                    onChangeTab={(obj) => {
                        let currentId = obj.i + 1;
                        console.log('currentId:' + currentId);
                        this.setState({
                            dataArray: [],
                            loaded: false,
                        })
                        this.fetchData2(currentId, 1);
                    }}
                >
                    {this.state.typeIds.map((id) => {
                        let name = '';
                        if (this.state.typeList === null) {
                            return null;
                        }
                        for (let i = 0, l = this.state.typeList.length; i < l; i++) {
                            if (id === this.state.typeList[i].id) {
                                name = this.state.typeList[i].title;
                                break;
                            }
                        }

                        return (
                            <View key={id} tabLabel={name} style={{flex: 1}}>
                                {this.renderContent()}
                            </View>
                        );
                    })}
                </ScrollableTabView>
            </View>
        );
    }

    renderContent() {
        if (!this.state.loaded) {
            return <LoadingView title='美女图集'/>
        }
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <AnimatedList
                    data={this.state.dataArray}
                    renderItem={this.renderGirls}
                    keyExtractor={this._keyExtractor}
                    numColumns={2}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.fetchData2(this.state.currentId, 1);
                    }}
                    ListFooterComponent={this._renderFooter}
                    onEndReachedThreshold={0.01}
                    onEndReached={() => {
                        this.setState({isLoadMore: true});
                        this.fetchData2(this.state.currentId, this.state.currentPage + 1);
                    }}
                />
            </View>
        );
    }

    renderGirls({item}) {
        return (
            <TouchableOpacity onPress={() => this._onPress(item.value)} style={{flex: 1}}>
                <View style={styles.containerItem}>
                    <Image style={styles.itemImg} source={{uri: item.value.imgurl}} />
                    <View style={styles.ItemRightContent}>
                        <Text numberOfLines={3} style={styles.Title}>{item.value.title}</Text>
                        <View style={styles.ItemRightBottom}>
                            <Text style={styles.userName}>
                                数量：{item.value.imgcount}
                            </Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }

    fetchData2(currentId, currentPage) {
        console.log('图片类别:', '当前分类:' + currentId + ',当前页:' + currentPage);
        fetch(getUrl('beauty', currentId) + currentPage)
            .then((response) => response.json())
            .then(
                (responseData) => {
                    let data = responseData.showapi_res_body.data;
                    if (currentPage === 1) {
                        dataBlob = [];
                        let i = 0;
                        data.map(function (item) {
                            dataBlob.push({
                                key: i,
                                value: item,
                            })
                            i++;
                        });

                    } else {
                        let n = dataBlob.length;
                        data.map(function (item) {
                            dataBlob.push({
                                key: n,
                                value: item,
                            })
                            n++;
                        });
                        this.setState({isLoadMore: false})
                    }
                    data = null;
                    this.setState({
                        //复制数据源
                        loaded: true,
                        dataArray: dataBlob,
                        currentPage: currentPage,
                        currentId: currentId
                    });
                    console.log('dataBlob', dataBlob);
                }
            ).catch(function (e) {
            Alert.alert(e);
        })
            .done()
    }

    //此函数用于为给定的item生成一个不重复的key
    //若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标index。
    _keyExtractor = (item, index) => index;

    _onMenuPress() {
        const {navigate} = this.props.navigation;
        navigate('DrawerOpen');
    };

    _onPress(images) {
        const {navigate} = this.props.navigation;
        navigate('Images', {images});
    }

    _renderFooter = () => {
        if (this.state.isLoadMore) {
            return (
                <LoadingMoreView/>
            );
        }
        return <View />;
    }
}

const styles = StyleSheet.create({
    tabText: {
        fontSize: 16
    },
    tabBarUnderline: {
        backgroundColor: '#3e9ce9',
        height: 2
    },
    containerItem: {
        height: 200,
        padding: 10,
        borderBottomColor: '#ddd',
        borderRightColor: '#ddd',
        borderBottomWidth: 0.5,
        borderRightWidth: 0.5,
        alignItems: 'center'
    },
    Title: {
        fontSize: 14,
        textAlign: 'left',
        color: 'black',
        marginTop: 5
    },
    itemImg: {
        width: 132,
        height: 99,
        marginRight: 10,
        borderRadius: 5,
        borderWidth: 1,
    },
    ItemRightContent: {
        flex: 1,
        flexDirection: 'column',
    },
    ItemRightBottom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    userName: {
        fontSize: 14,
        color: '#87CEFA',
    }
});


export default BeautyAtlas;

