import React , {useEffect} from 'react'
import { connect, Provider } from 'react-redux'
import reduxStore, { addData, reRedux } from './redux'
import NetInfo from "@react-native-community/netinfo";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Data from './screens/Data';


const Tab = createBottomTabNavigator();

const App = ({addData, reRedux}) => {

  useEffect(() => {
    const netInfoUnsubscribe = NetInfo.addEventListener(networkState=>{
      console.log("subscribing", networkState)
      // setNetworkState(networkState);
      let stateWithTime = {
        ...networkState,
        timestamp:  Math.floor(new Date().getTime()/1000)
      }
      addData(stateWithTime)
    })
    return () => {
      console.log("unsubscribing")
      netInfoUnsubscribe();
      reRedux();
    }
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator
        // screenOptions={({route})=>({
        //   tab
        // })}
        tabBarOptions={{
          activeBackgroundColor: '#696969',
          activeTintColor: 'white',
          inactiveBackgroundColor: 'white',
          inactiveTintColor: 'black',
          tabStyle:{
            justifyContent:'center', 
            // backgroundColor:'blue', 
            margin:5,
            borderRadius: 15
          },
          labelStyle:{fontSize: 20, fontWeight:'bold'}
        }}
      >
        <Tab.Screen name="Current" component={Home}/>
        <Tab.Screen name="History" component={Data}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const AppWrapped = ()=>{

  // let stateToProp
  let dispatchFunctions = {
    addData: addData,
    reRedux: reRedux,
  }

  let AppConnected = connect(null, dispatchFunctions)(App)

  return  <Provider store={reduxStore}>
            <AppConnected/>
          </Provider>
}

export default AppWrapped;
