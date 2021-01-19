import React,{useContext} from 'react';
import { StyleSheet, View,Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {AuthContext} from '../../navigator/AuthProvider'
const HomeScreen =()=>{
    const {user} = useContext(AuthContext);
    // console.log('userObj : ', user);
    return(
        <View style={styles.container} >
            <Text>
                HomeScreen
            </Text>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent:'center',alignItems: 'center', backgroundColor: '#fff',  },

});