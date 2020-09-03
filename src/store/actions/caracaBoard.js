import * as actionTypes from './actionTypes';
import axios from '../../axios-caraca';

export const incrementQuestion = () => {
    let questionNum = +localStorage.getItem('questionNum') + 1
    localStorage.setItem('questionNum', questionNum )
    return {
        type: actionTypes.INCREMENT_QUESTION
    }
}

export const incrementResponse = () => {
    let responseNum = +localStorage.getItem('responseNum') + 1
    localStorage.setItem('responseNum',  responseNum)
    return {
        type: actionTypes.INCREMENT_RESPONSE
    }
}

export const initQuestions = (questions) => {
    return {
        type: actionTypes.INIT_QUESTIONS,
        questionsBoard : questions
    }
}

export const getClassement = (classement) => {
    return {
        type: actionTypes.GET_CLASSEMENT,
        classement: classement
    }
}

export const setQuestionsLocal = () => {
    return {
        type: actionTypes.SET_QUESTIONS_LOCAL,
        questionsBoard : JSON.parse(localStorage.getItem('questionsBoard'))
    }
}

export const setQuestion = (index) => {
    return {
        type: actionTypes.SET_QUESTION,
        index: index
    }
}

export const getQuestions = () => {
    return dispatch => {
        axios.get( '/list.php' )
            .then( response => {
                localStorage.setItem('questionsBoard', JSON.stringify(response.data))
                dispatch(initQuestions(response.data))
            } )
            .catch( error => {
                console.log(error)
            } );
    }
}
export const initClassement = () => {
    return dispatch => {
        axios.get( '/classement.php' )
            .then( response => {
                localStorage.setItem('classement', JSON.stringify(response.data))
                dispatch(getClassement(response.data))
            } )
            .catch( error => {
                console.log(error)
            } );
    }
}
