import React, { Component } from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {Switch, Route, Redirect,withRouter} from 'react-router-dom';
import Header from './HeaderComponent';
import ContactUs from './ContactUsComponent';
import AboutUs from './AboutUsComponent';
import Home from './HomeComponent.js';
import GetStarted from './GetStartedComponent.js';
import Dashboard from './DashboardComponent';
import PreviousTests from './PreviousTestsComponent';
import AccountComponent from './AccountComponent';


class Main extends Component {

  constructor(props) {
    super(props);

  }
  
  render() {

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route exact path = "/contactus" component ={ContactUs} />
              <Route exact path = "/aboutus" component ={AboutUs} />
              <Route exact path = "/getstarted" component ={GetStarted} />
              <Route exact path = "/dashboard" component ={Dashboard} />
              <Route exact path = "/previousTests" component ={PreviousTests} />
              <Route exact path = "/account" component ={AccountComponent} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        </div>
    );
  }
}

export default withRouter(Main);