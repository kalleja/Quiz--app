
import { gql } from  'apollo-boost';

const getQuizQuery = gql`
    { 
    quizzes{    
            name
            id
                       
        }
    }
`;
const getUsersQuery = gql` 
    {
        users {
            name 
            id
            points
            total_points 
        }
    }
`;

/*const addQuizMutation = gql`
    mutation AddQuiz($name: String!, $questions: Array!, $users: Array!, $answers:Array! ){
        addQuiz(name: $name, questions: $questions, users: $users, answers: $answers){
            name
            users
        }
    }
`;*/
 
const getQuizsQuery = gql`
    query GetQuiz($id: ID){
        quiz {
            id
            name
            questions{
                answers
            }
            users {
                id
                name
                points
               
                }
            }
        }
    
`;

export { getUsersQuery, getQuizsQuery,  getQuizQuery };

//addQuizMutation
