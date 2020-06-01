import React from 'react';
import { Container, Jumbotron, Table } from 'reactstrap';
import { User } from '../models/User';
// import { Role } from '../models/Role';
import { ViewHeader } from '../components/ViewHeader';
import { UserInfoTable } from '../components/UserInfoTable';

// Changed props to any to avoid trouble with compiling
interface INewRembPageProps {
    loggedInUser: any
}

export class NewRembPage extends React.Component<INewRembPageProps, any> {

    
    render() {
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <h2>Submit a New Ticket</h2>
                            </div>
                        </div>
                    </Container>
                </Jumbotron>
                <Container>
                    <h4>Form goes here</h4>
                </Container>
            </div>
        );
    }
}