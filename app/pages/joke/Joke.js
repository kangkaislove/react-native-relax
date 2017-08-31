/**
 * Created by k.k on 2017/8/8.
 */

import React, {Component} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {Alert, Animated, FlatList, StyleSheet, Text, View} from "react-native";
import LoadingView from "../../widget/LoadingView";
import LoadingMoreView from "../../widget/LoadingMoreView";
import getUrl from "./../../utils/url";
import Header from "./../../widget/Header";
const AnimatedList = Animated.createAnimatedComponent(FlatList);
let dataBlob = [];

class Joke extends Component {
    static navigationOptions = {
        // drawerLabel: '段子手',
        // drawerIcon: ({tintColor}) =>
        //     <Icon name="md-list-box" size={25} color={tintColor}/>,
        tabBarLabel:'每日一笑',
        tabBarIcon: ({tintColor}) =>
            <Icon name="md-list-box" size={25} color={tintColor}/>
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
        this.renderJoke = this.renderJoke.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this._onMenuPress= this._onMenuPress.bind(this);
    }

    componentDidMount() {
        this.fetchData(1);
    }

    fetchData(page) {
        console.log('page的值为:' + page);
        fetch(getUrl('joke',null) + page)
            .then((response) => response.json())
            .then(
                (responseData) => {
                    let data = responseData.showapi_res_body.contentlist;
                    console.log(responseData);
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
                    console.log('dataBlob', dataBlob);
                }
            ).catch(function (e) {
            Alert.alert(e);
        })
            .done()
    }

    render() {
        if (!this.state.loaded) {
            return <LoadingView title='每日一笑'/>;
        }
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header title='每日一笑' onPress={() => this._onMenuPress()}/>
                <AnimatedList
                    data={this.state.dataArray}
                    renderItem={this.renderJoke}
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

    renderJoke({item}) {
        return (
            <View style={styles.textItem}>
                <Text style={styles.Title}>{item.value.title}</Text>
                <Text style={styles.Text}>{item.value.text}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color: '#87CEFA', fontSize: 12, paddingLeft: 8}}>来源:每日一笑</Text>
                    <Text style={styles.Time}>发布时间：{item.value.ct}</Text>
                </View>
                <View style={{height: 0.5, backgroundColor: '#999999', marginTop: 8}}/>
            </View>
        );
    }

    _renderFooter = () => {
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
}

const styles = StyleSheet.create({
    textItem: {
        flex: 1,
    },
    Title: {
        fontSize: 14,
        textAlign: 'center',
        paddingLeft: 8,
        marginTop: 10
    },
    Text: {
        fontSize: 16,
        color: 'black',
        padding: 8
    },
    Time: {
        fontSize: 12,
        paddingRight: 8
    }
});

export default Joke;
