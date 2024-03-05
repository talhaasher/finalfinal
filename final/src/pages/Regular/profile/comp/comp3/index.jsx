import {  useDispatch, useSelector } from 'react-redux';
import classes from './index.module.css';
import React from 'react';

function UsersTweet() {
  const dispatch=useDispatch();
  const tweets = useSelector((state) => state.userinfo.tweet);

 
    return (
      <>
        {Array.isArray(tweets) &&tweets.length > 0 ? (
          tweets.map((tweet, index) => (
            <div key={index} className={classes.tweet}>
              <h2 className={classes.tweet_title}>{tweet.title}</h2>
              <p className={classes.tweet_body}>{tweet.description}</p>
              <div className={classes.tweet_stats}>
                <p className={classes.tweet_date}>{tweet.date+" "+tweet.time}</p>
                <p className={classes.tweet_like}>{tweet.likes}</p>
                <button onClick={console.log("f")}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>No tweets available.</p>
        )}
      </>
    );
  }
  
  export default UsersTweet;
  
