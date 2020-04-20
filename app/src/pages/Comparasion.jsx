import React, { Component } from "react";
//Containers
import Header from "../containers/Header";
import QuizList from "../containers/QuizRecipt";
import QuizDeatils from "../containers/QuizDetails";

import { Theme, TopAppBarFixedAdjust, Typography } from "rmwc";

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);


export default class Comparision extends Component {
    render() {
        return (
           
            <Theme tag="main">
                <Header />
                <TopAppBarFixedAdjust />
                <div className="page">
                    <div className="container">
                        <Typography use="headline4" tag="h1">
                         Compear users point on sepret quiz.                         
                        </Typography>
                        <QuizList/>
                        <QuizDeatils/>
                        
                        
                        
                    </div>
                </div>
            </Theme>
       
        );
    }
}