import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import DrawerItem from '../Drawer/DrawerItem';
import { Avatar } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../navigator/AuthProvider'

const { width } = Dimensions.get('window');
const aspectRatio = 2579 / 3435;
const assets = [
    require('../../assets/Images/LoginScreen/1.jpg'),
];
export const DRAWER_WIDTH = width * 0.7
const height = width * aspectRatio;

const items = [
    {
        icon: "home-outline",
        label: "Home",
        screen: "Home",
        color: "red",
        key: 1,
    },
    {
        icon: "create-outline",
        label: "Review",
        screen: "Review",
        color: "violet",
        key: 2,
    },
    {
        icon: "person-outline",
        label: "Profile",
        screen: "Profile",
        color: "black",
        key: 3,
    },
];

const DrawerContent = (props) => {
    const { user } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <View style={styles.header} >
                    <Ionicons name="close-outline" size={30} color="white" style={styles.closeIcon} onPress={() => props.navigation.closeDrawer()} />
                </View>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.topLeftCurve} />
                <Image source={assets[0]} style={styles.bgImage} />
                <View style={styles.contentWrapper}>
                    <Avatar
                        size="xlarge"
                        source={{
                            uri:
                                user.photoURL,
                        }}
                        rounded
                        // onPress={() => console.log("Works!")}
                        imageProps={{ resizeMode: 'cover' }}
                        activeOpacity={0.7}
                        avatarStyle={styles.avatarStyle}
                        containerStyle={styles.avatarContainerStyle}
                    />
                    <View style={styles.profileTextWrapper} >
                        <Text style={styles.profileHeadingText} >
                            {user.displayName}
                        </Text>
                        <Text style={styles.profileBodyText} >
                            {user.email}
                        </Text>
                    </View>
                    {
                        items.map(item => (
                            <TouchableOpacity
                                key={item.key}
                                onPress={() => props.navigation.navigate(item.screen)}
                            >
                                <DrawerItem
                                    key={item.key}
                                    {...item}
                                />
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
            <View style={styles.footerWrapper} >
                <Image source={assets[0]} style={styles.bgImage} />
            </View>
        </View>
    );
}

export default DrawerContent;

const styles = StyleSheet.create({
    container: { flex: 1 },
    headerWrapper: { flex: 0.2, backgroundColor: "white", },
    header: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: wp(25), backgroundColor: '#0c0d34', },
    closeIcon: { position: 'absolute', top: wp('3%'), left: wp('3%'), right: 0, bottom: 0, },
    contentContainer: { flex: 0.8 },
    topLeftCurve: { flex: 1, backgroundColor: '#0c0d34', },
    bgImage: { top: 0, left: 0, right: 0, bottom: 0, borderTopLeftRadius: wp(25), width: wp(70), },
    contentWrapper: { position: 'absolute', justifyContent: 'center', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'white', borderTopLeftRadius: wp(25), borderBottomRightRadius: wp(25) },
    avatarStyle: {},
    avatarContainerStyle: { alignSelf: 'center', height: hp(15), width: hp(15), position: 'absolute', top: hp(-8) },
    profileTextWrapper: { position: 'absolute', top: wp('7%'), padding: hp('2%'), marginTop: hp('3%'), alignSelf: 'center' },
    profileHeadingText: { fontSize: wp('6%'), color: '#0c0d34', textAlign: 'center' },
    profileBodyText: { fontSize: wp('3%'), color: '#0c0d34', textAlign: 'center' },
    footerWrapper: { flex: 0.2, backgroundColor: "white", },
});