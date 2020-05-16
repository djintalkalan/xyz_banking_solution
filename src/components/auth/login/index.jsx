import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../../redux/actions"
import { connect } from "react-redux";
import { history } from '../../../routes'
import CustomerList from '../../../constants/CustomerList';

// import logo from './logo.svg';
// import './App.css';


//Open console and perform an action on page

class Login extends Component {
    constructor(props) {
        super(props);
        localStorage.getItem('userData') && history.push('/')
        this.state = {
            phone: "",
            password: ""
        }
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    handlePhoneChange = (event) => {
        this.setState({ phone: event.target.value })
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value })

    }

    handleSubmit = (event) => {

        const { phone, password } = this.state

        if (!phone) {
            alert("Please Enter Phone");
            return
        }
        if (!password) {
            alert("Password can not be empty");
            return
        }
        // let this is login response from server
        const params = {
            phone: this.state.phone,
            password: this.state.password,
        }
        console.log(params)

        const result = CustomerList.filter((item, index) => {
            return item.phone == phone && item.password == password
        })

        console.log(result)

        if (result && result.length == 1) {

            localStorage.setItem('userData', JSON.stringify(result[0]));
            localStorage.setItem('userToken', JSON.stringify("MYSTATICTOKEN"));
            localStorage.setItem('isLogin', JSON.stringify(true));

            this.props.userDataAction(result[0])
            this.props.userTokenAction("MYSTATICTOKEN")
            this.props.isLoginAction(true)

            history.push('/')
        }
        else {
            alert("Invalid phone or password")
        }


        // this.setStaticData()





        // // set login details in local storage

        // localStorage.setItem('userData', JSON.stringify(userData));
        // localStorage.setItem('userToken', JSON.stringify(userToken));
        // localStorage.setItem('isLogin', JSON.stringify(true));

        // // Now updating user's data in redux store
        // this.props.userDataAction(userData)
        // this.props.userTokenAction(userToken)
        // this.props.isLoginAction(true)

        // this.setState({
        //     phone: "", password: ""
        // }, () => { history.push('/'); })

        event.preventDefault();
    }


    setStaticData = () => {

        const userData = {
            phone: "Deepak Jaglan",
            phone: "9588558818",
            age: "21"
        }

        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('userToken', JSON.stringify("MYSTATICTOKEN"));
        localStorage.setItem('isLogin', JSON.stringify(true));

        this.props.userDataAction(userData)
        this.props.userTokenAction("MYSTATICTOKEN")
        this.props.isLoginAction(true)

        history.push('/')
    }

    logOut = (event) => {
        // clearing user's data in redux store

        this.props.userDataAction(null)
        this.props.userTokenAction(null)
        this.props.isLoginAction(false)
        event.preventDefault();
    }
    render() {
        console.log("Phone", this.state.phone)
        console.log("Password", this.state.password)
        return (
            <div className="login_block">
                <div className="inner">
                    <h2 className="text-center mb80 mt20">XYZ Banking Solutions </h2>
                    <div className="text_wrapper">
                        <h4>Account Login</h4>

                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                value={this.state.phone}
                                onChange={this.handlePhoneChange}
                                type="text" className="form-control" name="phone" placeholder="Phone" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                className="form-control" name="password" placeholder="********" />
                        </div>
                        <button onClick={this.handleSubmit} type="none" className="btn btn-primary btn-sm">Sign in</button>
                        <div className="signup mt20">
                            <a href="forget-password" className="">Forget Password</a>
                            <a href="sign-up">Sign Up/Register</a>
                        </div>

                    </div>
                </div>


                <div className="footer_block p10">XYZ Banking Solutions  &copy; 2020 | All Rights Reserved.</div>
            </div >

        );
    }
}

const mapStateToProps = state => {
    console.log("Redux State:", JSON.stringify(state))
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

