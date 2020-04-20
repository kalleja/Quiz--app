import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../redux/actions";
import selectors from "../redux/selectors";


import { graphql } from 'react-apollo';
import { getQuizsQuery } from '../queries/queries'; 

class quizDetails extends Component { 

    static propTypes = {
        data: PropTypes.array,
        getQuizDeatilsboard: PropTypes.func.isRequired,
        isPending: PropTypes.bool.isRequired,
        isError: PropTypes.bool.isRequired
    };

    static defaultProps = {
        data: []
    };

       displayquizDetails(){ 
        const { quiz } = this.props.getQuizDeatilsboard();
        if(quiz){
            return(  
                <div>  
                    <h2>{ quiz.name }</h2>
                    <p>{ quiz.id.name }</p>
                    <p>All quizs by this id:</p>
                    <ul className="other-quizs">
                        { quiz.id.quizzes.map(item => {
                            return <li key={item.id}>{ item.name }</li>
                        })}
                    </ul>
                </div>
            );
        } else {
            return( <div>No quiz selected...</div> );
        }
    }
    render(){
        return(
            <div id="quiz-details">
                { this.displayquizDetails() }
            </div>
        );
    }
}


const mapStateToProps = state => ({
    data: selectors.getQuizDeatilsboard(state),
    isPending: selectors.getQuizDeatilsboardIsPending(state),
    isError: selectors.getQuizDeatilsboardIsError(state)
});

const mapDispatchToProps = dispatch => ({
    getQuizDeatilsboard: () => dispatch(actions.getQuizDeatilsboard())
});

const ConnectedQuizDeatilsboard = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(quizDetails)
);

 


export default 
ConnectedQuizDeatilsboard;
graphql(getQuizsQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.quizId
            }
        }
    }
})(quizDetails);
