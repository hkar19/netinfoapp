import { createStore } from "redux";
import { ADD_CONNECTION_DATA, RE_REDUX } from "./reduxActions";

const initialState = {
  connectionStates : [{}],
}

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case ADD_CONNECTION_DATA: {
      let payload = action.payload;
      let indexFound = state.connectionStates.findIndex(({timestamp})=>{
        // console.log({
        //   timestamp,
        //   currentTimestamp : payload.timestamp,
        //   // payload
        // });
        return timestamp === payload.timestamp
      })
      // console.log({isFound : !!foundValue});
      let newConnectionStates = [...state.connectionStates];
      if(indexFound !== -1) newConnectionStates.splice(indexFound,1,payload)
      else newConnectionStates = [...state.connectionStates, payload];
      // if(!!foundValue || !payload.timestamp) return state;
      return {...state, connectionStates: newConnectionStates}
    }
    case RE_REDUX:{
      return initialState;
    }
  
    default: return state;
  }
}

export default createStore(reducer);