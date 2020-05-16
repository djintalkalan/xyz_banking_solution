import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { history } from '../../routes';
import CanvasJSReact from '../../assets/canvasjs.react';
import AccountList from '../../constants/AccountList';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


//Open console and perform an action on page


const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title: {
        text: "Column Chart With Index"
    },
    data: [{
        type: "line", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: [
            { x: 10, y: 71 },
            { x: 20, y: 55 },
            { x: 30, y: 50 },
            { x: 40, y: 65 },
            { x: 50, y: 71 },
            { x: 60, y: 68 },
            { x: 70, y: 38 },
            { x: 80, y: 92, indexLabel: "Highest" },
            { x: 90, y: 54 },
            { x: 100, y: 60 },
            { x: 110, y: 21 },
            { x: 120, y: 49 },
            { x: 130, y: 36 }
        ]
    }]
}

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [
                {
                    accountId: "120",
                    accountNumber: "1516545678",
                    accountType: "Savings",
                    balance: "200000"
                },
                {
                    accountId: "121",
                    accountNumber: "1516545690",
                    accountType: "Current",
                    balance: "1000000"
                }
            ]
        }



    }

    componentWillMount() {
        console.log(this.state.userDataReducer)
        const { customerId } = this.props.userDataReducer

        const accountList = AccountList.filter((item, index) => {
            return item.customerId == customerId
        })

        this.setState({ accountList })


    }

    render() {
        return (
            <div className="dashboardCt">
                <div className="container-fluid">
                    <div className="inner">
                        <div className="row">
                            <div className="col-md-12 pt20">
                                <CanvasJSChart options={options} />
                            </div>
                        </div>
                        <div className="row pt40">
                            <div className="col-md-4">
                                <div className="search_bar">
                                    {/* <input type="text" className="form-control" placeholder="Search" /> */}
                                </div>
                            </div>
                            <div className="col-md-8 text-right">
                                {/* <button className="btn btn-success">Add New</button> */}
                            </div>
                        </div>
                        <div></div>
                        <h4>Account's List</h4>
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table table-striped mt30">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Account Number</th>
                                            <th scope="col">Account Type</th>
                                            <th scope="col">Balance</th>
                                            <th scope="col">Account</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.accounts.map((item, index) => (
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{item.accountNumber}</td>
                                                    <td>{item.accountType}</td>
                                                    <td>{item.balance}</td>
                                                    <td><button onClick={() => { history.push('/transactions', { id: item.accountId }) }} className="btn btn-sm btn-primary">Open</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb100">
                                <div className="text_wrapper pull-right">
                                    {/* <h4>Account Logout</h4>
                                    {this.props.isLoginReducer && <div>
                                        <button onClick={this.logOut} className="btn btn-primary">
                                            Log Out</button>
                                    </div>} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);

