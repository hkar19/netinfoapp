export const ADD_CONNECTION_DATA = 'ADD_CONNECTION_DATA';
export const RE_REDUX = 'RE_REDUX';

export const addData = (data = {})=>{
  if(!data) return;
  return {type: ADD_CONNECTION_DATA, payload: data}
}

export const reRedux = ()=>{
  return {type: RE_REDUX};
}