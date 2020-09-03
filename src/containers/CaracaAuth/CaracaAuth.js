import React , { Component } from 'react';
import {connect} from 'react-redux';
import Debut from '../../assets/images/debut.png'
import classes from './CaracaAuth.css'
import orangeLogo from '../../../src/assets/images/logoOrange.png';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

class CaracaAuth extends Component {
    state = {
        teamName : null,
        redirect : false,
        error: true
    }

    inputChangeHandler = (event) => {
       this.setState({teamName: event.target.value})
       if(event.target.value.length  < 3){
           this.setState({error : true})
       } else {
           this.setState({error: false})
       }
    }

    componentDidMount () {
    }
    submitHandler = (event) => {
        
        event.preventDefault()
        if (!this.state.error){
            this.props.onAuth(this.state.teamName)
            console.log("redirect")
            this.props.history.push({
                pathname: '/regles'
            });
        }
           
    }
    
    render () {
    
        return (
            
            <div className="container mt-4">
                <div className="row">
                    <div className="col col-2">
                        <img src={orangeLogo} alt="logo" height="50px"/>
                    </div>
                    <div className="col col-8 ">
                        <h2 style={{color:"white"}}>Caraca</h2>
                    </div>
                </div>
                <div className="row mt-5 mb-5" >
                    <img src={Debut} className={classes.Image} />
                </div>
                <form>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className={"form-control " + classes.Input}  
                            placeholder="Saisir le nom de la team"
                            onChange={this.inputChangeHandler}
                            required />
                        <span style={{color:"red"}}>
                            {this.state.error ? "le nom doit étre supérieur à 3 caractéres" : null}
                        </span>
                    </div>
                    <button 
                        type="submit" 
                        className={"btn col-12 py-2 " + classes.Button}
                        onClick={this.submitHandler} >Lancer le jeu</button>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(CaracaAuth);