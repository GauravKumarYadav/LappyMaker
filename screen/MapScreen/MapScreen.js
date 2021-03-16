import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AuthContext } from '../../navigator/AuthProvider';
import MapView, { Marker, AnimatedRegion, Polyline, } from 'react-native-maps';
import * as Location from 'expo-location';
import haversine from 'haversine';

import * as firebase from 'firebase';
import 'firebase/firebase-firestore';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 25.310301779570185;
const LONGITUDE = 83.00606752616515;

const MapScreen = ({ }) => {
    const { user } = useContext(AuthContext);
    const [initialRegion, setInitialRegion] = useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
        error: null,
    });

    const [currentCoords, setCurrentCoords] = useState(null);


    const currentLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setCurrentCoords(location);
        console.log('=>');
        // console.log(location);
        console.log('=>');
    }
    const onUserLocationChange = async () => {
        await currentLocation();
        console.log(currentCoords);
        firebase
            .database()
            .ref('users/' + user.uid)
            .push(currentCoords);
        // firebase.firestore()
        //     .collection('locations').doc(user.uid).collection(user.uid)
        //     .add(currentCoords)
        //     .then(() => {
        //         // console.log('User Updated!');
        //         // Alert.alert(
        //         //     'Profile Updated!',
        //         //     'Your profile has been updated successfully.'
        //         // );
        //     })
    }
    // const ltry = ()=>{
    //     firebase.database().ref('users/' + user.uid).on('value', function(snapshot){
    //         var newData = []
    //         snapshot.forEach(function(data) {
    //           newData.push(data);
    //           console.log(data);
    //         });
    //       })
    // }
    // ltry();

    const getMapRegion = () => ({
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
        latitudeDelta: initialRegion.latitudeDelta,
        longitudeDelta: initialRegion.longitudeDelta
    });

    const calcDistance = newLatLng => {
        const { prevLatLng } = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
    };

    return (
        <View style={styles.container} >
            <MapView
                style={styles.map}
                showsUserLocation={true}
                rotateEnabled={true}
                showsCompass={true}
                followsUserLocation={true}
                loadingEnabled
                initialRegion={getMapRegion()}
                // onUserLocationChange={()=>onUserLocationChange()}
            >
            </MapView>
        </View>
    );
}

export default MapScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', },
    map: { width: wp('100%'), height: hp('100%') },
});