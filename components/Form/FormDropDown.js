import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FormDropDown = ({ items ,...rest}) => {

    return (
        <View
            style={styles.inputContainer}
        >
            <Picker
            {...rest}
            >
                {
                    items.map(item => {
                        return (<Picker.Item key={item.key} label={item.value} value={item.value} />)
                    })
                }
            </Picker>
        </View>
    );
};

export default FormDropDown;

const styles = StyleSheet.create({
    inputContainer: { marginTop: wp('3%'), width: wp('87%'), height: hp('6%'), borderColor: '#ccc', borderRadius: wp(5), borderWidth: 1, backgroundColor: '#fff',alignSelf:'center' },
});