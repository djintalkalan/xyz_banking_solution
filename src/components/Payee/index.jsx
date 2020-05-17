import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { history } from '../../routes';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Constants from '../../constants/Constants';


//Open console and perform an action on page


class Payee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddPayeeVisible: false,
            name: '',
            accountNumber: '',
            ifsc: '',
            nickname: '',
            payeeId: "",
            payeeList: []
        }

    }


    handleSubmitEvidence = (e) => {
        e.preventDefault();
        console.log("stateInfo", this.state);
    };







    componentWillMount() {
        let payeeList = JSON.parse(localStorage.getItem(Constants.PAYEE_KEY))
        if (payeeList && payeeList.length > 0) {
            let filteredPayeeList = payeeList.filter((item, index) => {
                return item.customerId == this.props.userDataReducer.customerId
            })
            this.setState({ payeeList: filteredPayeeList })
        }
    }

    handleSubmitPayee(event) {

    }

    closePayeeModal() {
        {
            this.setState({
                isAddPayeeVisible: false, name: '',
                accountNumber: '',
                ifsc: '',
                nickname: '',
                payeeId: "",
            })
        }
    }

    onPressSaveChanges() {

        const { name, accountNumber, ifsc, nickname, payeeId } = this.state
        let payeeList = JSON.parse(localStorage.getItem(Constants.PAYEE_KEY))
        const payload = { name, accountNumber, ifsc, nickname, customerId: JSON.stringify(this.props.userDataReducer.customerId), payeeId: payeeId ? payeeId : JSON.stringify(parseInt(payeeList[payeeList.length - 1].payeeId) + 1) }
        console.log(JSON.stringify(payload))
        if (payeeId) {
            let index = payeeList.findIndex(({ payeeId }) => payeeId == payload.payeeId);
            payeeList[index] = payload
            this.state.payeeList[this.state.payeeList.findIndex(({ payeeId }) => payeeId == payload.payeeId)] = payload
        } else {
            let found = false
            payeeList.some((item, index) => {
                if (item.accountNumber == payload.accountNumber && item.customerId == this.props.userDataReducer.customerId) {
                    alert("An Payee with this account number already exist")
                    found = true
                    return true
                }
            })
            if (found == false) {
                payeeList.push(payload)
                this.state.payeeList.push(payload)
            }
        }
            console.log(JSON.stringify(payeeList))
            localStorage.setItem(Constants.PAYEE_KEY, JSON.stringify(payeeList))
            this.closePayeeModal()
        

    }



    renderAddPayeeModal() {
        const { name, accountNumber, ifsc, nickname, payeeId } = this.state
        return (
            <Modal show={this.state.isAddPayeeVisible} onHide={() => { this.setState({ isAddPayeeVisible: false }) }}>
                <Modal.Header closeButton >
                    <Modal.Title>Add Payee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="form-group">
                            <span>Name</span>
                            <input type="text"
                                value={name}
                                onChange={(event) => this.setState({ name: event.target.value })}
                                className="form-control" name="payee_name" id="payee_name" placeholder="Enter Payee Name" />
                        </div>

                        <div className="form-group">
                            <span>Account No.</span>
                            <input type="text"
                                value={accountNumber}
                                onChange={(event) => this.setState({ accountNumber: event.target.value })}
                                className="form-control" name="payee_name" id="payee_name" placeholder="Enter Account Number" />
                        </div>
                        <div className="form-group">
                            <span>IFSC</span>
                            <input type="text"
                                value={ifsc}
                                onChange={(event) => this.setState({ ifsc: event.target.value })}
                                className="form-control" name="ifsc" id="ifsc" placeholder="Enter IFSC Code" />
                        </div>

                        <div className="form-group">
                            <span>Nick Name</span>
                            <input type="text"
                                value={nickname}
                                onChange={(event) => this.setState({ nickname: event.target.value })}
                                className="form-control" name="nickname" id="nickname" placeholder="Enter Nick Name" />
                        </div>

                        <Button variant="secondary" onClick={() => this.closePayeeModal()} className="mr10">
                            Close
                        </Button>
                        <Button type="submit" variant="primary" onClick={() => { this.onPressSaveChanges() }}>
                            Save Changes
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }


    editPayee(item) {
        const { name, accountNumber, ifsc, nickname, payeeId } = item
        this.setState({ name, accountNumber, ifsc, nickname, payeeId, isAddPayeeVisible: true })
    }

    onDeletePayee(item, reload) {
        let payeeList = JSON.parse(localStorage.getItem(Constants.PAYEE_KEY))
        payeeList.splice(payeeList.findIndex(function (i) {
            return i.payeeId === item.payeeId;
        }), 1);
        localStorage.setItem(Constants.PAYEE_KEY, JSON.stringify(payeeList))
        this.state.payeeList.splice(this.state.payeeList.findIndex(function (i) {
            return i.payeeId === item.payeeId;
        }), 1);       // this.setState({})

        if (reload) {
            this.setState({ isReload: !this.state.isReload })
        }
    }



    render() {
        return (
            <div className="dashboardCt">
                <div className="container-fluid">
                    <div className="inner">

                        {this.renderAddPayeeModal()}
                        {/* {this.renderEvidenceModal()} */}



                        <div className="row pt40">
                            <div className="col-md-4">
                                <div className="search_bar">
                                    <font style={{ fontSize: 25 }}>Payee List</font>
                                </div>
                            </div>
                            <div className="col-md-8 text-right">
                                <button onClick={() => this.setState({ isAddPayeeVisible: true })} className="btn btn-success">Add New Payee</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table table-striped mt30">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Account Number</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.payeeList.map((item, index) => (
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{item.name}</td>
                                                    <td>{item.accountNumber}</td>
                                                    <td><button onClick={() => { this.editPayee(item) }} className="btn btn-sm btn-primary">Edit</button></td>
                                                    <td><button onClick={() => { this.onDeletePayee(item, true) }} className="btn btn-sm btn-danger">Delete</button></td>

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

export default connect(mapStateToProps, mapDispatchToProps)(Payee);

