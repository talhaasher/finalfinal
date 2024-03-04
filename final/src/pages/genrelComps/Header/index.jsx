import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Add this import
import classes from './index.module.css';
import logo from '../../../assets/translogo.svg';
import { auth } from '../../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Default_user from '../../../assets/Default_user.svg';
import { setClear } from '../../../redux/reducer';
import { useDispatch } from 'react-redux';

function Header() {
  const dispatch = useDispatch();

  const IsAdminOrnot = useSelector((state) => state.reducer.IsAdminOrnot);
  const isloggedin = useSelector((state) => state.reducer.isloggedin);
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth).then(() => {
      dispatch(setClear());
      navigate("/");
    });
  };

  // Render the header based on the user's admin and registration status
  return (
    <>  
      {!IsAdminOrnot && isloggedin  && (
        <>
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

              <Link className={classes.NaviO} to="/post">
                Post
              </Link>

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
        </>
      )}
        
          {IsAdminOrnot && isloggedin && (
            <header className={classes.header}>
              {/* Navigation Links */}
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
          ) }
          {!IsAdminOrnot && !isloggedin &&(
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
