import logo from "../../../../assets/translogo.svg";
import classes from "./index.module.css";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {setEmail,setErrorMessages,setPassowrdclear,setPassword, setRegular, setUserId} from "../../../../redux/reducer";
import {  useDispatch, useSelector } from 'react-redux';
import { auth } from "../../../../firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

function Login({loginState}) {
  const dispatch = useDispatch();


  const ErrorMessages = useSelector((state) => state.reducer.ErrorMessages);
  const Password = useSelector((state) => state.reducer.Password);
  const userinfo = useSelector((state) => state.reducer.userinfo);

const Loginbutton = async (e) => {
    e.preventDefault();
    let errMessage = [];
    const validEmail = userinfo.Email.trim();

    if (validEmail.length === 0) {
      errMessage.push("Please write your email!");
    } if (Password.length === 0) {
      errMessage.push("Please write your password");
    }

    setErrorMessages(errMessage);

    if (errMessage.length === 0) {
      try {
        console.log("Before signInWithEmailAndPassword");

        const user = await signInWithEmailAndPassword(auth, userinfo.Email, Password);
        console.log("After signInWithEmailAndPassword");
        // naviagte("/");    
      } catch (error) {
        console.error("Login Error:", error.code, error.message);
        if (error.code === "auth/invalid-login-credentials") {
          dispatch(setErrorMessages("Check Email and Password"));
        } else {
          dispatch(setErrorMessages("An error occurred during login. Please try again."));
        }
      }
    }
  };
  const googlelogin=()=>{
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth,provider).then((user)=>{
      dispatch(setUserId(user.uid)); 
      dispatch(setPassowrdclear())  
      console.log("beforeregular")
      try{
              dispatch(setRegular());

      }catch(error){
        console.log(error)
      }
      console.log("afterregular")
       naviagte("/");   
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  
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
      <div className={classes.Login}>
        <center className={classes.logCenter}>
          <img className={classes.logo} src={logo} alt="" />
        </center>
        <h3 className={classes.logtext}>Login</h3>
        {ErrorMessages && <p className={classes.error}>{ErrorMessages}</p>}
        <form onSubmit={Loginbutton} className={classes.logForm} action="">
        <input
            value={userinfo.Email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            className={classes.logInputField}
            type="email"
            placeholder="Email"
          />
          <input
            value={Password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            className={classes.logInputField}
            type="Password"
            placeholder="Password"
          />
          <input  onClick={googlelogin} className={classes.submission} type="button" value="google login" />

        </form>

        <p className={classes.pLogReg}>
          Don't have an account?{" "}
          <span onClick={loginState} className={classes.login_switch}>
            Register
          </span>
        </p>

        
      </div>
    </>
  );
}
export default Login;