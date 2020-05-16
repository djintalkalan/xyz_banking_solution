import React, { Component } from 'react';
import Login from './components/auth/login'
import ForgotPassword from './components/auth/forgotPassword'
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute, history } from './routes'
import Home from './components/Home';
import Constants from './constants/Constants';
import PayeeList from './constants/PayeeList';
import { connect } from 'react-redux';
import { userDataAction, userTokenAction, isLoginAction } from "./redux/actions"

// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    }
  }
  componentWillMount() {
    if (!localStorage.getItem(Constants.PAYEE_KEY)) {
      localStorage.setItem(Constants.PAYEE_KEY, JSON.stringify(PayeeList))
    }
    // localStorage.setItem(Constants.PAYEE_KEY, JSON.stringify(PayeeList))

    this.props.userDataAction(JSON.parse(localStorage.getItem("userData")))
    this.props.isLoginAction(JSON.parse(localStorage.getItem("isLogin")))

  }
  render() {
    return (
      <Router history={history}>

        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/transactions" component={Home} />
          <PrivateRoute exact path="/payee" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/forget-password" component={ForgotPassword} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = state => {
  //console.log("Redux State:", JSON.stringify(state))
  return {
    userDataReducer: state.userDataReducer,
    isLoginReducer: state.isLoginReducer,
    userTokenReducer: state.userTokenReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDataAction: payload => dispatch(userDataAction(payload)),
    isLoginAction: payload => dispatch(isLoginAction(payload)),
    userTokenAction: payload => dispatch(userTokenAction(payload))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
