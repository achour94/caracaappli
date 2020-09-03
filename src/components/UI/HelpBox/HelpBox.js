import React , { Component } from 'react';
import classes from './HelpBox.css'
import Help from '../../../assets/images/help.png';

class HelpBox extends Component {

    render() {
        return (
            <div className="container" >
                <div className={"container " + classes.HelpContainer} >
                    <img src={Help} className={classes.Image}  /></div>
                    <p className={"text-center " +classes.Message}>
                       {this.props.children}
                    </p>
            </div>
        )
    }
}

export default HelpBox