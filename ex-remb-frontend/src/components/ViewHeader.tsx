import React from 'react'
import { Jumbotron, Container } from 'reactstrap';
import { User } from '../models/User';

interface IViewHeaderProps {
    loggedInUser: User
}

export class ViewHeader extends React.Component<IViewHeaderProps> {

    render() {
        return (
            <Jumbotron>
                <Container>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <h2>Welcome {this.props.loggedInUser.firstName} {this.props.loggedInUser.lastName}</h2>
                        </div>
                    </div>
                </Container>
            </Jumbotron>
        );
    }
}