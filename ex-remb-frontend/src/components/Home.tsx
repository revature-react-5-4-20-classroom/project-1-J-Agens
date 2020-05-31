import React from 'react';
import { Container, Jumbotron, Table } from 'reactstrap';
import { User } from '../models/User';
import { Role } from '../models/Role';

interface IHomeProps {
    loggedInUser: User | null;
}

export class Home extends React.Component<IHomeProps, any> {

    
    render() {
        let userObj : User; 
        if (this.props.loggedInUser) {
            userObj = this.props.loggedInUser;
        } else {
            userObj = new User(0, '', '', '', '', '', new Role(1, 'employee'));
        }
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <h2>Welcome {userObj.firstName} {userObj.lastName}</h2>
                            </div>
                        </div>
                    </Container>
                </Jumbotron>
                <Container>
                <Table size="sm">
                    <tbody>
                        <tr>
                            <th scope="row">Username</th>
                            <td>{userObj.username}</td>
                        </tr>
                        <tr>
                            <th scope="row">First Name</th>
                            <td>{userObj.firstName}</td>
                        </tr>
                        <tr>
                            <th scope="row">Last Name</th>
                            <td>{userObj.lastName}</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td>{userObj.email}</td>
                        </tr>
                        <tr>
                            <th scope="row">Role</th>
                            <td>{userObj.role ? userObj.role.role : null}</td>
                        </tr>
                    </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}