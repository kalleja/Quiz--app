import React, { Component } from "react";
import Header from "../containers/Header";
import LeaderboardContainer from "../containers/Pointsboard";
import { Theme, TopAppBarFixedAdjust, Typography } from "rmwc";

export default class Leaderboard extends Component {
    render() {
        return (
            <Theme tag="main">
                <Header />
                <TopAppBarFixedAdjust />
                <div className="page">
                    <div className="container">
                        <Typography use="headline4" tag="h1">
                            Student Score
                        </Typography>
                        <LeaderboardContainer />
                    </div>
                </div>
            </Theme>
        );
    }
}