/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import NetInfo from "@react-native-community/netinfo";

const App = () => {
  const [networkState, setNetworkState] = useState(undefined);

  useEffect(() => {
    const netInfoUnsubscribe = NetInfo.addEventListener(networkState=>{
      console.log("subscribing", networkState)
      setNetworkState(networkState);
    })
    return () => {
      console.log("unsubscribing")
      netInfoUnsubscribe();
    }
  }, [])

  const mapObject = (obj)=>{
    return (
        obj && Object.keys(obj).map(val=>{
          return (
            <View key={val}>
              <Text>{`${val}: ${JSON.stringify(obj[val])}`}</Text>
              {/* <Text>{JSON.stringify(obj[val])}</Text> */}
            </View>
          )
        })
    )
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex:1}}>
        <View style={styles.safeContainer}>
          {networkState && Object.keys(networkState).map((val,i)=>{
            // return <Text key={i}></Text>
            // console.log(typeof )
            return (
            <View key={val}>
              <Text style={{fontWeight:"bold"}}>{val}</Text>
              {typeof networkState[val] ==='object' ?
                mapObject(networkState[val])  : <Text>{JSON.stringify(networkState[val])}</Text>
              }
              <Text/>
            </View>
            )
          })}
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;

const { height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  safeContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: width*5/100,
  }
})