import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logo from '../../../public/images/profile.jpg';
import { history } from '../../routes';
// import Dropdown from 'react-bootstrap/Dropdown';







class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        }

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);

    }

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu() {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }



    render() {
        return (
            <header>
                <div className="inner">
                    {/* <a className={this.props.expanded?'open':'close'} onClick={()=>{this.props.toogleHandler(!this.props.expanded)}} /> */}
                    <div >
                        <a style={{ margin: 10, fontSize: 20 }} >XYZ Banking Solutions</a>
                    </div>
                    {/* <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}
                    <a src="#" className="logoutCt" onClick={this.showMenu}>
                        <img src={logo} />
                    </a>

                    {
                        this.state.showMenu
                            ? (
                                <div className="menuCt">
                                    <button onClick={() => { history.push('/userprofile') }}> User Profile </button>
                                    <button onClick={(event) => {
                                        history.push('/login')
                                        localStorage.removeItem('userData');
                                        localStorage.removeItem('userToken');
                                        localStorage.setItem('isLogin', JSON.stringify(false));
                                        // localStorage.clear();
                                        event.preventDefault();
                                        // this.props.userDataAction(null)
                                        // this.props.userTokenAction(null)
                                        // this.props.isLoginAction(false)
                                    }}> Logout </button>
                                    <button> Change Password </button>
                                </div>
                            )
                            : (
                                null
                            )
                    }

                    {/* <a src="#" className="logoutCt">
                        <span className="logout"><FontAwesomeIcon onClick={(event)=>{
                           


                                //  clearing user's details from local storage
                                localStorage.removeItem('userData');
                                localStorage.removeItem('userToken');
                                localStorage.setItem('isLogin', JSON.stringify(false));
                                // clearing user's data in redux store
                        
                                this.props.userDataAction(null)
                                this.props.userTokenAction(null)
                                this.props.isLoginAction(false)
                                history.push('/login')
                                event.preventDefault();
                        
                        }} className="sign-out" icon={faSignOutAlt} color={'white'} /></span>
                    </a> */}
                </div>
            </header>
        );
    }
}

export default withRouter(Header);