import { useDispatch, useSelector } from 'react-redux';
import classes from './index.module.css';
import React, { useEffect } from 'react'
import { setNTD, setNTT, setTweetdDate, setTweet, setnewtweetclear } from '../../../../../redux/reducer';
import { getDatabase, onValue, ref, set, push } from 'firebase/database';
function AddTweets() {
    const dispatch = useDispatch();
    const newtweets = useSelector((state) => state.reducer.newtweet);
    const UserId = useSelector((state) => state.reducer.UserId);
  
  
    const NewTweet = (e) => {
      e.preventDefault();
  
  
      if (!(newtweets.NT).trim() || !(newtweets.ND).trim()) {
        alert("Fill in all fields");
        return;
      }
        const db = getDatabase();

      const Id = push(ref(db, "users/" + UserId + "/tweets"));
      set(Id, {
        id:Id._path.pieces_[3],
        title: newtweets.NT,
        description: newtweets.ND,
        date: `${new Date().getDate() } ${new Date().getMonth() + 1}  ${new Date().getFullYear()}` ,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        likes: newtweets.like,
      });
  
      alert("New Tweet Created!");
      dispatch(setnewtweetclear());
  
     
      };
 

    useEffect(() => {
        if (!UserId) return; 
      
        const db = getDatabase();
        const data = ref(db, "users/" + UserId + "/tweets");
        onValue(data, (snapshot) => {
          const datas = snapshot.val();
          dispatch(setTweet(datas));
        });
      
   
      }, [UserId]); //
  
    return (
      <form className={classes.tweet} onSubmit={(e) => NewTweet(e)}>
        <input
          placeholder="Tweet Title"
          value={newtweets.NT}
          onChange={(e) => dispatch(setNTT(e.target.value))}
        />
        <textarea
          placeholder="Tweet Description"
          value={newtweets.ND}
          onChange={(e) => dispatch(setNTD(e.target.value))}
        ></textarea>
        <input
          className={classes.tweet_submit}
          type="submit"
          value={"Add Tweet"}
        />
      </form>
    );
  
     };
  export default AddTweets;