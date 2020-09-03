import React, { Component } from 'react';
import classes from './CaracaFinish.css'
import { connect} from 'react-redux';
import * as actions from '../../store/actions/index';


class CaracaFinish extends Component {

    componentDidMount () {
        console.log("finish")
        this.props.onInitClassement()
        this.props.onUpdateUser(1)
        //this.props.onLogout()
        
    }

    submitHandler = () => {
        this.props.onLogout()
        this.props.history.push({
            pathname: '/'
        });
    }

    render() {
        let time = this.props.time
        let position = null;
        const setClassement = this.props.classement ? this.props.classement.map((groupe, index) => {
            if (groupe.nom_equipe == this.props.teamName) {
                position = index + 1
            }
        }) : null

        return (
            <div className="container">
                <h3 style={{color: "#FF7900"}}>Merci pour votre Participation</h3>
                <h5 style={{color: "white"}}>Temps : {time}</h5>
                <h5 style={{color: "white"}}>Votre position est : {position}</h5>
                <button className={"row btn text-center " + classes.Button} onClick={this.submitHandler} >Quitter</button> 
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        time: state.caracaAuth.time,
        teamName : state.caracaAuth.teamName,
        classement : state.caracaBoard.classement,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitClassement: () => dispatch(actions.initClassement()),
        onUpdateUser: (etat) => dispatch(actions.updateUser(etat)),
        onLogout: () => dispatch(actions.logout())
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaracaFinish)