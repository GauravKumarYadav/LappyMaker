import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ActivityIndicator, Alert, RecyclerViewBackedScrollViewComponent } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AuthContext } from '../../navigator/AuthProvider';
import emailJs from 'emailjs-com';
import FormInput from '../../components/Form/FormInput';
import FormButton from '../../components/Form/FormButton';
import FormDropDown from '../../components/Form/FormDropDown';
import { Formik } from 'formik'
import { Picker } from '@react-native-picker/picker';
import { Linking } from 'react-native';
import qs from 'qs';


const HomeScreen = () => {
    const { user } = useContext(AuthContext);
    const [selectedProduct, setSelectedProduct] = useState("iMac");
    const [selectedIssue, setSelectedIssue] = useState("Display/Touch");
    const products = [
        {
            value: "iMac",
            key: 1,
        },
        {
            value: "Macbook Pro",
            key: 2,
        },
        {
            value: "Macbook Air",
            key: 3,
        },
        {
            value: "iPad",
            key: 4,
        },
        {
            value: "Mac Mini",
            key: 5,
        },
        {
            value: "Iphone",
            key: 6,
        },
        {
            value: "Dell",
            key: 7,
        },
        {
            value: "HP",
            key: 8,
        },
        {
            value: "Lenovo",
            key: 9,
        },
        {
            value: "Samgsung",
            key: 10,
        },
        {
            value: "Acer",
            key: 11,
        },
        {
            value: "Compaq",
            key: 12,
        },
        {
            value: "Asus",
            key: 13,
        },
        {
            value: "Allienware",
            key: 14,
        },
        {
            value: "Toshiba",
            key: 15,
        },
        {
            value: "Other",
            key: 16
        }

    ];
    const issues = [
        {
            value: "Display/Touch",
            key: 1
        },
        {
            value: "Battery",
            key: 2
        },
        {
            value: "Dead",
            key: 3
        },
        {
            value: "Camera",
            key: 4
        },
        {
            value: "Charger",
            key: 5
        },
        {
            value: "Liquid Damage",
            key: 6
        },
        {
            value: "Speaker/Earphone",
            key: 7
        },
        {
            value: "Other",
            key: 8
        },
    ];
    // console.log('userObj : ', user);

    const sendEmail = async (to, subject, body, options = {}) => {
        const { cc, bcc } = options;
        let url = `mailto:${to}`;
        // Create email link query
        const query = qs.stringify({
            subject: subject,
            body: body,
            cc: cc,
            bcc: bcc
        });

        if (query.length) {
            url += `?${query}`;
        }

        // check if we can use this link
        const canOpen = await Linking.canOpenURL(url);

        if (!canOpen) {
            throw new Error('Provided URL can not be handled');
        }

        return Linking.openURL(url);

    }
    const submitRequest = async (e) => {
        e.preventDefault();
        console.log({ email, message });
        const response = await fetch("/access", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, message })
        });
        const resData = await response.json();
        if (resData.status === 'success') {
            alert("Message Sent.");
            this.resetForm()
        } else if (resData.status === 'fail') {
            alert("Message failed to send.")
        }
    };

    return (
        <View style={styles.container} >
            <SafeAreaView>
                <Formik
                    initialValues={{ name: '', email: '', phoneNumber: '', product: '', issue: '', problem: '' }}
                    onSubmit={
                        (values, actions) => {
                            setTimeout(() => {
                                actions.setSubmitting(false);
                            }, 1000);
                            sendEmail(
                                'gauravy60@gmail.com',
                                'Requesting Qutote for an issue of '+values.issue + ' in '+values.product+'',
                                'Hello Team ,'+'\n\n'+
                                'I '+values.name+' would appretiate a call from the Team regarding my issue of '+values.issue+' in '+values.product+'\n\n'+
                                'Detailed Problem : '+values.problem +'\n\n'+ 
                                'Contacts : '+'\n'+
                                'Phone Number : ' + values.phoneNumber +'\n'+
                                'Email Address : '+values.email,
                                );
                        }
                    }
                >
                    {
                        formikprops => (
                            <React.Fragment>
                                <FormInput
                                    placeholderText="Full Name"
                                    iconType="user"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={formikprops.handleChange("name")}
                                />
                                <FormInput
                                    placeholderText="Email"
                                    iconType="mail"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={formikprops.handleChange("email")}
                                />
                                <FormInput
                                    placeholderText="Phone Number"
                                    iconType="phone"
                                    keyboardType="numeric"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={formikprops.handleChange("phoneNumber")}
                                />

                                <FormDropDown
                                    items={products}
                                    selectedValue={selectedProduct}
                                    onValueChange={(prod)=>{
                                        formikprops.setFieldValue('product',prod);
                                        setSelectedProduct(prod);
                                    }}
                                />
                                <FormDropDown
                                    items={issues}
                                    selectedValue={selectedIssue}
                                    onValueChange={(issue)=>{
                                        formikprops.setFieldValue('issue',issue);
                                        setSelectedIssue(issue);
                                    }}
                                />

                                <FormInput
                                    placeholderText="Explain your problem"
                                    iconType={null}
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    multiline
                                    numberOflines={3}
                                    onChangeText={formikprops.handleChange("problem")}
                                />

                                {
                                    formikprops.isSubmitting
                                        ? (
                                            <ActivityIndicator />
                                        ) : (
                                            <FormButton
                                                buttonTitle="Request Quote"
                                                onPress={formikprops.handleSubmit}
                                            />
                                        )
                                }

                            </React.Fragment>
                        )
                    }
                </Formik>
            </SafeAreaView>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', },

});