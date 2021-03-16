import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const FormButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {marginTop:hp('1.5%'),width: wp('87%'),height: hp('6%'),backgroundColor: '#2e64e5',alignItems: 'center',justifyContent: 'center',borderRadius: wp(4),},
  buttonText: {fontSize: wp('4%'),fontWeight: 'bold',color: '#ffffff',},
});