// reducerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';


const initialState = {
  // login
  IsAdminOrnot: false, isloggedin: false, islogreg: false,  
// admin login + regular login
  oldemail: "", newemail: "",email:"",password:"",confirmPassword: "",errorMessages:"",
  
  userData:{},userID:null,
  userInfo:{name: "",Firstname: undefined,Lastname: undefined,followers: 0,followings: 0,
  bio: "",handle:"",userid:null},

  confirmationState: false,  



};

const reducerSlice = createSlice({
  name: 'reducer',
  initialState,
  reducers: {
    setAdmin: (state) => { state.IsAdminOrnot = true;state.isloggedin = true; },
    setRegular: (state) => {  state.IsAdminOrnot = false;  state.isloggedin = true;},
    setLogRegSwitch: (state) => { state.islogreg = !state.islogreg;  },
    setClear: (state) => { state.isadmin = false; state.isloggedin = false; state.isnotregadmin = true; },

    setName: (state,action) => { state.name = action.payload; },
    setEmail: (state,action) => {state.email  = action.payload;},
    setPassword: (state,action) => {  state.password = action.payload; }, 
    setConfirmPassword: (state,action) => { state.confirmPassword = action.payload; },    
    setErrorMessages: (state,action) => {state.errorMessages = action.payload;  },

    setLoggedIn: (state) => {state.isloggedin = !state.isloggedin;  },
    setUserData: (state,action) => {state.userData = action.payload;  },
    setUserID: (state,action) => {state.userID = action.payload;  },

    setUserInfo: (state,action) => {state.userID = action.payload;  },
    setConfirmationState: (state, action) => {state.confirmationState = action.payload; },
    setFirstname: (state, action) => {  state.Firstname = action.payload;  },
    setLastname: (state, action) => { state.Lastname = action.payload; },
   
    setOldEmail: (state, action) => { state.oldemail = action.payload; },
    setNewEmail: (state, action) => { state.newemail = action.payload; },
    setOldNumber: (state, action) => { state.oldnumber = action.payload; },
    setNewNumber: (state, action) => { state.newnumber = action.payload; },

  },
});

export const { setAdmin, setRegular, setLogRegSwitch, setClear,
  setName, setEmail, setPassword, setConfirmPassword, setErrorMessages,
  setLoggedIn,setUserData,setUserID,setUserInfo,
  setConfirmationState,setFirstname, setLastname, setOldPassword,  setNewPassword, setOldEmail, setNewEmail, setOldNumber, setNewNumber,

 } = reducerSlice.actions;
export default reducerSlice.reducer;

// actions.js
