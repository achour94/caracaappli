import React, { Component } from 'react'
import classes from './CaracaQuestion.css'
import { connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {Route} from 'react-router-dom'
import axios from '../../axios-caraca';
import CaracaComment from '../CaracaComment/CaracaComment'
import HelpBox from '../../components/UI/HelpBox/HelpBox';

class CaracaQuestion extends Component {

    state = {
        response : null,
        questionId: null,
        index: null,
        question: null,
        responseSuggestions: null,
        questionColor: null,
        questionType: null,
        error: null,
        correct: null
    }

    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        let index = null;
        let questionId = null
        for (let param of query.entries()) {
            if (param[0] === 'index') {
                index = +param[1]
            } else {
                questionId = +param[1]
            }
        }
        
        let question = {
            ...this.props.questionsBoard[index]
        }

        this.setState({
            index: index,
            questionId: questionId,
            question: {
                ...question,
                questionColor: this.props.questionsColor[question.question_type],
                questionType: this.props.questionsType[question.question_type]
            }
        })
        
        axios.get('/question.php?id=' + questionId)
        .then(res => {
            //response = res.data
            this.setState({responseSuggestions: res.data})
            res.data.map(reponse => {
                console.log("rep" + reponse)
                if (reponse.reponse_correcte == 1){
                    localStorage.setItem('correctRep', reponse.reponse_libelle)
                }
            })
        })
        .catch(err => {
           console.log(err)
        })
        
    }
    inputChangeHandler = (e) => {
        this.setState({
            response: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        if (this.state.response){
            this.props.onIncrementQuestion()
            if (this.state.response == 1) {
                this.props.onIncrementResponse()
            } else {
                console.log(false)
            }
            this.props.onUpdateHeader()

            let queryParams = []
            queryParams.push('rep=' + this.state.response)
            queryParams.push('id=' + this.state.question.id_question)
            queryParams.push('index=' + this.state.index)
            const queryString = queryParams.join('&');
            this.props.history.push({
                pathname: '/comment',
                search: '?' + queryString
            });
        } else {
            this.setState({error: "veuillez choisir une réponse"})
        }
        
        
    }

    render () {
        let suggestions = null;
        let question = null;
        if (this.state.responseSuggestions){
            question = (
                <div>
                    <h4 style={{margin: "10px 0"}}>Question: {this.state.question.questionType} </h4>
                    <p className={"row "+classes.Question} style={{backgroundColor: this.state.question.questionColor }}>
                        {this.state.question.question_libelle}
                    </p>
                </div>
                )
            suggestions = this.state.responseSuggestions.map(reponse => {
                return (
                    <div key={reponse.id_reponse + "ref"} className={"row " + classes.Suggestion}>
                        <input key={reponse.id_reponse} className={"form-check-input " + classes.Check} type="radio" name="reponse" id={reponse.reponse_libelle} value={reponse.reponse_correcte} placeholder={reponse.id_reponse} onChange={this.inputChangeHandler} required/>
                        
                        <label key={reponse.reponse_libelle} className={"form-check-label " + classes.Libelle} htmlFor={reponse.reponse_libelle}>
                            {reponse.reponse_libelle }
                        </label>
                    </div>
                )
        })
        }
        
        return (
            <div className={"container " + classes.QuestionContainer}>
                {question}
                <form className={"row " + classes.SuggestionContainer}>
                    <div className="form-group" id="suggestions">
                        {suggestions}
                    </div>
                    <span style={{color:"red"}}>
                        {!this.state.response ? this.state.error : null}
                    </span>
                </form>
                <button type="submit" className={"row btn text-center " + classes.Button} onClick={this.submitHandler} >Valider</button>
                <HelpBox>Répondez à la question puis validez votre choix</HelpBox>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        question: state.caracaBoard.question,
        questionsColor: state.caracaBoard.questionsColor,
        questionsType: state.caracaBoard.questionsType,
        questionsBoard: state.caracaBoard.questionsBoard
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onIncrementQuestion: () => dispatch(actions.incrementQuestion()),
        onIncrementResponse: () => dispatch(actions.incrementResponse()),
        onUpdateHeader: () => dispatch(actions.updateHeader())
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(CaracaQuestion)