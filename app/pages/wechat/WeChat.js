/**
 * Created by k.k on 2017/8/8.
 */

import React, {Component} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {Alert, Animated, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {formatStringWithHtml} from "../../utils/FormatUtil";
import LoadingView from "../../widget/LoadingView";
import LoadingMoreView from "../../widget/LoadingMoreView";
import getUrl from "./../../utils/url";
import Header from "./../../widget/Header";
const AnimatedList = Animated.createAnimatedComponent(FlatList);
let dataBlob = [];

class WeChat extends Component {
    static navigationOptions = {
        // drawerLabel: '微信精选',
        // drawerIcon: ({tintColor}) =>
        //     <Icon name="md-ionitron" size={25} color={tintColor}/>,
        tabBarLabel:'微信精选',
        tabBarIcon: ({tintColor}) =>
            <Icon name="md-ionitron" size={25} color={tintColor}/>
    };

    constructor(props) {
        super(props)
        this.state = {
            dataArray: [],
            loaded: false,
            refreshing: false,
            isLoadMore: false,
            page: 1,
        }
        this._onPress = this._onPress.bind(this);
        this.renderWXChoice = this.renderWXChoice.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this._onMenuPress= this._onMenuPress.bind(this);
    }

    componentDidMount() {
    this.fetchData(1);
}

    fetchData(page) {
        console.log('page的值为:' + page);
        fetch(getUrl('wechat',null) + page)
            .then((response) => response.json())
            .then(
                (responseData) => {
                    let data = responseData.showapi_res_body.newslist;
                    if (page === 1) {
                        dataBlob = [];
                        let i = 0;
                        data.map(function (item) {
                            dataBlob.push({
                                key: i,
                                value: item,
                            })
                            i++;
                        });
                        this.setState({refreshing: false});
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
                        dataArray: dataBlob,
                        loaded: true,
                        page: page
                    });
                    console.log('dataBlob',dataBlob);
                }
            ).catch(function (e) {
            Alert.alert(e);
        })
            .done()
    }

    render() {
        if (!this.state.loaded) {
            return <LoadingView title="微信精选"/>
        }
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header title="微信精选" onPress={() => this._onMenuPress()}/>
                <AnimatedList
                    data={this.state.dataArray}
                    renderItem={this.renderWXChoice}
                    ListFooterComponent={this._renderFooter}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.fetchData(1);
                    }}
                    onEndReachedThreshold={0.01}
                    onEndReached={() => {
                        this.setState({isLoadMore: true});
                        this.fetchData(this.state.page + 1);
                    }}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        );
    }

    _onMenuPress(){
        const {navigate} = this.props.navigation;
        navigate('DrawerOpen');
    };

    _renderFooter= () => {
        if (this.state.isLoadMore) {
            return (
              <LoadingMoreView/>
            );
        }
        return <View />;
    }

    //此函数用于为给定的item生成一个不重复的key
    //若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标index。
    _keyExtractor = (item, index) => index;

    _onPress(news) {
        const {navigate} = this.props.navigation;
        navigate('Web', {news});
    }

    renderWXChoice({item}) {
        return (
            <TouchableOpacity onPress={() => this._onPress(item.value)}>
                <View>
                    <View style={styles.containerItem}>
                        <Image style={styles.itemImg} source={{uri: item.value.picUrl}}/>
                        <View style={styles.ItemRightContent}>
                            <Text style={styles.Title}>{formatStringWithHtml(item.value.title)}</Text>
                            <View style={styles.ItemRightBottom}>
                                <Text style={styles.userName}>
                                    {item.value.description}
                                </Text>
                                <Text style={styles.timeAgo}>
                                    {item.value.ctime}
                                </Text>
                            </View>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    containerItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    Title: {
        fontSize: 18,
        textAlign: 'left',
        color: 'black'
    },
    itemImg: {
        width: 88,
        height: 66,
        marginRight: 10,
        borderRadius: 2,
    },
    ItemRightContent: {
        flex: 1,
        flexDirection: 'column'
    },
    ItemRightBottom: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    userName: {
        flex: 1,
        fontSize: 14,
        color: '#87CEFA',
        marginTop: 5,
        marginRight: 5
    },
    timeAgo: {
        fontSize: 14,
        color: '#aaaaaa',
        marginTop: 5
    },
});


export default WeChat;
