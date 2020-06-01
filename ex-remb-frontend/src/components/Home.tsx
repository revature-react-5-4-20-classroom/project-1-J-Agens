import React from 'react';
import { Container, Jumbotron, Table } from 'reactstrap';
import { User } from '../models/User';
// import { Role } from '../models/Role';
import { ViewHeader } from './ViewHeader';
import { UserInfoTable } from './UserInfoTable';

interface IHomeProps {
    loggedInUser: User
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