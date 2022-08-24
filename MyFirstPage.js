import React, { useState, useEffect } from 'react';
import { Text, View,Dimensions,StyleSheet,Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyFirstPage () {
    const [location, setLocation] = useState({"coords": {"accuracy": 20, "altitude": 0, "altitudeAccuracy": 0, "heading": 0, "latitude": 37.4219983, "longitude": -122.084, "speed": 0}, "mocked": false, "timestamp": 1661259628000});
    const [errorMsg, setErrorMsg] = useState(null);
    const [konum, setKonum] = useState(null)
    const [saat, setSaat] = useState(null)

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
        console.log("location",location)
        setLocation(location);
        let myKonum = "Latitude " + location.coords.latitude.toString() + " Longitude " + location.coords.longitude.toString()
        setKonum(myKonum)
        setSaat("Time:"+location.timestamp)
        console.log("LO",location)
      })();
    }, []);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }

    const pressButton = async () => {
        let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
        setLocation(location)
        Alert.alert('Konum Ekle',konum)
    }

    return <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                <MapView style={styles.map} 
                    initialRegion={{
                    latitude: 37.4219983, 
                    longitude: -122.084,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}>
                    <Marker
                        coordinate={{latitude:37.4219983, 
                            longitude: -122.084}}
                    >
                    </Marker>
                </MapView>
                <Button
                    style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                        onPress={pressButton}
                        title="Konum Ekle"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button">
                </Button>
                <Text>{konum}</Text>
                <Text>{saat}</Text>
            </View>       
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });