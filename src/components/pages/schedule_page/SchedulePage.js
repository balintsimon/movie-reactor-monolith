import React, {useEffect, useState} from 'react';

import FirstRow from "../../movie_detail_page/FirstRow";
import Tagline from "../../movie_detail_page/Tagline";
import LinksToExternalPagesGroup from "../../movie_detail_page/LinksToExternalPagesGroup";
import SpokenLanguages from "../../movie_detail_page/SpokenLanguages";
import TitleGenreRatingBox from "../../movie_detail_page/TitleGenreRatingBox";
import Overview from "../../movie_detail_page/Overview";

import {checkStatus, parseJSON} from "../../../Utils";
import {API_KEY, API_SCHEDULE_URL, API_URL_MOVIE, API_URL_PICTURE, IMAGE_SIZES} from "../../../Constants";

import axios from "axios";
import "./SchedulePage.css";

const SchedulePage = () => {

      const [movieIds, setMovieIds] = useState([]);
      const [shows, setShows] = useState([]);
      const [startingDates, setStartingDates] = useState([]);
      const [startingTimes, setStartingTimes] = useState([]);
      const [playedMovies, setPlayedMovies] = useState([])

      console.log(movieIds);
      console.log(shows);
      console.log(startingDates);
      console.log(startingTimes);
      console.log(playedMovies);

      useEffect(() => {
        axios
            .get(API_SCHEDULE_URL)
            .then((res) => {
              setMovieIds([...new Set(res.data.map(item => item["movie"]["id"]))]);
              setShows([...res.data.map(item => item)]);
              setStartingDates([...new Set(res.data.map(item => item["startingDate"]))]);
              setStartingTimes([...new Set(res.data.map(item => item["startingTime"]))]);
            })
      }, []);

      useEffect(() => {
        const urls = movieIds.map(movieId => `${API_URL_MOVIE}${movieId}?api_key=${API_KEY}`);

        Promise.all(urls.map(url =>
            fetch(url)
                .then(checkStatus)
                .then(parseJSON)
                .catch(error => console.log('There was a problem!', error))
        ))
            .then(data => {
              setPlayedMovies(data.map((movie) => movie));
            })
      }, [movieIds]);

      return (
          <div className={"media"}>
            <div className="col-2 align-self-start" style={{...mainColumnStyle, ...{backgroundColor: "#e6b31e"}}}>
            </div>
            <div className="col-9 align-self-center" style={{...mainColumnStyle, ...{backgroundColor: "#343434"}}}>
              {/* The center container div. There is a grid in it. */}
              <div className="container-fluid" style={{padding: "0"}}>
                <FirstRow/>
                {/*Container for cover pictures*/}
                <div className="row no-gutters" style={{backgroundColor: "green"}}>
                  <div className="col-md-12 cover-container-column">
                    <div className="cover-container">
                      {playedMovies.map((movie) => (
                          <div className="cover-item">
                            <img className="cover-img-top" src={`${API_URL_PICTURE}${IMAGE_SIZES["poster_sizes"][2]}${movie["poster_path"]}`} alt=""/>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="row no-gutters" style={{padding: "0"}}>
                  <div className="col-md-5"
                       style={containerStyle}>
                    <img src={"/images/not_available64.png"} alt=""/>
                    <div className="row no-gutters">
                      <Tagline tagline={"tagline"}/>
                    </div>
                    <div className="row no-gutters">
                      <LinksToExternalPagesGroup
                          homepage={"homepage"}
                          imdbId={"666666"}
                          youtubeTrailer={"no-trailer"}/>
                    </div>
                    <div className="row no-gutters">
                      <SpokenLanguages spokenLanguages={["spokenLanguages"]}/>
                    </div>
                  </div>
                  <div className="col-md-7" style={containerStyle}>
                    <TitleGenreRatingBox backdrop={"backdrop"}
                                         title={"title"}
                                         releaseDate={"releaseDate"}
                                         genres={["genres"]}
                                         popularity={"popularity"}
                                         voteAvg={"voteAvg"}
                                         runtime={"runtime"}/>
                    <div className="row no-gutters">
                      <Overview overview={"overview"}/>
                      <div className="col-md-4">
                        <div>WatchList button</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1 align-self-end" style={{...mainColumnStyle, ...{backgroundColor: "#e6b31e"}}}/>
          </div>
      );
    }
;

const mainColumnStyle = {
  display: "flex",
  flexFlow: "row wrap",
  height: "1500px",
  padding: "0"
}

const containerStyle = {
  textAlign: "center", padding: "5% 5% 0"
}

export default SchedulePage;
