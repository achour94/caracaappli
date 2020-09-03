import React from 'react';
import classes from './CaracaHeader.css'

const caracaHeader = (props) => {

    return (
        <div className="container">
            <h1 className={'my-4 ' +classes.TeamName}>{props.teamName}</h1>
            <div className={'row ' + classes.Result}>
                <div className={'col col-5 py-1 ' + classes.Question}>
                    <h6>Question : {props.questionNum} </h6>
                </div>
                <div className={'col col-5 ml-5 py-1 ' + classes.Response}>
                    <h6>Réponse : {props.responseNum} </h6>
                </div>
            </div>
        </div>
    )
}

export default caracaHeader