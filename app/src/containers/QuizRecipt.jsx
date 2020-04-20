import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getQuizQuery } from '../queries/queries';
 
// components
import QuizDetails from './QuizDetails';

class QuizList extends Component {
    constructor(props){ 
        super(props); 
        this.state = {
            selected: null 
        }
    }   
    displayQuizzes(){
        const data = this.props.data;
        if(data.loading){
            return( <div>Loading quizs...</div> );
        } else {
            return data.quizzes.map(({quizzes}) => {
                return( <li key={ quizzes.id } onClick={ (e) => this.setState({ selected: quizzes.id }) }>{ quizzes.name }</li>
                );
            })
        }
    }
    render(){
        return(
            <div>
                <ul id="quiz-list">
                    { this.displayQuizzes() }
                </ul>
                <QuizDetails quizId={ this.state.selected } />
            </div> 
        );
    } 
}

export default graphql(getQuizQuery)(QuizList);
