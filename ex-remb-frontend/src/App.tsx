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

    setAppUser = (user : User) : void => {
        this.setState({
            loggedInUser: user
        });
    }
    
    logOut = () : void => {
        this.setState({
            loggedInUser: null
        })
    }

    render() {
        return (
            <div>
                <NavComponent loggedInUser={this.state.loggedInUser} logOut={this.logOut}/>
                <Switch>
                    <Route exact path="/">
                        {this.state.loggedInUser ? 
                            <Home /> :
                            <LoginComponent setAppUser={this.setAppUser}/>
                        }
                    </Route>
                </Switch>
            </div>
        )
    }
}