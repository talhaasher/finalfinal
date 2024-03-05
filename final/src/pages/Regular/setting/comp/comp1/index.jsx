import { useDispatch, useSelector } from 'react-redux';
import { setBio, setFirstName, setHandle, setLastName, setPassword,  setnewemail } from '../../../../../redux/reducer';
import classes from './index.module.css';
import React from 'react'
import { getDatabase, ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
// import ResetPassword from '../../../resestpassod';

function SettingComp() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
 
  const userinfo = useSelector((state) => state.reducer.userinfo);
  const oldPassword = useSelector((state) => state.reducer.Password);
  const newemail = useSelector((state) => state.reducer.newemail);
  const UserId = useSelector((state) => state.reducer.UserId);

  const userinfupdate = () => {
    // Get the Firebase Realtime Database instance
    const db = getDatabase();
  
    // Update user information in the database
    set(ref(db, "users/" + UserId), {
      Handle: userinfo.Handle,
      FirstName: userinfo.FirstName,
      LastName: userinfo.LastName,
      Email: userinfo.Email,
      Bio: userinfo.Bio,
      FollowerCount: userinfo.FollowerCount,
      FollowingCount: userinfo.FollowingCount,

    }).then(navigate("profile/settings"));
  }

  return (
    <>
      <div className={classes.mainbody}>
        <div className={classes.container}>
          <h2> Info</h2>
          
          <form className={classes.basic} onSubmit={userinfupdate}>
            <div className={classes.handle_name}>
              <input
                className={classes.settinginput}
                type="name"
                placeholder={userinfo.FirstName === "" ? "Last name" : userinfo.FirstName}
                value={userinfo.Firstname}
                onChange={(e) => dispatch(setFirstName(e.target.value))}
              />
              <input
                className={classes.settinginput}
                type="name"
                placeholder={userinfo.LastName === "" ? "Last name" : userinfo.LastName}
                value={userinfo.Lastname}
                onChange={(e) => dispatch(setLastName(e.target.value))}
              />

              <input
                className={classes.settinginput}
                type="name"
                placeholder={userinfo.Handle === "" ? "Handle" : userinfo.Handle}
                value={userinfo.Handle}
                onChange={(e) => dispatch(setHandle(e.target.value))}
              />
            </div>    
            <div className={classes.handle_name}>
              <textarea
                className={classes.bios}
                value={userinfo.Bio}
                placeholder={userinfo.Bio === "" ? "Bio" : userinfo.Bio}
                onChange={(e) => dispatch(setBio(e.target.value))}
              ></textarea>
              
              </div> 
              <div className={classes.handle_name}>
                <input className={classes.settinginput} type="email" placeholder="New email" value={newemail}  onChange={(e) => dispatch(setnewemail(e.target.value))}/>

                </div>                       
               <input type="submit" className={classes.submit_btn}  value="Update Info"  />


          </form>
          </div>
        </div>


       
    </>
  );
}

export default SettingComp;
