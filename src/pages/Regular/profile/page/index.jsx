import Header from '../../../genrelComps/Header';
import Profilecomp from '../comp/comp1';
import AddTweets from '../comp/comp2';
import classes from './index.module.css';
import React, { useEffect } from 'react'
import { setAdmin, setRegular, setTweet, setUserInfo, setnewtweetclear } from '../../../../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../../firebase';
import { getDatabase, onValue, ref, set, push } from 'firebase/database';
import UsersTweet from '../comp/comp3';


function Profile() {
  const dispatch=useDispatch();

  const UserId = useSelector((state) => state.reducer.UserId);
  const Loggedin = useSelector((state) => state.reducer.IsLoggedin);
  const AdminOrNot = useSelector((state) => state.reducer.AdminOrNot);




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
  }, [UserId, Loggedin, AdminOrNot, dispatch]); // Add an empty dependency array
  
  return (
    <>
        <Header/>
        <Profilecomp/>
        <AddTweets />
        <UsersTweet/>
    </>
  )
}

export default Profile;