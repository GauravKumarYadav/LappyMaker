import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AuthContext } from '../../navigator/AuthProvider';
import MapView, { Marker, AnimatedRegion, Polyline, } from 'react-native-maps';
import * as Location from 'expo-location';
import haversine from 'haversine';
import * as geolib from 'geolib';


import * as firebase from 'firebase';
import 'firebase/firebase-firestore';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 25.310301779570185;
const LONGITUDE = 83.00606752616515;

const MapScreen = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const [initialRegion, setInitialRegion] = useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
        error: null,
    });
    const [prevCoords,setPrevCoords] = useState(
        {
            "coords":  {
              "accuracy": 36.85100173950195,
              "altitude": 16.362026475276277,
              "altitudeAccuracy": 3,
              "heading": 90.34577941894531,
              "latitude": 25.3097871,
              "longitude": 83.0059649,
              "speed": 0.009094871580600739,
            },
            "mocked": false,
            "timestamp": 1616425466000,
          }
    );
    const [currentCoords, setCurrentCoords] = useState(null);


    const currentLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        return await Location.getCurrentPositionAsync({});

    }
    const onUserLocationChange = async () => {
        var newLoc = await currentLocation();

        var dis = geolib.getDistance(
            {latitude: newLoc.coords.latitude,longitude:newLoc.coords.longitude},
            {latitude: prevCoords.coords.latitude,longitude:prevCoords.coords.longitude},
            );
        if(dis > 10){
            console.log(dis,'=>');
            setPrevCoords(newLoc);
            firebase
                .database()
                .ref('users/' + user.uid)
                .push(currentCoords);
        }else{
            console.log('==',dis);
        }
        
        // if (dis > 10){
        //     console.log(currentCoords);
        //     setPrevLatLng(currentCoords)
        //     firebase
        //         .database()
        //         .ref('users/' + user.uid)
        //         .push(currentCoords);
        // }
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

    // const calcDistance = (newLatLng) => {
    //     return haversine(prevLatLng, newLatLng) || 0;
    // };

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