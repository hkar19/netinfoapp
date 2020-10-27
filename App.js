/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
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

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {networkState && Object.keys(networkState).map((val,i)=>{
          // return <Text key={i}></Text>
          return (
          <View key={i}>
            <Text style={{fontWeight:"bold"}}>{val}</Text>
            <Text>{JSON.stringify(networkState[val])}</Text>
            <Text/>
          </View>
          )
        })}

      </SafeAreaView>
    </>
  );
};

export default App;
