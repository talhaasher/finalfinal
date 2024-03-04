// reducerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';


const initialState = {
  AdminOrNot:true,IsLoggedin:true,islogreg: true, 
  calcvalue:"",isRunning:false,elapsedTime:0,
  activeDrags: 0,
  deltaPosition: { x: 100, y: 100 },
  controlledPosition: { x: 400, y: 200 },
  calculatorVisible: false,
  todoListVisible: false,
  stopWatchVisible: false,
  userinfo:{UserId:null,Handle:"",FirstName:"",LastName:"",Email:""
  ,Bio:"",Tweet:{},Following:[],Follower:[],FollowerCount:0,FollowingCount:0},
  Password:"",ConfirmPassword:"",AllTweets:{},ErrorMessages:[],
};


const reducerSlice = createSlice({
  name: 'reducer',
  initialState,
  reducers: {
    setAdmin: (state) => { state.AdminOrNot = true;state.IsLoggedin = true; },
    setRegular: (state,action) => {  state.AdminOrNot = false;  state.IsLoggedin = true;},
    setLogRegSwitch: (state) => { state.islogreg = !state.islogreg;  },
    setClear: (state) => { state.isadmin = false; state.IsLoggedin = false; },

    setcalcvalue:(state,action) => {  state.calcvalue = action.payload; },
    setIsRunning:(state,action) => { state.isRunning = action.payload; },
    setElapsedTime:(state,action) => { state.elapsedTime = action.payload; },
    setActiveDrags: (state, action) => { state.activeDrags = action.payload; },
    setDeltaPosition: (state, action) => {  state.deltaPosition = action.payload;},
    setControlledPosition: (state, action) => {  state.controlledPosition = action.payload;},
    setCalculatorVisible: (state, action) => {state.calculatorVisible =  !state.calculatorVisible;},
    setTodoListVisible: (state, action) => {state.todoListVisible = !state.todoListVisible;},
    setStopWatchVisible: (state) => {state.stopWatchVisible = !state.stopWatchVisible; },
    
    setUserId: (state, action) => {         state.userinfo.UserId = action.payload;},
    setHandle: (state, action) => {         state.userinfo.Handle = action.payload;},
    setFirstName: (state, action) => {      state.userinfo.FirstName = action.payload;},
    setLastName: (state, action) => {       state.userinfo.LastName = action.payload;},
    setEmail: (state, action) => {          state.userinfo.Email = action.payload;},
    setBio: (state, action) => {            state.userinfo.Bio = action.payload;},
    setTweet: (state, action) => {          state.userinfo.Tweet = action.payload;},
    setFollowing: (state, action) => {      state.userinfo.Following = action.payload;},
    setFollower: (state, action) => {       state.userinfo.Follower = action.payload;},
    setFollowerCount: (state, action) => {  state.userinfo.FollowerCount = action.payload;},
    setFollowingCount: (state, action) => { state.userinfo.FollowingCount = action.payload;},
    setPassword: (state, action) => {       state.Password = action.payload;},
    setConfirmPassword: (state, action) => {state.ConfirmPassword = action.payload;},
    setAllTweets: (state, action) => {state.ConfirmPassword = action.payload;},
    setErrorMessages: (state, action) => {state.ErrorMessages = action.payload;},
    setPassowrdclear:(state) => { state.Password = ""; state.ConfirmPassword = ""; }
  },
});

export const { 
 setAdmin,setRegular,setLogRegSwitch,setClear
 ,setcalcvalue,setIsRunning,setElapsedTime,setActiveDrags,setDeltaPosition,setControlledPosition,setCalculatorVisible,setTodoListVisible,setStopWatchVisible
 ,setUserId,setFirstName,setLastName,setEmail,setBio,setTweet,setFollowing,setFollower,setFollowerCount,setPassword,setConfirmPassword,setAllTweets,
 setErrorMessages,setPassowrdclear,setHandle
} = reducerSlice.actions;
export default reducerSlice.reducer;

// actions.js
