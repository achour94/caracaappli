import React , { Component } from 'react';
import {Redirect , NavLink} from 'react-router-dom';
import classes from './CaracaComment.css'
import { connect} from 'react-redux';
import * as actions from '../../store/actions/index';

import Auxillary from '../../hoc/Auxillary/Auxillary'
import Like from '../../../src/assets/images/like.png'
import Dislike from '../../../src/assets/images/dislike.png'
import HelpBox from '../../components/UI/HelpBox/HelpBox'

class CaracaComment extends Component {
    state = {
        index: null,
        comment: null,
        correct: null,
        correctRep: null,
        redirect : "/board"
    }

    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        let rep = null;
        let questionId = null
        let index = index
        for (let param of query.entries()) {
            if (param[0] === 'rep') {
                rep = +param[1]
            } if (param[0] === 'index') {
                index = +param[1]
            }else {
                questionId = +param[1]
            }
        }
        
        this.setState({
            index: index,
            correct: rep
        })
        if(index === 49 ) {
            this.setState({redirect: "/finish"})
        }
    }

    submitHandler = (e) => {
        //e.preventDefault();
        
        //this.setState({redirect: true})
    }

    render () {
        let img = null
        console.log(this.state.correctRep)
        if (this.state.correct !== 1) {
            img = (
            <Auxillary>
                    
                    <img className={classes.Image} src={Dislike}  />
                    <p>
                        <h5>Bonne réponse : {localStorage.getItem('correctRep')} </h5>
                    </p>
                    <p>
                        {this.props.question.question_commentaire}
                    </p> 
                </Auxillary>)
        } else {
            img = (
                <Auxillary>
                    
                    <img className={classes.Image} src={Like}  />
                    <p>
                        {this.props.question.question_commentaire}
                    </p> 
                </Auxillary>
            )
            
        }
             

        return (
            <div className={"container " + classes.CommentContainer}>
                <h4 style={{margin: "10px 0"}}>Question: {this.props.questionsType[this.props.question.question_type]} </h4>
                {img}
                <NavLink to={this.state.redirect} >
                   <button className={"row btn text-center " + classes.Button} onClick={this.submitHandler} >Continuer</button> 
                </NavLink>

                <HelpBox>Cliquez sur Continuer</HelpBox>
                
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
        onUpdateHeader: () => dispatch(actions.updateHeader())
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaracaComment)