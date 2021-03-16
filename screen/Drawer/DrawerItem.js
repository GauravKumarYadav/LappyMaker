import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const DrawerItem = (item) => {
    return (
            <View style={styles.container} >
                <View style={{ width: wp('10%'), height: wp('10%'), justifyContent: 'center', alignItems: 'center', borderRadius: wp('5%'), borderColor: 'rgb(170, 207, 202)', backgroundColor: item.color }}>
                    <Ionicons name={item.icon} color='white' size={wp('5%')} />
                </View>
                <Text style={styles.textWrapper}>
                    {item.label}
                </Text>
            </View>
    );
}

export default DrawerItem;

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', paddingTop: hp('2%'), marginLeft: wp('15%') },
    textWrapper: { color: 'black', margin: wp('3%'), fontWeight: 'bold', fontSize: wp('4%') },
});