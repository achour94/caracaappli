import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
import { setAttempt } from '../actions/caracaAuth';


const initialState = {
    teamName: null,
    teamId: null,
    error: null,
    loading: false,
    questionHeader : 0,
    responseHeader: 0,
    timeStart : null,
    time: null,
    authRedirectPath: '/',
}

const authStart = (state, action) => {
    return updateObject( state, {error: null, loading: true});
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        teamName: action.teamName,
        teamId: action.teamId,
        error: null,
        loading: false
    })
}


const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const updateHeader = (state, action) => {
    return updateObject(state, {
        teamName: localStorage.getItem('teamName'),
        questionHeader: localStorage.getItem('questionNum'),
        responseHeader: localStorage.getItem('responseNum')
    })
}

const updateUser = (state, action) => {
    return updateObject(state, {time: action.time})
}

const authLogout = (state, action) => {
    return updateObject(state, { teamName: null})
}
/*
const setAttempt = (state, action) => {
    return updateObject(state, {newAttempt: action.newAttempt})
}
*/
/*
const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path})
}*/
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.UPDATE_HEADER: return updateHeader(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        case actionTypes.UPDATE_USER: return updateUser(state, action)
        default:
            return state
    }
};

export default reducer;