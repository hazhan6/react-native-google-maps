import React, { useState, useEffect } from 'react';
import { Text, View,Dimensions,StyleSheet,FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  
export default function MySecondPage () {
    const [data, setData] = useState(null);
    useEffect(() => {
        
      }, []);
    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );
    
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                 <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
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