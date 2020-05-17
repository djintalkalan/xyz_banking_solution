import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { history } from '../../routes';
import CanvasJSReact from '../../assets/canvasjs.react';
import AccountList from '../../constants/AccountList';
import TransactionsList from '../../constants/TransactionsList';
import moment from 'moment'
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title: {
        text: "Column Chart With Index"
    },
    axisY: [{
        title: "Amount",
        labelFontColor: "#3f51b5",
        titleFontColor: "#3f51b5",
        suffix: "k"
    }],
    axisX: [{
        title: "Months",
        // lineColor: "#3f51b5",
        // tickColor: "#3f51b5",
        // labelFontColor: "#3f51b5",
        // titleFontColor: "#3f51b5",
    }],
    data: [{
        type: "line", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        name:'Debited Amout',
        indexLabelPlacement: "outside",
        yValueFormatString: "#,##0.0K",
        showInLegend: true,
        dataPoints: [
        ]
    }, {
        type: "line", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",

        name:'Credited Amount',
        indexLabelPlacement: "outside",
        yValueFormatString: "#,##0.0K",
        showInLegend: true,
        dataPoints: [
        ]

    }]
}

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountList: [],
            selectedIndex: 0,
            selectedYear: 2020,
            toogle: false
        }
        this.chart = null
    }

    componentWillMount() {
        console.log(this.state.userDataReducer)
        const { customerId } = this.props.userDataReducer
        const accountList = AccountList.filter((item, index) => {
            return item.customerId == customerId
        })
        this.setState({ accountList })
    }
    componentDidMount() {
        this.setTransactionList(this.state.accountList[0])
    }

    setTransactionList(selectedItem) {
        const debitedList = []
        const creditedList = TransactionsList.filter((item, i) => {
            if (item.accountId == selectedItem.accountId && item.transactionType == "Debited") {
                debitedList.push(item)
            }
            return item.accountId == selectedItem.accountId && item.transactionType == "Credited"
        })
        console.log("debitedList:", debitedList)
        console.log("creditedList:", creditedList)
        let dataPointsDebited = []
        let dataPointsCredited = []
        debitedList.forEach((element, index) => {
            if (moment(element.date).format("YYYY") == this.state.selectedYear) {
                let found = false
                //checking if any transaction added on same date
                dataPointsDebited.some((item, index) => {
                    if (JSON.stringify(item.x) == JSON.stringify(moment(element.date).toDate()) && item.y != null) {
                        //Here found a transaction of same date and we will add our amount at this date
                        dataPointsDebited[index].y = parseFloat(dataPointsDebited[index].y) + (parseFloat(element.amount) / parseFloat(1000))
                        // set found variable true
                        found = true
                        // exit from Array.some because we found our amount and already updated amount at founded date
                        return true;
                    }
                })
                if (found == false) {
                    //We Itrate points array an no entry found for required date so we creating new entry
                    dataPointsDebited.push({
                        x: moment(element.date).toDate(),
                        y: (parseFloat(element.amount) / parseFloat(1000))
                    })
                }
            }
        });
        creditedList.forEach((element, index) => {
            if (moment(element.date).format("YYYY") == this.state.selectedYear) {
                let found = false
                dataPointsCredited.some((item, index) => {
                    if (JSON.stringify(item.x) == JSON.stringify(moment(element.date).toDate()) && item.y != null) {
                        dataPointsCredited[index].y = parseFloat(item.y) + (parseFloat(element.amount) / parseFloat(1000))
                        found = true
                        return true;
                    }
                })
                if (found == false) {
                    dataPointsCredited.push({
                        x: moment(element.date).toDate(),
                        y: parseFloat(element.amount) / parseFloat(1000)
                    })
                }
            }
        });
        console.log("dataPointsCredited", dataPointsCredited)
        console.log("dataPointsDebited", dataPointsDebited)
        options.data[0].dataPoints = dataPointsDebited
        options.data[1].dataPoints = dataPointsCredited
        if (this.chart != null) {
            this.chart.options = options
            this.chart.render()
        }
    }

    render() {
        return (
            <div className="dashboardCt">
                <div className="container-fluid">
                    <div className="inner">
                        <div className="row">
                            <div className="col-md-12 pt20">
                                <CanvasJSChart onRef={(ref) => this.chart = ref} options={options} />
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
                                            this.state.accountList.map((item, index) => (
                                                <tr key={index} onClick={() => { this.setState({ selectedIndex: index }); this.setTransactionList(item) }} style={{ backgroundColor: this.state.selectedIndex == index ? '#04ff0047' : null }}>
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

