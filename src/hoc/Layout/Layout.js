import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

import CaracaHeader from '../../components/CaracaHeader/CaracaHeader'


class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    componentDidMount () {
        //this.props.onUpdateHeader()
    }

    
    render () {
        return (
            <div className="container">
                <CaracaHeader 
                    teamName= {this.props.teamName}
                    questionNum= {this.props.questionNum}
                    responseNum= {this.props.responseNum}
                     />
                {this.props.children}
                

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        teamName: state.caracaAuth.teamName,
        questionNum : state.caracaAuth.questionHeader,
        responseNum: state.caracaAuth.responseHeader
    }
}
const mapDispatchToProps = dispatch => {
    return {
        //onUpdateHeader: () => dispatch(actions.updateHeader())
        }
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout);