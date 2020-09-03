import React from 'react';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];    
    }
    let i = 1;

        const setClassement = props.list ? props.list.map((groupe, index) => {
            let n = i++;
            return (
                <div 
                    id={n} 
                    key={n} 
                    className={'row '}
                    style={{
                        backgroundColor: (groupe.nom_equipe == props.teamName) ? "#FF7900" : null,
                        color: "black"}}>
                        
                    <h5 className="col col-2"> {index + 1} </h5>
                    <h5 className="col col-2"> {groupe.nom_equipe} </h5>

                </div>
            )
        }) : null
    return (
        <Auxillary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <h4 style={{
                    backgroundColor: "black",
                    color: "white",
                    marginBottom: "10px",
                    padding:"5px"
                }}
                className="row"
                >Classement</h4>
                {setClassement}
            </div>
        </Auxillary>
    )
};

export default sideDrawer