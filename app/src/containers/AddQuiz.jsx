/*import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getUsersQuery, addQuizMutation, getQuizsQuery } from '../redux/queries/queries';

class AddQuiz extends Component {
    constructor(props){ 
        super(props);
        this.state = {
            name: '', 
            qusetions: '',
            users: ''
        };
    }
    displayUsers(){
        var data = this.props.getUsersQuery;
        if(data.loading){
            return( <option disabled>Loading Quiz</option> );
        } else {
            return data.users.map(user => {
                return( <option key={ user.id } value={user.id}>{ user.name }</option> );
            });
        }
    }
    submitForm(e){
        e.preventDefault()
        
        this.props.addQuizMutation({
            variables: {
                name: this.state.name,
                qusetions: this.state.qusetions,
                users: this.state.users
            },
            refetchQueries: [{ query: getQuizsQuery }]
        });
    }
    render(){
        return(
            <form id="add-quiz" onSubmit={ this.submitForm.bind(this) } >
                <div className="field">
                    <label>Quiz name:</label>
                    <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Question:</label>
                    <input type="text" onChange={ (e) => this.setState({ qustion: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Users:</label>
                    <select onChange={ (e) => this.setState({ users: e.target.value }) } >
                        <option>Select ID</option>
                        { this.displayAnswer() }
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}

export default (
    graphql(getUsersQuery, { name: "getUsersQuery" }),
    graphql(addQuizMutation, { name: "addQuizMutation" })
)(AddQuiz);*/
