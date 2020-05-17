import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { history } from '../../routes';
import CanvasJSReact from '../../assets/canvasjs.react';
import { withRouter } from 'react-router-dom';
import TransactionsList from '../../constants/TransactionsList';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;




class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionList: []
        }



    }

    componentWillMount() {
        console.log("HISTORY:-", this.props.location)
        try {

            const transactionList = TransactionsList.filter((item, index) => {
                return item.accountId == this.props.location.state.id
            })

            console.log(transactionList)

            this.setState({ transactionList })
        }
        catch (e) {
            console.log(e)
        }

    }




    render() {
        return (
            <div className="dashboardCt">
                <div className="container-fluid">
                    <div className="inner">
                        <div >
                            <font style={{ fontSize: 25, fontWeight: 'bold' }} >Transactions</font>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table table-striped mt30">
                                    <thead>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Baneficiary</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Transaction Type</th>
                                            <th scope="col">Closing Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.transactionList.reverse().map((item, index) => (
                                                <tr>
                                                    <th scope="row">{item.date}</th>
                                                    <td>{item.baneficiary}</td>
                                                    <td>{item.amount}</td>
                                                    <td>{item.transactionType}</td>
                                                    <td>{item.closingAmount}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Transactions));

