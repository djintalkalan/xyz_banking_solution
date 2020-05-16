import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from "../dashboard"
import DashboardLayout from '../layouts/DashboardLayout'
import Transactions from '../Transactions';
import Payee from '../Payee';



const filterScreen = (path) => {
    switch (path) {
        case '/':
            return <Dashboard />
        case '/transactions':
            return <Transactions />
        case '/payee':
            return <Payee />

    }
}

const DashBoardModule = ({ match }) => {
    return (
        <DashboardLayout>
            <Route path={`${match.url}`} render={() => filterScreen(match.url)} />
        </DashboardLayout>
    )
}

export default DashBoardModule


