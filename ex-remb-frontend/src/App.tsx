import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './containers/Home';
import { LoginComponent } from './components/LoginComponent';
import { NavComponent } from './components/NavComponent';
import { User } from './models/User';
import { login } from './api/projectClient';
import { NewRembPage } from './containers/NewRembPage';
import { MyTicketsPage } from './containers/MyTicketsPage';
import { AllTicketsPage } from './containers/AllTicketsPage';
import { AllEmployeesPage } from './containers/AllEmployeesPage';

interface IAppState {
    loggedInUser : User | null
}

export class App extends React.Component<any, IAppState> {

    constructor(props : any) {
        super(props);
        this.state = {
            loggedInUser: null
        }
    }

    async componentDidMount() {
        // not secure, but for making development easier
        const un : string | null = localStorage.getItem('username');
        const pw : string | null = localStorage.getItem('password');
        if (un && pw) {
            const autoLoggedInUser : User = await login(un, pw);
            this.setState({loggedInUser: autoLoggedInUser});
        } else {
            console.log('nothing happened');
        }
    }

    setAppUser = (user : User) : void => {
        this.setState({
            loggedInUser: user
        });
    }
    
    logOut = () : void => {
        localStorage.clear();
        this.setState({
            loggedInUser: null
        })
    }

    // async addNewReimbursement = () => {

    // }

    render() {
        return (
            <div>
                <NavComponent loggedInUser={this.state.loggedInUser} logOut={this.logOut}/>
                <Switch>
                    <Route 
                    exact path="/login" 
                    render={ routerProps => 
                        <LoginComponent {...routerProps} setAppUser={this.setAppUser} />
                    }>
                    </Route>
                    {this.state.loggedInUser ? 
                    <Switch>
                    <Route
                        exact path="/"
                        render={ routerProps => 
                            <Home {...routerProps} 
                                setAppUser={this.setAppUser} 
                                loggedInUser={this.state.loggedInUser ? this.state.loggedInUser : null}
                            />
                        }
                    />
                    <Route 
                        exact path="/reimbursements/new"
                        render={routerProps => 
                            <NewRembPage {...routerProps} loggedInUser={this.state.loggedInUser} />
                        }
                    />
                    <Route 
                        path="/reimbursements/author/userId"
                        render={routerProps =>
                            <MyTicketsPage {...routerProps} loggedInUser={this.state.loggedInUser} />
                        }
                    />
                    <Route 
                        exact path="/reimbursements"
                        render={routerProps => 
                            <AllTicketsPage {...routerProps} loggedInUser={this.state.loggedInUser} />
                        }
                    />
                    <Route 
                        exact path="/users"
                        render={routerProps => 
                            <AllEmployeesPage {...routerProps} />
                        }
                    />
                    </Switch>
                    : null}
                </Switch>
            </div>
        )
    }
}