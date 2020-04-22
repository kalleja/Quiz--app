const graphql = require('graphql');
const Quiz = require('../models/quiz');
const User = require('../models/user');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const authController = require('../routes/auth');

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      points: {type: GraphQLInt},
      total_points:{type: GraphQLInt},
      quizzes: {
        type: new GraphQLList(quizType),
        resolve(parent, args){
            return Quiz.find({ userd: parent.id });
        }
    }
    }),
  });
  

const quizType = new GraphQLObjectType({
    name: 'Quizzes',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        questions: {type: new GraphQLList(quizType)},
       answers:{type: new GraphQLList(GraphQLString)},
       answer_id:{type:GraphQLInt},
       _V:{type:GraphQLInt},               
        users: {
            type: new GraphQLList(userType),
            resolve(parent, args){
                return User.find({ userId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: userType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return User.findById(args.id);
            }
        },
        quiz: {
            type: quizType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Quiz.findById(args.id);
            }
        },
        quizzes: {
            type: new GraphQLList(quizType),
            resolve(parent, args){
                return Quiz.find({});
            }
        },
       
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      
        addQuiz: {
            type: quizType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                questions: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
                answers:{type: new GraphQLNonNull( GraphQLList(GraphQLString))},
                answer_id:{type: new GraphQLNonNull(GraphQLString)},
                quizId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let quiz = new Quiz({
                    name: args.name,
                    questions: args.questions,
                    answers: args.answers,
                    answer_id: args.answer_id,
                    quizId: args.quizId
                });
                return quiz.save();
            }
        },


        deleteQuiz: {
            type: quizType,
            description: 'Delete quiz from app.',
            args: {
              id: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: async (parent, args, {req, res}) => {
              try {
                authController.checkAuth(req, res);
                // delete quiz
                const stat = await quiz.findById(args.id);
                               console.log('delete result', delResult);
                const result = await quiz.findByIdAndDelete(args.id);
                console.log('delete result', result);
                return result;
              }
              catch (err) {
                throw new Error(err);
              }
            },
          },
        

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
