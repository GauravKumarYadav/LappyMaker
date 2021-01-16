import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Container from '../components/Container';
import SocialLogin from '../components/SocialLogin'
import TextField, { CheckBox } from '../components/Form/TextInput';
import { Button } from 'react-native';

const emailValidator = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase());
}
const passwordValidator = (password) => {
    return (
        true
    );
}
const LoginScreen = ({ }) => {
    const footer = (
        <View style={{ flexDirection: 'column', alignSelf: 'center', width: '80%', bottom:0 }} >
            <SocialLogin />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 35 }} >
                <Text style={{ color: 'white', fontSize: 18 }} >
                    Don't Have an Account ?
                </Text>
                <TouchableOpacity>
                    <Text style={{ paddingLeft: 8, color: '#2793d1', fontSize: 18, }} >
                        Sign Up Here!
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    const loginContent = (
        <View style={{ padding: 24, margin: 12 }} >
            <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 }} >
                Welcome Back
            </Text>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }} >
                <Text
                    style={{ textAlign: 'center', fontSize: 18, fontWeight: '400' }} numberOfLines={2} ellipsizeMode='tail'
                >
                    Use Your Credentials to
                </Text>

                <Text
                    style={{ paddingLeft: 5, textAlign: 'center', fontSize: 18, fontWeight: 'bold' }} numberOfLines={2} ellipsizeMode='tail'
                >
                    Login
                </Text>
            </View>
            <TextField

                {...{
                    iconName: 'mail',
                    placeholder: "Enter Your Email",

                }}
                validator={emailValidator}
            />
            <TextField
                {...{
                    iconName: 'lock',
                    placeholder: "Password",

                }}
                validator={passwordValidator}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 12 }} >
                <CheckBox label="Remember Me" />
                <TouchableOpacity onPress={() => { }} >
                    <Text style={{ color: '#2793d1' }} >
                        Forgot Password ?
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ justifyContent: 'center', width: '50%', alignSelf: 'center', borderRadius: 30, backgroundColor: '#2793d1', height: '10%' }} >
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 'bold', }} >
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <Container  {...{ footer, contentScreen:loginContent}}  />
    );
}

export default LoginScreen;

const styles = StyleSheet.create({

});