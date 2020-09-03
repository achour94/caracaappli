import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    questionNum : 0,
    responseNum : 0,
    questionsBoard : null,
    question: null,
    classement: null,
    questionsColor : {
        1: '#ffd200',
		2: '#A885D8',
		3: '#ff7900',
		4: '#4bb4e6',
		5: '#FFFFFF'
    },
    questionsType : {
        1: ' générales RSE',
		2: ' ludiques',
		3: ' égalité numérique',
		4: ' économie circulaire',
		5: ' carbone/climat'
    }
}


const initQuestions = (state, action) => {
    return updateObject( state , {
        questionsBoard : action.questionsBoard
    })
}
const getClassement = (state, action) => {
    return updateObject( state , {
        classement : action.classement
    })
}
const setQuestionsLocal = (state, action) => {
    return updateObject( state, {
        questionsBoard: action.questionsBoard
    })
}

const incrementQuestion = (state, action) => {
    return updateObject(state, {
        questionNum : state.questionNum ++
    })
}
const incrementResponse = (state, action) => {
    return updateObject(state, {
        responseNum : state.responseNum ++
    })
}

const setQuestion = (state, action) => {
    return updateObject(state, {
        question : {
            ...state.questionsBoard[action.index]
        }
    })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.INIT_QUESTIONS: return initQuestions(state, action)
        case actionTypes.INCREMENT_QUESTION: return incrementQuestion(state, action)
        case actionTypes.INCREMENT_RESPONSE: return incrementResponse(state, action)
        case actionTypes.SET_QUESTIONS_LOCAL: return setQuestionsLocal(state, action)
        case actionTypes.SET_QUESTION: return setQuestion(state, action)
        case actionTypes.GET_CLASSEMENT: return getClassement(state, action)
        default: return state;
    }
};

export default reducer;
