import React from 'react'
import { Text, View } from "react-native"

export const mapObject = (obj)=>{
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

export const renderState = (dataName , dataValue)=>{
  switch (dataName) {
    case 'timestamp': return dataValue && <Text style={{fontSize:25}}>{new Date(dataValue*1000).toString()}</Text>
    case 'isInternetReachable': return <Text 
    style={
      [
        dataValue ? { color: 'blue', backgroundColor:'white'} :
          {color: 'white', backgroundColor:'red'},
        {fontWeight:'bold', fontSize:15}
      ]
    }
    >{dataValue ? 'true':'false'}</Text>
    default:{
      return typeof dataValue === 'object' ?
        mapObject(dataValue)  : <Text>{JSON.stringify(dataValue)}</Text>
    }
  }
}