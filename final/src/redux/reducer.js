// reducerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import { getDatabase, ref, set } from 'firebase/database';


const initialState = {
  AdminOrNot:false,IsLoggedin:false,islogreg: true, 
  calcvalue:"",isRunning:false,elapsedTime:0,
  activeDrags: 0,
  deltaPosition: { x: 100, y: 100 },
  controlledPosition: { x: 400, y: 200 },
  calculatorVisible: false,
  todoListVisible: false,
  stopWatchVisible: false,UserId:null,
  userinfo:{Handle:"",FirstName:"",LastName:"",Email:""
  ,Bio:"",tweets:[],Following:[],Follower:[],FollowerCount:0,FollowingCount:0},
  Password:"",ConfirmPassword:"",Alltweets:[],ErrorMessages:[],confirmationState:false,
newemail:"",resetpas:"",
newtweet:{NT:"",ND:"",Date:"",like:0},AcCPrivate:false,
searchTerm:"",filteredTweets:[],usersearchTerm:"",filtereduser:[],
};


const reducerSlice = createSlice({
  name: 'reducer',
  initialState,
  reducers: {
    setAdmin: (state) => { state.AdminOrNot = true;state.IsLoggedin = true; },
    setRegular: (state,action) => {  state.AdminOrNot = false;  state.IsLoggedin = true;},
    setLogRegSwitch: (state) => { state.islogreg = !state.islogreg;  },
    setClear:  (state) => {
      state.AdminOrNot = false;
      state.IsLoggedin = false;
      state.islogreg = true;
      state.calcvalue = "";
      state.isRunning = false;
      state.elapsedTime = 0;
      state.activeDrags = 0;
      state.deltaPosition = { x: 100, y: 100 };
      state.controlledPosition = { x: 400, y: 200 };
      state.calculatorVisible = false;
      state.todoListVisible = false;
      state.stopWatchVisible = false;
      state.UserId = null;
      state.userinfo = {
        Handle: "",
        FirstName: "",
        LastName: "",
        Email: "",
        Bio: "",
        Tweet: {},
        Following: [],
        Follower: [],
        FollowerCount: 0,
        FollowingCount: 0,
      };
      state.Password = "";
      state.ConfirmPassword = "";
      state.AllTweets = [];
      state.ErrorMessages = [];
      state.confirmationState = false;
      state.newemail = "";
    },
    setSearchTerm:(state,action) => {  state.searchTerm = action.payload; },
    setFilteredTweets:(state,action) => {  state.filteredTweets = action.payload; },
    setusersearchTerm:(state,action) => {  state.usersearchTerm = action.payload; },
    setfiltereduser:(state,action) => {  state.filtereduser = action.payload; },

    setcalcvalue:(state,action) => {  state.calcvalue = action.payload; },
    setIsRunning:(state,action) => { state.isRunning = action.payload; },
    setElapsedTime:(state,action) => { state.elapsedTime = action.payload; },
    setActiveDrags: (state, action) => { state.activeDrags = action.payload; },
    setDeltaPosition: (state, action) => {  state.deltaPosition = action.payload;},
    setControlledPosition: (state, action) => {  state.controlledPosition = action.payload;},
    setCalculatorVisible: (state, action) => {state.calculatorVisible =  !state.calculatorVisible;},
    setTodoListVisible: (state, action) => {state.todoListVisible = !state.todoListVisible;},
    setStopWatchVisible: (state) => {state.stopWatchVisible = !state.stopWatchVisible; },

    
    setUserId: (state, action) => {         state.UserId = action.payload;},
    setHandle: (state, action) => {         state.userinfo.Handle = action.payload;},
    setFirstName: (state, action) => {      state.userinfo.FirstName = action.payload;},
    setLastName: (state, action) => {       state.userinfo.LastName = action.payload;},
    setEmail: (state, action) => {          state.userinfo.Email = action.payload;},
    setBio: (state, action) => {            state.userinfo.Bio = action.payload;},
    setTweet: (state, action) => {          state.userinfo.tweets = action.payload;},
    setFollowing: (state, action) => {      state.userinfo.Following = action.payload;},
    setFollower: (state, action) => {       state.userinfo.Follower = action.payload;},
    setFollowerCount: (state, action) => {  state.userinfo.FollowerCount = action.payload;},
    setFollowingCount: (state, action) => { state.userinfo.FollowingCount = action.payload;},
    setPassword: (state, action) => {       state.Password = action.payload;},
    setConfirmPassword: (state, action) => {state.ConfirmPassword = action.payload;},
    setnewemail: (state, action) => {state.newemail = action.payload;},
    setemailclear:(state) => { state.oldemail = ""; state.newemail = ""; },
    setAllTweets: (state, action) => {state.ConfirmPassword = action.payload;},
    setErrorMessages: (state, action) => {state.ErrorMessages = action.payload;},
    setPassowrdclear:(state) => { state.Password = ""; state.ConfirmPassword = ""; },
    setUserInfo:(state, action) => { state.userinfo = action.payload;},
       setresetpas: (state, action) => { state.resetpas = action.payload;},
       setconfirmationState: (state, action) => { state.confirmationState = action.payload;},
       setNTT: (state, action) => { state.newtweet.NT = action.payload;},
       setNTD: (state, action) => { state.newtweet.ND = action.payload;},
       setTweetdDate: (state, action) => { state.newtweet.Date = action.payload;},
       setnewtweetclear:(state) => { state.newtweet.NT = "";state.newtweet.ND ="";state.newtweet.Date ="";state.newtweet.like =0;},
       setIsLoggedin:(state) => { state.IsLoggedin = true; },
  },
});

export const { 
 setAdmin,setRegular,setLogRegSwitch,setClear
 ,setcalcvalue,setIsRunning,setElapsedTime,setActiveDrags,setDeltaPosition,setControlledPosition,setCalculatorVisible,setTodoListVisible,setStopWatchVisible
 ,setUserId,setFirstName,setLastName,setEmail,setBio,setTweet,setFollowing,setFollower,setFollowerCount,setPassword,setConfirmPassword,setAllTweets,
 setErrorMessages,setPassowrdclear,setHandle,setUserInfo,setconfirmationState,setnewemail,setemailclear,setFilteredTweets,setSearchTerm,setfiltereduser,setusersearchTerm
,setresetpas,setNTT,setNTD,setTweetdDate,setnewtweetclear,removeTweet,setIsLoggedin
} = reducerSlice.actions;
export default reducerSlice.reducer;

// actions.js
