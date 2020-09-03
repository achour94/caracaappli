import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import Layout from '../src/hoc/Layout/Layout'
import { withRouter } from 'react-router-dom';

import CaracaAuth from './containers/CaracaAuth/CaracaAuth'
import CaracaBoard from './containers/CaracaBoard/CaracaBoard'
import CaracaQuestion from './components/CaracaQuestion/CaracaQuestion'
import CaracaComment from './components/CaracaComment/CaracaComment';
import CaracaFinish from './components/CaracaFinish/CaracaFinish'
import CaracaRegles from './components/CaracaRegles/CaracaRegles'

class App extends Component {
  componentDidMount () {
    this.props.onCheckAuth()
  }

  render() {
    let routes = null
    if(this.props.isAuth) {
      routes = (
        <Layout>
          <Switch>
            <Route path="/finish" component={CaracaFinish} />
            <Route path="/comment" component={CaracaComment} />
            <Route path="/question" component={CaracaQuestion} />
            <Route path="/board" component={CaracaBoard} />
            <Route path="/regles" component={CaracaRegles} />
            <Redirect to="/board" />
          </Switch>
        </Layout>)
    } else {
      console.log("eeeelse")
      routes = (
        <Switch>
          <Route path="/" exact component={CaracaAuth} />
          
        </Switch>
    )
    }
    
    return (
      <div >
          {routes}
        
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      isAuth: state.caracaAuth.teamName !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuth: () => {dispatch(actions.checkAuth())},
    onUpdateHeader: () => {dispatch(actions.updateHeader())}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
