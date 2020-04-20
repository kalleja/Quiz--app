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
    //GraphQLNonNull
} = graphql;

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      token: {type: GraphQLString},
      points: {type: GraphQLInt},
      total_points:{type: GraphQLInt}
    }),
  });
  

const quizType = new GraphQLObjectType({
    name: 'Quiz',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        questions: { type: GraphQLInt },
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
        user: {
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
                return User.find({});
            }
        },
       
    }
});

/*const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: userType,
            args: {
                name: { type: GraphQLString },
                points: { type: GraphQLInt }
            },
            resolve(parent, args){
                let user = new User({
                    name: args.name,
                    points: args.points
                });
                return user.save();
            }
        },
        addQuiz: {
            type: quizType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                questions: { type: new GraphQLNonNull(GraphQLString) },
                quizId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let quiz = new Quiz({
                    name: args.name,
                    questions: args.questions,
                    quizId: args.quizId
                });
                return quiz.save();
            }
        },
        

    }
});*/

module.exports = new GraphQLSchema({
    query: RootQuery,
    //mutation: Mutation
});
