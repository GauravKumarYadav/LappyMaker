import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AuthContext } from '../../navigator/AuthProvider';
import MapView, { Marker, AnimatedRegion, Polyline, } from 'react-native-maps';
import * as Location from 'expo-location';
import haversine from 'haversine';

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
    const [currentPosition, setCurrentPosition] = useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        routeCoordinates: [],
        distanceTravelled: 0,
        prevLatLng: {},
        coordinate: new AnimatedRegion({
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: 0,
            longitudeDelta: 0
        })
    });

    useEffect(() => {
        const locationPermission = async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }
            let gpsServiceStatus = await Location.hasServicesEnabledAsync();
            if (gpsServiceStatus) {
                let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
                let region = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    error: null,
                }
                setInitialRegion(region)
                console.log(location);
            }
            // currentPosition.coordinate.timing()
        };
        locationPermission();
    }, []);


    const currentLocation = () => {
        return (
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let currPos = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null,
                    };
                    setCurrentPosition(currPos);
                }, (error) => console.log(error.message),
                { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
            )
        );
    };

    const getMapRegion = () => ({
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
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
            >
                <Polyline coordinates={currentPosition.routeCoordinates} strokeWidth={5} />
                <Marker.Animated 
                    ref={marker => { this.marker = marker } }
                    coordinate={{ latitude: currentPosition.latitude, longitude: currentPosition.longitude }} />
            </MapView>
        </View>
    );
}

export default MapScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', },
    map: { width: wp('100%'), height: hp('100%') },
});