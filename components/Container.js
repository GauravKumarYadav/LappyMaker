import React from 'react';
import { View, StyleSheet, StatusBar, Image,  } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const assets = [
    require('../assets/Images/LoginScreen/1.jpg'),
];

const Container = ({ contentScreen }) => {
    return (
        <View style={styles.container} >
            <StatusBar barStyle='light-content' />
            <View style={styles.topLeftCurve} >
                <View style={styles.headerWrapper} >
                    <Image source={assets[0]} style={styles.bgImage}/>
                </View>
            </View>
            <View style={{ flex: 1, overflow: 'hidden' }}  >
                <Image source={assets[0]} style={styles.bgImage} />
                <View style={styles.contentWrapper} >
                    {contentScreen}
                </View>
            </View>
        </View>
    );
}

export default Container;

const styles = StyleSheet.create({
    container:{ flex: 1, backgroundColor: '#0c0d34' },
    topLeftCurve:{ backgroundColor: 'white', },
    headerWrapper:{borderBottomLeftRadius: wp(25),overflow: 'hidden',height:hp(20)},
    bgImage:{width:wp('100%'),height:hp(28),position:'absolute'},
    contentWrapper:{ flex: 1, position:'absolute',justifyContent:'center',alignContent:'center',backgroundColor: 'white', borderRadius: wp(25), borderTopLeftRadius: 0,width:wp('100%'),height:hp('80%')}
});