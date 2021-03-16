import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../screen/Dashboard/HomeScreen';
import ReviewScreen from '../screen/Review/ReviewScreen';
import ProfileScreen from '../screen//Profile/ProfileScreen';
import AddPostScreen from '../screen/Review/AddReview';
import DrawerContent, { DRAWER_WIDTH } from '../screen/Drawer/Drawer';
import MapScreen from '../screen/MapScreen/MapScreen';
import EditProfileScreen from '../screen/Profile/EditProfileScreen';

const ReviewTabStackNav = createStackNavigator();
const MapStackNav = createStackNavigator();
const HomeTabStackNav = createStackNavigator();
const DrawerTabNav = createDrawerNavigator();
const BottomTabNav = createMaterialBottomTabNavigator();
const ProfileStackNav = createStackNavigator();

const ProfileStack =({navigation})=>(
    <ProfileStackNav.Navigator >
        <ProfileStackNav.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
                title: '',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{ marginLeft: 15 }}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                    </View>
                ),
            }}
        />
        <ProfileStackNav.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{
                headerTitle:"Edit Profile",
                headerBackTitleVisible:false,
                headerTitleAlign:'center',
                headerStyle:{
                    backgroundColor:'#fff',
                    shadowColor:'#fff',
                    elevation:0,
                }
            }}
        />
    </ProfileStackNav.Navigator>
);

const MapStack = ({}) =>(
    <MapStackNav.Navigator>
        <MapStackNav.Screen
            name="MapScreen"
            component={MapScreen}

        />
    </MapStackNav.Navigator>
);

const ReviewTabStack = ({ navigation }) => (
    <ReviewTabStackNav.Navigator>
        <ReviewTabStackNav.Screen
            name="Review"
            component={ReviewScreen}
            options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#2e64e5',
                    // fontFamily: 'Kufam-SemiBoldItalic',
                    fontSize: 18
                },
                headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerRight: () => (
                    <View style={{ marginRight: 10 }}>
                        <FontAwesome5.Button
                            name="plus"
                            size={22}
                            backgroundColor="#fff"
                            color="#2e64e5"
                            onPress={() => navigation.navigate('AddPost')}
                        />
                    </View>
                ),
            }}
        />
        <ReviewTabStackNav.Screen
            name="AddPost"
            component={AddPostScreen}
            options={{
                title: '',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#2e64e515',
                    shadowColor: '#2e64e515',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{ marginLeft: 15 }}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                    </View>
                ),
            }}
        />
        <ReviewTabStackNav.Screen
            name="HomeProfile"
            component={ProfileStack}
            options={{
                headerShown:false,
            }}
        />
    </ReviewTabStackNav.Navigator>
);

const HomeTabStack = ({ navigation }) => (
    <HomeTabStackNav.Navigator>
        <HomeTabStackNav.Screen
            name="Home"
            component={HomeScreen}
        />
    </HomeTabStackNav.Navigator>
);

const BottomTab = ({ navigation }) => (
    <BottomTabNav.Navigator
        initialRouteName="Drawer"
        inactiveColor="#ff9933"
        barStyle={{backgroundColor:'#0c0d34'}}
    >
        <BottomTabNav.Screen
            name="HomeStack"
            component={HomeTabStack}
            options={{
                tabBarLabel: 'Home',
                tabBarColor: '#0c0d34',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                        name="home-outline"
                        color={color}
                        size={26}
                    />
                ),
            }}
        />
        <BottomTabNav.Screen
            name="Review"
            component={ReviewTabStack}
            options={{
                // tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons
                        name="create-outline"
                        color={color}
                        size={24}
                    />
                ),
            }}
        />
        <BottomTabNav.Screen
            name="Tack"
            component={MapStack}
            options={{
                // tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons
                        name="navigate-outline"
                        color={color}
                        size={24}
                    />
                ),
            }}
        />

        <BottomTabNav.Screen
            name="Profile"
            component={ProfileStack}
            options={{
                // tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons
                        name="person-outline"
                        color={color}
                        size={24}
                    />
                ),
            }}
        />
    </BottomTabNav.Navigator>
);

const AppStack = () => {
    return (
        <DrawerTabNav.Navigator
            drawerContent={props => <DrawerContent {...props} />}
            drawerStyle={{width:DRAWER_WIDTH}}
        >
            <DrawerTabNav.Screen
                name="MainStack"
                component={BottomTab}
                options={{
                    drawerLabel: 'Home'
                }}
            />
        </DrawerTabNav.Navigator>
    );
}

export default AppStack;