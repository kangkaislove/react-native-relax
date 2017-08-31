/**
 * Created by k.k on 2017/8/7.
 */

import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, TouchableNativeFeedback, View} from "react-native";
import getUrl from "./../../utils/url";
import Swiper from "react-native-swiper";

class AboutMe extends Component {
    static navigationOptions = {
        headerTitle: '图片详情',
    }

    constructor(props) {
        super(props)
        this.state = {
            banners: [],
            swiperShow:false,
        }
        this._onSwiperClick=this._onSwiperClick.bind(this);
    }

    componentDidMount() {
        this.fetchImages();
    }

    fetchImages() {
        const {params} = this.props.navigation.state;
        console.log('当前图片集类型ID:', params.images.id)
        fetch(getUrl('imgDetail', null) + params.images.id)
            .then((response) => response.json())
            .then(
                (responseData) => {
                    let data = responseData.showapi_res_body.data;
                    console.log('data', data);
                    let imgsData = Array.from(data);
                    this.setState({
                        banners: imgsData,
                        swiperShow:true
                    });
                }
            )
            .catch(function (e) {

            })
            .done()
    }

    render() {
        let sliderImgs=this.state.banners;
        if(this.state.swiperShow){
            return (
                <View style={styles.swiperBox}>
                    < StatusBar backgroundColor='#3e9ce9'/>
                    <Swiper style={styles.wrapper} loop={true} index={0}  height={150}>
                        {sliderImgs.map((item, i) => {
                            return(
                                <TouchableNativeFeedback key={i} onPress={() => this._onSwiperClick()}>
                                    <Image key={i} source={{uri:sliderImgs[i]}}  style={styles.swiperImg}/>
                                </TouchableNativeFeedback>
                            );
                        })}
                    </Swiper>
                </View>
            );
        }else{
            return (
                    <View/>
            );
        }
    }

    _onSwiperClick(){
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    swiperBox: {
        flex: 1
    },
    swiperContentBox: {
        flex: 1
    },
    swiperImg: {
        width: '100%',
        height: '100%'
    },
    wrapper: {
        flex: 1
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    page: {
        flex: 1,
        backgroundColor:'black'
    },
    header: {
        flexDirection: 'row',
        height: 40,
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginLeft: 15
    }
});

export default AboutMe;
