import React , { Component } from 'react';
import classes from './CaracaList.css'
import Pion from '../../assets/images/pion.png'

class caracaList extends Component {
    componentDidMount () {
        console.log("list render")
        this.updateBoardPosition();
    }
    
    updateBoardPosition = () => {
        console.log(this.props.boardState)
        let boardState = +localStorage.getItem('boardState')
        let boxElement = document.getElementById(boardState);
        boxElement.scrollIntoView()
    }

    clickHandler = (index) => {
        if ((index + 1) == this.props.boardState) {
            this.props.clicked(index)
        } else null
    }

    render () {
        let i = 1;

        const setQuestions = this.props.questionsBoard.map((question, index) => {
            let n = i++;
            return (
                <div 
                    id={n} 
                    key={n} 
                    className={'row align-items-end ' + classes.CardE}
                    onClick={() => this.clickHandler(index)} 
                    style={{backgroundColor: this.props.questionsColor[question.question_type]}}>
                        <img 
                            src={Pion} 
                            style={{
                                display: (this.props.boardState == n) ? "block" : "none"}}></img>
                        <h5 className="col col-12 text-center"> {n} </h5>
                </div>
            )
        })
        
        return (
            <div className="container" style={{padding: "0"}}>
                <div className={classes.ScrollingWrapper} >
                    <div id="0" key="0" className={'row align-items-end ' + classes.CardE} style={{backgroundColor: "#ccc"}}>
                        <img 
                            src={Pion} 
                            style={{
                                display: (this.props.boardState == 0) ? "block" : "none"
                                
                                }}></img>
                    
                        <h6 className="col col-12 text-center"> Début </h6>
                    </div>
                    {setQuestions}
                </div>
            </div>
        )
}
}

export default caracaList