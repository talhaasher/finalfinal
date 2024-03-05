import classes from "./index.module.css";

function Posts({item}){
   const { user, content, date, likes } = item;

   return(
       <div className={`${classes.tweet} `}>
       <h2 className={`${classes.tweet_title} ${classes.items}`}>{user}</h2>
       <p className={`${classes.tweet_body} ${classes.items}`}>{content}</p>
       <div className={`${classes.tweet_stats}${classes.items} `}>
         <p className={`${classes.tweet_date} `}>Date:{date}</p>
         <p className={classes.tweet_like}>Likes:{likes}</p>
         
       </div>
     </div>
   );
}

export default Posts;