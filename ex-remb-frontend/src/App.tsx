import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { LoginComponent } from './components/LoginComponent';
import { NavComponent } from './components/NavComponent';
import { User } from './models/User';

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

    setAppUser = (user : User) => {
        this.setState({
            loggedInUser: user
        });
    } 

    render() {
        return (
            <div>
                <NavComponent loggedInUser={this.state.loggedInUser}/>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/login">
                        <LoginComponent />
                    </Route>
                </Switch>
            </div>
        )
    }
}