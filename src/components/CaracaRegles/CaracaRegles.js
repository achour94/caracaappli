import React , { Component } from 'react';
import {connect} from 'react-redux';
import classes from './CaracaRegles.css'
import orangeLogo from '../../../src/assets/images/logoOrange.png';
import * as actions from '../../store/actions/index';

class CaracaRegles extends Component {
    state = {
        teamName : null,
        redirect : false,
        error: true
    }

    componentDidMount () {
        console.log("regles")
        
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.history.push({
            pathname: '/board'
        });            
    }
    
    render () {
        
    
        return (
            <div className="container mt-4">
                

                <div className="row" style={{color: "white"}}>
                    <h2>Régles du jeu</h2>
                </div>
            
                    <button 
                        type="submit" 
                        className={"btn col-12 py-2 " + classes.Button}
                        onClick={this.submitHandler} >Lancer le jeu</button>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.caracaAuth.loading,
        error: state.caracaAuth.error,
        isAuthenticated: state.caracaAuth.teamId !== null,
    }
}
const mapDispatchToProps = dispatch => {
    return { 
        onAuth : (teamName) => dispatch(actions.auth(teamName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaracaRegles);