import * as actionTypes from "../actionTypes";
import { Record, Map, fromJS } from "immutable";

const StateModel = Record({
    data: new Map(),
    isPending: false,
    isError: false
});

const initialState = StateModel();

const QuizListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_QUIZZES.FULFILLED:
            return state.withMutations(mutant => {
                mutant.set("isPending", false);
                mutant.set("isError", false);
                mutant.set(
                    "data",
                    new Map().withMutations(map => {
                        action.payload.data.forEach(item =>
                            map.set(item._id, fromJS(item))
                        );
                    })
                );
            });
        case actionTypes.GET_ALL_QUIZZES.PENDING:
            return state.withMutations(mutant => {
                mutant.set("isPending", true);
                mutant.set("isError", false);
                mutant.set("data", new Map());
            });
        case actionTypes.GET_ALL_QUIZZES.REJECTED:
            return state.withMutations(mutant => {
                mutant.set("isError", true);
                mutant.set("isPending", false);
                mutant.set("data", new Map());
            });
      
        default:
            return state;
    }
};

export default QuizListReducer;
