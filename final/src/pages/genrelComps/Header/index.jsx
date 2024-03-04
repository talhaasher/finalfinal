import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Add this import
import classes from './index.module.css';
import logo from '../../../assets/translogo.svg';
import { auth } from '../../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Default_user from '../../../assets/Default_user.svg';
import { setAdmin, setClear, setRegular, setTweet, setUserInfo, setnewtweetclear } from '../../../redux/reducer';
import { useDispatch } from 'react-redux';
import { getDatabase, onValue, ref } from 'firebase/database';

function Header() {
  const dispatch = useDispatch();

  const AdminOrNot = useSelector((state) => state.reducer.AdminOrNot);
  const Loggedin = useSelector((state) => state.reducer.IsLoggedin);
  const navigate = useNavigate();
  const UserId = useSelector((state) => state.reducer.UserId);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Check if the user is logged in
        if (Loggedin) {
          // Check if the user is an admin
          if (AdminOrNot) {
            // If admin, dispatch the setAdmin action
            dispatch(setAdmin());
          } else {
            // If regular user, dispatch the setRegular action
            dispatch(setRegular());
    
            // Access Firebase Realtime Database
            const db = getDatabase();
    
            // Reference to the user's data in the database
            const data = ref(db, "users/" + UserId);
    
            // Listen for changes in the user's data
            onValue(data, (snapshot) => {
              // Get the user's data from the snapshot
              const userData = snapshot.val();
    
              // Dispatch setUserInfo action with user data
              dispatch(setUserInfo(userData));
    
              // Check if the user has tweets
              if (userData?.tweets) {
                const tweets = userData.tweets;
                const tweetsList = [];
    
                // Iterate through user's tweets and add them to the list
                for (const tweet in tweets) {
                  tweetsList.push(tweets[tweet]);
                }
    
                // Dispatch setTweet action with the list of tweets
                dispatch(setTweet(tweetsList));
    
                // Dispatch setnewtweetclear action
                dispatch(setnewtweetclear());
              }
            });
          }
        }
      }
    });
  }, []); // Add an empty dependency array
  const logout = () => {
    signOut(auth).then(() => {
      dispatch(setClear());
      navigate("/");
    });
  };

  // Render the header based on the user's admin and registration status
  return (
    <>  

{Loggedin ? (
          AdminOrNot ? (
            <header className={`${classes.header} `}>
              <Link className={classes.NaviO} to="/home">
                Home
            </Link>
          <Link className={classes.NaviO} to="/session">
            Session
          </Link>

          {/* Logo */}
          <Link to="/home">
            <img className={classes.logo} src={logo} alt="" />
          </Link>

          {/* Additional Navigation Links */}
          <Link className={classes.NaviO} to="/post">
            Post
          </Link>
          <div className={classes.dropdown}>
            <button className={`${classes.admin}`}>
              <p>Search</p>
            </button>
            <div className={classes.dropdown_content}>
              {/* Profile Links */}
              <Link className={classes.NaviO} to="/post">
                Post
              </Link>
              <Link className={classes.NaviO} to="/usersaerch">
                User
              </Link>
              <Link className={classes.NaviO} to="/admin/UM">
                User Management
              </Link>
            </div>
          </div>
          {/* User Dropdown */}
          <div className={classes.dropdown}>
            <button className={`${classes.admin}`}>
              <p>Admin</p>
            </button>
            <div className={classes.dropdown_content}>
              {/* Profile Links */}
              <Link className={classes.NaviO} to="/admin/home">
                Admin Home
              </Link>
              <Link className={classes.NaviO} to="/admin/PM">
                Post Management
              </Link>
              <Link className={classes.NaviO} to="/admin/UM">
                User Management
              </Link>
            </div>
          </div>
          {/* User Dropdown */}
          <div className={classes.dropdown}>
            <button className={classes.dropbtn}>
              <img className={classes.logouser} src={Default_user} alt="" />
            </button>
            <div className={classes.dropdown_content}>
              {/* Profile Links */}
              <Link className={classes.NaviO} to="/profile">
                Profile
              </Link>
              <Link className={classes.NaviO} to="/profile/settings">
                Settings
              </Link>
              <Link className={classes.NaviO} to="/profile/following">
                Followings
              </Link>
              <Link className={classes.NaviO} to="/profile/follower">
                Followers
              </Link>
              <button className={classes.NaviO} onClick={logout}>Sign Out</button>
            </div>
          </div>
        </header>
          ) : (
            <div className={classes.minbody}>
            <header className={`${classes.header} `}>
              <Link className={classes.NaviO} to="/home">
                Home
              </Link>
              <Link className={classes.NaviO} to="/session">
                Session
              </Link>

              <Link to="/home">
                <img className={classes.logo} src={logo} alt="" />
              </Link>

              <div className={classes.dropdown}>
            <button className={`${classes.admin}`}>
              <p>Search</p>
            </button>
            <div className={classes.dropdown_content}>
              {/* Profile Links */}
              <Link className={classes.NaviO} to="/post">
                Post
              </Link>
              <Link className={classes.NaviO} to="/usersaerch">
                User
              </Link>

            </div>
          </div>

              <div className={classes.dropdown}>
                <button className={classes.dropbtn}>
                  <img className={classes.logouser} src={Default_user} alt="" />
                </button>
                <div className={classes.dropdown_content}>
                  <Link className={classes.NaviO} to="/profile">
                    Profile
                  </Link>
                  <Link className={classes.NaviO} to="/profile/settings">
                    Settings
                  </Link>
                  <Link className={classes.NaviO} to="/profile/following">
                    Followings
                  </Link>
                  <Link className={classes.NaviO} to="/profile/follower">
                    Followers
                  </Link>
                  <button className={classes.NaviO} onClick={logout}>Sign Out</button>
                </div>
              </div>
            </header>
          </div>
          )
        ) : (
          <header className={classes.header}>
          <Link className={classes.NaviO} to="/home">Home</Link>
          <Link className={classes.NaviO} to="/session">Session</Link>

          <Link to="/home">
            <img className={classes.logo} src={logo} alt="" />
          </Link>
          <Link className={classes.NaviO} to="/post">Post</Link>

          <div className={classes.dropdown}>
            <button className={classes.dropbtn}><img className={classes.logouser} src={Default_user} alt="" /></button>
            <div className={classes.dropdown_content}>
              <Link className={classes.NaviO} to="/auth">
                Login/Sign-up
              </Link>
            </div>
          </div>
        </header>
        )}
      </>
  );
}

export default Header;
