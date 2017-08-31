import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';

 class CustomButton extends Component {

    //构造函数
    constructor(props) {
        super(props)
        this.state = {status: 1};
    }

    render() {
        //解构
        const {text,beijingyanse} =this.props;
        return (
            <View style={styles.Container}>
                <TouchableOpacity
                    style={[styles.button,{backgroundColor:beijingyanse}]}
                    onPress={this.props.onPress}
                >
                    <Text style={styles.buttonText}>{this.props.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex:1,
        backgroundColor: '#F5FCFF',
        marginLeft:10
    },
    button: {
        flex:1,
        backgroundColor: 'green',
        justifyContent:'center'
    },
    buttonText: {
        color:'black',
        fontSize: 18,
    },
});
export default CustomButton;
