import * as actionTypes from './actionTypes';
import axios from '../../axios-caraca';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (teamName, teamId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        teamName: teamName,
        teamId: teamId
    }
}

export const setTeamName = () => {
    return {
        type: actionTypes.SET_TEAMNAME,
        teamName: localStorage.getItem('teamName')
    }
    
}

/*
export const setAttempt = () => {
    localStorage.setItem('attempt', 1)
    return {
        type: actionTypes.SET_ATTEMPT,
        newAttempt: true
    }
}

export const updateAttempt = () => {
    let attempt = +localStorage.getItem('attempt') === 1
    return {
        type: actionTypes.UPDATE_ATTEMPT,
        newAttempt: attempt
    }
}*/


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('teamName');
    localStorage.removeItem('teamId');
    localStorage.removeItem('questionNum');
    localStorage.removeItem('responseNum');
    localStorage.removeItem('dice');
    localStorage.removeItem('boardState');
    localStorage.removeItem('questionsBoard')
    localStorage.removeItem('time')
    localStorage.removeItem('timeStart')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const updateHeader = () => {
    return {
        type: actionTypes.UPDATE_HEADER
    }
}

export const convertTime = () => {
    let timeStart = +localStorage.getItem('timeStart')
    let time = new Date().getTime() - timeStart
    let seconds = Math.floor((time / 1000) % 60)
    let minutes = Math.floor((time / (1000 * 60)) % 60)

    return minutes + ":" + seconds
}

export const updateUser = (etat) => {
    let time = convertTime();
    localStorage.setItem('time', time)
    let authData = {
        id: +localStorage.getItem('teamId'),
        questions: +localStorage.getItem('questionNum'),
        reponses: +localStorage.getItem('responseNum'),
        temps: convertTime(),
        etat: etat
    }
    let url = '/update.php'
        axios.post(url, authData)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err)
                //dispatch(authFail(err.response.data.error))
            })
    return {
        type: actionTypes.UPDATE_USER,
        time: time
    }
}

export const auth = (teamName) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            teamName: teamName
        };
        let url = '/auth.php'
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                localStorage.setItem('teamName', teamName);
                localStorage.setItem('teamId', response.data.teamId)
                localStorage.setItem('questionNum', 0)
                localStorage.setItem('responseNum', 0)
                localStorage.setItem('boardState', 0)
                localStorage.setItem('timeStart', new Date().getTime())
                dispatch(authSuccess(teamName, response.data.teamId))
            })
            .catch(err => {
                console.log(err)
                //dispatch(authFail(err.response.data.error))
            })
    }
}

export const checkAuth = () => {
    return dispatch => {
        const teamName = localStorage.getItem('teamName')
        if (!teamName){
            dispatch(logout())
        } else {
            dispatch(updateHeader())
        }
    }
}

