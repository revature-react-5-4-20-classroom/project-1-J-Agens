import React from 'react';
import { Container, Jumbotron, Table } from 'reactstrap';
import { User } from '../models/User';
// import { Role } from '../models/Role';
import { ViewHeader } from '../components/ViewHeader';
import { UserInfoTable } from '../components/UserInfoTable';

// Changed props to any to avoid trouble with compiling
interface IHomeProps {
    loggedInUser: any
}

export class Home extends React.Component<IHomeProps, any> {

    
    render() {
        return (
            <div>
                <ViewHeader loggedInUser={this.props.loggedInUser} />
                <Container>
                    <UserInfoTable loggedInUser={this.props.loggedInUser} />
                </Container>
            </div>
        );
    }
}