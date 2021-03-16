import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import AntDesign from 'react-native-vector-icons/AntDesign';

const FormInput = ({ labelValue, placeholderText, iconType, ...rest }) => {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <AntDesign name={iconType} size={25} color="#666" />
            </View>
            <TextInput
                value={labelValue}
                style={styles.input}
                numberOfLines={1}
                placeholder={placeholderText}
                placeholderTextColor="#666"
                {...rest}
            />
        </View>
    );
};

export default FormInput;

const styles = StyleSheet.create({
    inputContainer: {marginTop: wp('3%'),width: wp('87%'),height: hp('7%'),borderColor: '#ccc',borderRadius: wp(5),borderWidth: 1,flexDirection: 'row',alignItems: 'center',backgroundColor: '#fff',},
    iconStyle: {height: hp('4%'),justifyContent: 'center',alignItems: 'center',borderRightColor: '#ccc',borderRightWidth: 1,width: wp(12),},
    input: {padding:wp('2%'),flex: 1,fontSize: wp('4%'),color: '#333',justifyContent: 'center',alignItems: 'center',},
});