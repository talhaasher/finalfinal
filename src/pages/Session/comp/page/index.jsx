import Header from '../../../genrelComps/Header';
import classes from './index.module.css';
import Posts from '../comp/comp1';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredTweets, setSearchTerm } from '../../../../redux/reducer';

function Post() {
const dispatch=useDispatch();
  const searchTerm = useSelector((state) => state.reducer.searchTerm);
  const filteredTweets = useSelector((state) => state.reducer.filteredTweets);

  const Alltweets=[
    { user: "Doy Dagwell", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat placeat dolorem sequi velit sit nulla ducimus optio temporibus deserunt aperiam dolorum animi necessitatibus dolores, nisi suscipit harum minus pariatur illo.    ", date: "02/21/2023", likes: 44 },
    { user: "August Fridd", content: "afridd2@reverbnation.com", date: "05/14/2023", likes: 58 },
    { user: "Georg Boteman", content: "gboteman3@sakura.ne.jp", date: "08/02/2023", likes: 72 },
    { user: "Sallyanne Westmancoat", content: "swestmancoat4@tuttocitta.it", date: "01/10/2023", likes: 31 },
    { user: "Garik Frushard", content: "gfrushard5@state.gov", date: "11/10/2023", likes: 57 },
    { user: "Hamil Geertje", content: "hgeertje6@webs.com", date: "04/25/2023", likes: 69 },
    { user: "Fanni Maps", content: "fmaps7@abc.net.au", date: "06/10/2023", likes: 80 },
    { user: "Tressa Brodbin", content: "tbrodbin8@craigslist.org", date: "08/29/2023", likes: 42 },
    { user: "Cordy Jerrom", content: "cjerrom9@newyorker.com", date: "09/07/2023", likes: 59 },
    { user: "Gretel Dugan", content: "gdugana@cbc.ca", date: "04/18/2023", likes: 84 },
    { user: "Hillel Gallatly", content: "hgallatlyb@trellian.com", date: "08/18/2023", likes: 67 },
    { user: "Lulu Brunelli", content: "lbrunellic@sohu.com", date: "05/18/2023", likes: 28 },
    { user: "Vale Haddrell", content: "vhaddrelld@google.es", date: "10/02/2023", likes: 55 },
    { user: "Cissy Parry", content: "cparrye@vistaprint.com", date: "12/15/2023", likes: 66 },
    { user: "Melony Iggo", content: "miggof@time.com", date: "09/13/2023", likes: 32 },
    { user: "Tory Tembridge", content: "ttembridgeg@zimbio.com", date: "01/31/2024", likes: 94 },
    { user: "Carce Effnert", content: "ceffnerth@opera.com", date: "12/22/2022", likes: 78 },
    { user: "Meghan Karlsen", content: "mkarlseni@opensource.org", date: "09/28/2023", likes: 47 },
    { user: "Morissa Crystal", content: "mcrystalj@de.vu", date: "03/25/2023", likes: 62 },
    { user: "Wilma Kanwell", content: "wkanwellk@newsvine.com", date: "08/30/2023", likes: 88 },
    { user: "Arabelle Filippazzo", content: "afilippazzol@usatoday.com", date: "01/08/2024", likes: 25 },
    { user: "Devland Senecaux", content: "dsenecauxm@desdev.cn", date: "12/17/2022", likes: 51 },
    { user: "Cornell Feathersby", content: "cfeathersbyn@abc.net.au", date: "09/08/2023", likes: 65 },
    { user: "Etta Prettejohns", content: "eprettejohnso@51.la", date: "11/07/2022", likes: 43 },
    { user: "Shaw Oxshott", content: "soxshottp@dion.ne.jp", date: "02/06/2024", likes: 97 },
    { user: "Antoni Elderbrant", content: "aelderbrantq@weather.com", date: "09/17/2023", likes: 22 },
    { user: "Alli Aggiss", content: "aaggissr@upenn.edu", date: "11/05/2023", likes: 14 },
    { user: "Teirtza Crombie", content: "tcrombies@angelfire.com", date: "08/12/2023", likes: 80 },
    { user: "Ethan Yoodall", content: "eyoodallt@ed.gov", date: "11/29/2022", likes: 92 },
    { user: "Ravid Liffe", content: "rliffeu@netlog.com", date: "09/24/2023", likes: 39 },
    { user: "Babbette Critcher", content: "bcritcherrq@so-net.ne.jp", date: "02/17/2023", likes: 64 },
    { user: "Lorain Strickler", content: "lstricklerrr@amazonaws.com", date: "10/30/2023", likes: 67 }
  ]
  useEffect(() => {
    // Fetch stored active tweets when the component mounts
    const storedActiveTweets = JSON.parse(localStorage.getItem("activeTweets")) || Alltweets;
    dispatch(setFilteredTweets(storedActiveTweets));

    // Add an event listener for beforeunload to clear local storage when the tab is closed
    const handleBeforeUnload = () => {
      // Assuming "activeTweets" is the key for your local storage item
      localStorage.removeItem("activeTweets");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  function handleSearchChange(event) {
    const value = event.target.value;
    dispatch(setSearchTerm(value));

    const filtered = filteredTweets.filter((tweet) => {
      const userMatches = tweet.user.toLowerCase().includes(value.toLowerCase());
      const contentMatches = tweet.content.toLowerCase().includes(value.toLowerCase());

      // Adjust the logic based on your requirements
      // Here, the filter will return true if either the username or content matches the search term
      return userMatches || contentMatches;
    });

    setFilteredTweets(filtered);
  }

  return (
    <>
      <Header id="header" />
      <div className={classes.searchbar}>
        <input
          className={classes.search}
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className={classes.postbody}>
        {filteredTweets.map((item, index) => {
          return <Posts className={classes.grid_item} key={index} item={item} />;
        })}
      </div>
    </>
  );
}

export default Post;