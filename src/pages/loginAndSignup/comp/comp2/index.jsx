import { useDispatch, useSelector } from 'react-redux';
import classes from './index.module.css';
import React, { useEffect } from 'react'
import { setConfirmPassword, setEmail, setErrorMessages, setFirstName, setHandle, setLastName, setPassword ,setUserId} from '../../../../redux/reducer';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import logo from "../../../../assets/translogo.svg";
import { auth } from '../../../../firebase';

function Signup({registerState}) {
  const dispatch = useDispatch();

  const userinfo = useSelector((state) => state.reducer.userinfo);

 
  const Password = useSelector((state) => state.reducer.Password);
  const ConfirmPassword = useSelector((state) => state.reducer.ConfirmPassword);
  const ErrorMessages = useSelector((state) => state.reducer.ErrorMessages);
  const Registerbutton = async (e) => {
    e.preventDefault();
    const updatedErrorMessages = [];

    if (!(userinfo.Email).trim()) {
      updatedErrorMessages.push("You must enter an email.");
    }
    if (!Password) {
      updatedErrorMessages.push("You must enter a password.");
    }
    if (!ConfirmPassword) {
      updatedErrorMessages.push("You must enter a confirmation password.");
    }
    if (Password !== ConfirmPassword) {
      updatedErrorMessages.push("Passwords didn't match.");
    }

    dispatch(setErrorMessages(updatedErrorMessages));

    if (updatedErrorMessages.length === 0) {
      try {
        const user = await createUserWithEmailAndPassword(auth, userinfo.Email, Password);
        const db = getDatabase();
        dispatch(setUserId(user.user.uid)); 
        await set(ref(db, "users/" + user.user.uid), {
          Handle:userinfo.Handle,FirstName:userinfo.FirstName,LastName:userinfo.LastName,Email:userinfo.Email
  ,Bio:userinfo.Bio,Tweet:userinfo.tweets,Following:userinfo.Following,Follower:userinfo.Follower,FollowerCount:userinfo.FollowerCount,FollowingCount:userinfo.FollowingCount
        })
        console.log("Database updated");
          
        
      } catch (error) {
        console.error("Signup Error:", error);
        // Handle specific error codes if needed
      }
      
    } else {
      // Handle the case when there are error messages
      console.log("Error messages:", updatedErrorMessages);
    }
  };

  
  useEffect (()=>{

      onAuthStateChanged(auth, (user) => {
          if (user) {
            dispatch(setUserId(user.uid)); 
            dispatch(setPassowrdclear())
            dispatch(setRegular());
     
                } 
        });
 
  }, [])

  return (
    <>
      <div className={classes.reg}>
        <center className={classes.logCenter}>
          <img className={classes.logo} src={logo} alt="" />
        </center>
        <h1 className={classes.regtext}>Registration</h1>
        {ErrorMessages.length > 0 && (
          <div>
            {ErrorMessages.map((errorMessages, index) => (
              <p key={index} className={classes.error}>
                {errorMessages}
              </p>
            ))}
          </div>
        )}
        <form onSubmit={Registerbutton} className={classes.reg_form}>
        <input
            className={classes.reginput_field}
            value={userinfo.FirstName}
            onChange={(e) => dispatch(setFirstName(e.target.value))}
            type="text "
            placeholder="first name"
          />
          <input
            className={classes.reginput_field}
            value={userinfo.LastName}
            onChange={(e) => dispatch(setLastName(e.target.value))}
            type="text "
            placeholder="last name"
          />
          <input
            className={classes.reginput_field}
            value={userinfo.Handle}
            onChange={(e) => dispatch(setHandle(e.target.value))}
            type="text "
            placeholder="Handle"
          />
        <input
            value={userinfo.Email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            className={classes.reginput_field}
            type="email"
            placeholder="Email"
          />
          <input
            className={classes.reginput_field}
            value={Password}
            onChange={(e) =>dispatch(setPassword(e.target.value))}
            type="password"
            placeholder="Your password"
          />
          <input
            className={classes.reginput_field}
            value={ConfirmPassword}
            onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
            type="password"
            placeholder="Confirm password"
          />
          <input className={classes.submission} type="submit" value="Register" />
        </form>
        <p className={classes.pLogReg}>
          Already have an account,{" "}
          <span onClick={registerState} className={classes.login_switch}>
            Login
          </span>
        </p>
      </div>
    </>
  );
}

export default Signup;