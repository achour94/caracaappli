import React , { Component } from 'react';
import { connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Auxillary from '../../hoc/Auxillary/Auxillary'
import Dice from '../../components/Dice/Dice';
import CaracaList from '../../components/CaracaList/CaracaList'

import DrawerToggle from '../../components/Navigation/SideDrawer/DrawerToogle/DrawerToggle'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import HelpBox from '../../components/UI/HelpBox/HelpBox'

class CaracaBoard extends Component {
    state = {
        questionNum : null,
        responseNum : null,
        dice: null,
        boardState: 0,
        questionsBoard : null,
        question: null,
        response: null,
        questionClicked: false,
        classement: null,
        clicked: true,
        message: "Pour commencer, cliquez sur le dé pour le lancer",
        showSideDrawer: false
    }
    
    componentDidMount () {
        this.props.onUpdateUser(0)
        if (localStorage.getItem('questionsBoard')){
            this.props.onSetQuestionsLocal()
        } else {
            this.props.onInitQuestions()
        }
        this.props.onInitClassement()
        
        const updatedState = {
            classement: this.props.classement,
            teamName : localStorage.getItem('teamName'),
            questionNum : localStorage.getItem('questionNum'),
            responseNum : localStorage.getItem('responseNum'),
            boardState: localStorage.getItem('boardState') ? localStorage.getItem('boardState') : 0
        }
        this.setState({...updatedState})
    }


    diceHandler = (num) => {
        this.setState({
            clicked: false
        })
        localStorage.setItem('dice', num)
        this.setState({dice: num})
        let newState = +this.state.boardState + num
        if (newState > 50){
            newState = 50
        }  
        localStorage.setItem('boardState', newState )
        this.setState({
            boardState: newState,
            message: "vous êtes en case " + newState + ", Cliquez sur la case pour répondre à la question"
        })
        document.getElementById(this.state.boardState).scrollIntoView()
        
        
    }

    questionClickHandler = (questionId) => {
        if (this.state.clicked){
            return null
        }
        let question = {
            ...this.props.questionsBoard[questionId]
        }
        
        /*this.setState({redirect: (<Redirect
            to={{
                pathname: "/question",
                search: 'index=' + questionId + '&id=' + question.id_question
            }} />) })*/

        this.props.onSetQuestion(questionId)
        let queryParams = []
        queryParams.push('index=' + questionId)
        queryParams.push('id=' + question.id_question)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/question',
            search: '?' + queryString
        });        
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToogleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render () {
        let caracaList = null;
        if (this.props.questionsBoard) {
            caracaList = (
                <Auxillary>
                    <Dice 
                    clicked={(num) => this.diceHandler(num)}
                    isClicked={this.state.clicked} />
                    <CaracaList 
                    questionsBoard={this.props.questionsBoard}
                    questionsColor={this.props.questionsColor}
                    boardState = {this.state.boardState}
                    clicked = {(qst)=>{this.questionClickHandler(qst)}}
                    />
                </Auxillary>
                )
        }
        return (
            <div className="container">
                <DrawerToggle clicked={this.sideDrawerToogleHandler}/>
                <SideDrawer
                    list={this.props.classement}
                    teamName={this.props.teamName}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                {caracaList}

                <HelpBox>{this.state.message}</HelpBox>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        classement : state.caracaBoard.classement,
        teamName : state.caracaAuth.teamName,
        questionsColor: state.caracaBoard.questionsColor,
        questionsType: state.caracaBoard.questionsType,
        questionsBoard: state.caracaBoard.questionsBoard
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onSetTeamName: () => dispatch(actions.setTeamName()),
        onInitQuestions: () => dispatch(actions.getQuestions()),
        onInitClassement: () => dispatch(actions.initClassement()),
        onSetQuestionsLocal: () => dispatch(actions.setQuestionsLocal()),
        onSetQuestion: (index) => dispatch(actions.setQuestion(index)),
        onUpdateUser: (etat) => dispatch(actions.updateUser(etat))
        }
}
export default connect(mapStateToProps, mapDispatchToProps)(CaracaBoard)