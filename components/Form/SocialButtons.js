import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SocialButton = ({ buttonTitle, btnType, color, backgroundColor, ...rest }) => {
	let bgColor = backgroundColor;
	return (
		<TouchableOpacity
			style={[styles.buttonContainer, { backgroundColor: bgColor }]}
			{...rest}>
			<View style={styles.iconWrapper}>
				<FontAwesome name={btnType} style={styles.icon} size={22} color={color} />
			</View>
			<View style={styles.btnTxtWrapper}>
				<Text style={[styles.buttonText, { color: color }]}>{buttonTitle}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default SocialButton;

const styles = StyleSheet.create({
	buttonContainer: {marginTop: hp('1%'),width: wp('80%'),height: hp('6%'),padding: wp('2%'),flexDirection: 'row',borderRadius: wp(8),},
	iconWrapper: {width: wp('8%'),justifyContent: 'center',alignItems: 'center'},
	icon: {fontWeight: 'bold',},
	btnTxtWrapper: {flex: 1,justifyContent: 'center',alignItems: 'center',},
	buttonText: {fontSize: wp('4%'),fontWeight: 'bold',},
});