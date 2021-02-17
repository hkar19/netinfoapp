import React from 'react'
import { useState } from 'react';
import { Dimensions, Platform, SafeAreaView, ScrollView , StatusBar, Text, View } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { renderState } from '../renderFunctions';
// Text
// View
const Data = ({connectionStates}) => {

  // useState
  const [screenHeight, setScreenHeight] = useState(0)
  // const [contentSize, setContentSize] = useState(``)

  const mapStates = ()=>{
    // console.log({length: connectionStates.length});
    return connectionStates
      .filter(val=>Object.keys(val).length !== 0)
      .sort((a,b)=>b.timestamp-a.timestamp)
      .map((networkState = {})=>{
      // const keys = Object.keys(networkState)
      // if(!networkState) return null;
      const copy = {...networkState}
      // console.log(copy);
      const { timestamp, isInternetReachable, ...restStates} = networkState;
      const orderedKeys = [
        'timestamp',
        'isInternetReachable',
        ...Object.keys(restStates)
      ]
      return (
        <View 
          key={timestamp}
          style={{
            margin: 10,
            padding: 10,
            backgroundColor: '#aaa',
            borderRadius: 15
          }}
        >
          {networkState && orderedKeys.map((val,i)=>{
            return copy[val] !== undefined ? (
            <View key={val}>
              {<Text style={{fontWeight:"bold"}}>{val}</Text>}
              {
                renderState(val, copy[val])
              }
              <Text/>
            </View>
            ): null
          })}
        </View>
      )
    })
  }

  return (
    <SafeAreaView style={{
      flex:1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      // flexDirection:
      }}>
      <StatusBar barStyle='dark-content'/>
      <View style={{
        padding:10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: 'grey'
      }}>
        <Text style={{
          fontWeight: 'bold'
        }}>{`Data total: ${connectionStates.filter(obj=>Object.keys(obj).length).length}`}</Text>
      </View>
      <View style={{flex:1}}>
        <ScrollView 
          onContentSizeChange={(w,h)=>{
            setScreenHeight(h)
          }}
          scrollEnabled={true}
          contentContainerStyle={{flexGrow:1}} style={{flex:1}}
          >
          {mapStates()}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default connect(({connectionStates})=>({connectionStates}))(Data);
