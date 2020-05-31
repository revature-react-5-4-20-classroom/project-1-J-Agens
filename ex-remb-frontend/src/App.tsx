import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { LoginComponent } from './components/LoginComponent';
import { NavComponent } from './components/NavComponent';
import { User } from './models/User';
import { login } from './api/projectClient';

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

    render() {
        return (
            <div>
                <NavComponent loggedInUser={this.state.loggedInUser} logOut={this.logOut}/>
                <Switch>
                    <Route exact path="/">
                        {this.state.loggedInUser ? 
                            <Home loggedInUser={this.state.loggedInUser} /> :
                            <LoginComponent setAppUser={this.setAppUser} />
                        }
                    </Route>
                </Switch>
            </div>
        )
    }
}