import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import FormInput from '../../components/Form/FormInput';
import FormButton from '../../components/Form/FormButton';
import SocialButton from '../../components/Form/SocialButtons';
import { AuthContext } from '../../navigator/AuthProvider';
import Container from '../../components/Container';

const SignupScreen = ({ navigation }) => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const { register } = useContext(AuthContext);

	const signupContent = (
		<View style={styles.container}>
			<Text style={styles.text}>Create an account</Text>
			<FormInput
				labelValue={email}
				onChangeText={(userEmail) => setEmail(userEmail)}
				placeholderText="Email"
				iconType="user"
				keyboardType="email-address"
				autoCapitalize="none"
				autoCorrect={false}
			/>

			<FormInput
				labelValue={password}
				onChangeText={(userPassword) => setPassword(userPassword)}
				placeholderText="Password"
				iconType="lock"
				secureTextEntry={true}
			/>

			<FormButton
				buttonTitle="Sign Up"
				onPress={() => register(email, password)}
			/>

			<View style={styles.textPrivate}>
				<Text style={styles.color_textPrivate}>
					By registering, you confirm that you accept our{' '}
				</Text>
				<TouchableOpacity onPress={() => alert('Terms Clicked!')}>
					<Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
						Terms of service
          			</Text>
				</TouchableOpacity>
				<Text style={styles.color_textPrivate}> and </Text>
				<Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
					Privacy Policy
        		</Text>
			</View>

			<View>
				<SocialButton
					buttonTitle="Sign Up with Facebook"
					btnType="facebook"
					color="#4867aa"
					backgroundColor="#e6eaf4"
					onPress={() => fbLogin()}
				/>

				<SocialButton
					buttonTitle="Sign Up with Google"
					btnType="google"
					color="#de4d41"
					backgroundColor="#f5e7ea"
					onPress={() => googleLogin()}
				/>
			</View>

			<TouchableOpacity
				style={styles.forgotButton}
				onPress={() => navigation.navigate('Login')}>
				<Text style={styles.navButtonText}>
					Have an account ? Sign In
            </Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<Container {...{ contentScreen: signupContent }} />
	);
};

export default SignupScreen;

const styles = StyleSheet.create({
	container: { justifyContent: 'center', alignItems: 'center', padding:wp('4%'), flex:1},
	text: { fontSize: wp('8%'), margin:wp(5), color: '#051d5f', },
	forgotButton: { marginVertical: wp('8%'), },
    navButtonText: { fontSize: wp('4%'), fontWeight: '500', color: '#2e64e5', },
	textPrivate: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: wp('8%'), justifyContent: 'center', },
	color_textPrivate: { fontSize: wp('2.5%'), fontWeight: '400', color: 'grey', },
});