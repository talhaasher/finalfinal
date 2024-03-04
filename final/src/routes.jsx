
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Session from './pages/NonLoggedinpages/Session';
import MainPage from './pages/NonLoggedinpages/Home';
import LoginSighnup from './pages/LoginSighnup';
import Adminlogin from './pages/Loggedinpages/admin/Login';
import Profile from './pages/Loggedinpages/NonAdmin/Profile';
import Setting from './pages/Loggedinpages/NonAdmin/Setting';
import Follower from './pages/Loggedinpages/NonAdmin/Follower';
import Following from './pages/Loggedinpages/NonAdmin/Following';
import Post from './pages/Loggedinpages/NonAdmin/Post';
import AdmiHome from './pages/Loggedinpages/admin/Home';
import PM from './pages/Loggedinpages/admin/PostManagmant';
import UM from './pages/Loggedinpages/admin/UserManagment';

export function WebRoutes() {
  const AdminOrNot = useSelector((state) => state.reducer.AdminOrNot);
  const IsLoggedin = useSelector((state) => state.reducer.IsLoggedin);
  console.log(AdminOrNot,IsLoggedin);

  return (
    <Router>
      <Routes>

        {IsLoggedin?((AdminOrNot?( <>
            <Route path="/session" element={<Session />} />
            <Route path="/home" element={<MainPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/admin" element={<AdmiHome />} />

            <Route path="/auth" element={<Navigate to="/admin/home" />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/settings" element={<Setting />} />
            <Route path="/profile/follower" element={<Follower />} />
            <Route path="/profile/following" element={<Following />} />
            <Route path="/post" element={<Post />} />

            <Route path="/admin/home" element={<AdmiHome />} />
            <Route path="/admin/PM" element={<PM />} />
            <Route path="/admin/UM" element={<UM />} />

            <Route path="*" element={<Navigate to="/" />} />
          </>):(<>
            <>
              {/* Routes for non-admin but logged-in users */}
              <Route path="/session" element={<Session />} />
              <Route path="/home" element={<MainPage />} />
              <Route path="/" element={<MainPage />} />
              <Route path="/auth" element={<MainPage />} />

              {/* Profile and post routes */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/settings" element={<Setting />} />
              <Route path="/profile/follower" element={<Follower />} />
              <Route path="/profile/following" element={<Following />} />
              <Route path="/post" element={<Post />} />

              {/* Redirect to home for any admin-specific routes */}
              <Route path="/admin/*" element={<Navigate to={{ pathname: "/home" }} />} />

              {/* Redirect to home for any other unmatched routes */}
              <Route path="*" element={<Navigate to="/" />} />
            </>
          </>))):( <>
            {/* Routes for not logged-in users */}
            <Route path="/session" element={<Session />} />
            <Route path="/home" element={<MainPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/auth" element={<LoginSighnup />} />
            <Route path="/admin" element={<Adminlogin />} />

            {/* Redirect to auth for profile and post routes */}
            <Route path="/profile/*" element={<Navigate to="/auth" />} />

            <Route path="/post" element={<Navigate to="/auth" />} />

            {/* Redirect to admin login for admin-specific routes */}
            <Route path="/admin/*" element={<Navigate to="/admin" />} />

            {/* Redirect to home for any other unmatched routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </>)}


       

        
      </Routes>
    </Router>
  );
};

// Redux mapping of state and actions


export default (WebRoutes);
