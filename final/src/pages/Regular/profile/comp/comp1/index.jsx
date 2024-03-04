import classes from './index.module.css';import { useDispatch, useSelector } from 'react-redux';



import React from 'react'

function Profilecomp() {
 

  const userinfo = useSelector( (state) => state.reducer.userinfo);


  
  return (
    <div className={classes.profile}>
      <div className={classes.profile_cover}></div>
      <div className={classes.profile_basics}>
        <div className={classes.profile_basics_img}></div>
        <div>
          <h2 className={classes.profile_basics_name}>{userinfo.FirstName+" "+userinfo.LastName}</h2>
          <p className={classes.profile_basics_handle}>{userinfo.Handle}</p>
        </div>
      </div>
      <div className={classes.profile_bio}>
        
       {userinfo.bio}
      </div>
      <div className={classes.profile_stats}>
        <div className={classes.following}>

          <h3>Following </h3>
          <p> <a href="/profile/following">{userinfo.FollowingCount}</a></p>
        </div>
        <div className={classes.Followers}>
          <h3>Followers</h3>
          <p> <a href="/profile/follower">{userinfo.FollowerCount}</a> </p>
        </div>
      </div>
    </div>
  );
}

export default Profilecomp;
