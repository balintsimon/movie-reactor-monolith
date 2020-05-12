import React, {useState, useEffect, useContext} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import axios from "axios";
import styled, {ThemeProvider} from "styled-components";
import Menu from "./components/layout/Menu";
import MovieDetailPage from "./components/movie_detail_page/MovieDetailPage";

function App() {

    const theme = {
        background: "none",
        textAlign: "center",
        padding: "10px",
        fontSize: "1.3rem",
        borderRadius: "15px",
        fontFamily: " Helvetica, Arial, sans-serif",
    };

    document.title = "Movie Reactor";
    return (
        <div id="outer-container">
            <Router>
                {/*<Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"}/>*/}
                <main id="page-wrap">
                    <ThemeProvider theme={theme}>
                        <MovieDetailPage></MovieDetailPage>
                            {/*<Route exact path="/" component={} />
                <Route path="/latest" component={} />
                <Route path="/popular" component={} />
                <Route path="/upcoming" component={} />*/}
                    </ThemeProvider>
                </main>
            </Router>
        </div>
    );
}

export default App;
