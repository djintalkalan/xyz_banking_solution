import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 0
        }
    }

    render() {
        console.log("pathnameeee----->", window.location.pathname);
        this.state.path = window.location.pathname
        return (
            <div className="page-sidebar">

                <div className="sidebar-list position-relative">
                    <div className="box-circle ">
                        <Link to={'/'} className={"" + (this.state.path == '/' ? "active" : " ")}>
                            <i className="fa fa-tachometer" aria-hidden="true"></i>
                            <span>Summary</span>
                        </Link>
                    </div>

                    <div className="box-circle ">
                        <Link to={'/payee'} className={"" + (this.state.path == '/payee' ? "active" : " ")}>
                            <span>Payee</span>
                        </Link>
                    </div>


                    {/* <div className="box-circle ">
                        <Link to={'/addevidence'} className={"" + (this.state.path == '/addevidence' ? "active" : " ")}>
                        <span>Add Evidence</span>
                        </Link>
                    </div> */}

                </div>
            </div>
        );
    }
}

export default Sidebar;
