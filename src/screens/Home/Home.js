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
  View,
  Text,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';

import { connect } from 'react-redux';
import { renderState } from '../renderFunctions';

const Home = ({connectionStates}) => {
  // const [networkState, setNetworkState] = useState(undefined);
  const networkState = connectionStates && connectionStates[connectionStates.length -1];
  const { timestamp, ...restStates} = networkState;
  const orderedKeys = [
    'timestamp',
    ...Object.keys(restStates)
  ]

  return (
    <>
      <SafeAreaView style={{
        flex:1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <StatusBar backgroundColor='#fff' barStyle='dark-content'/>
        <View style={styles.safeContainer}>
          {networkState && orderedKeys.map((val,i)=>{
            return (
            <View key={val}>
              <Text style={{fontWeight:"bold"}}>{val}</Text>
              {
                renderState(val, networkState[val])
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

export default connect(({connectionStates})=>({connectionStates}))(Home);

const { height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  safeContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: width*5/100,
  }
})