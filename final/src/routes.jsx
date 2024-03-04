
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Session from "./pages/Session/page/index";
import MainPage from "./pages/Home/page/index";
import LoginSighnup from "./pages/loginAndSignup/page/index";
import Profile from "./pages/Regular/profile/page/index";
import Setting from "./pages/Regular/setting/page/index";
import Follower from "./pages/Regular/follower/page/index";
import Following from "./pages/Regular/follower/page/index";
import Post from "./pages/Regular/Post/page/index";
import AdmiHome from "./pages/admin/adminDashborad/page/index";
import PM  from "./pages/admin/adminPM/page/index";
import UM   from "./pages/admin/adminUM/page/index";
import Adminlogin from "./pages/admin/adminlogin/page/index";

export function WebRoutes() {
  const IsAdminOrnot = useSelector((state) => state.reducer.IsAdminOrnot);
  const isloggedin = useSelector((state) => state.reducer.isloggedin);
  console.log(IsAdminOrnot,isloggedin);

  return (
    <Router>
      <Routes>

        {isloggedin?((IsAdminOrnot?( <>
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
