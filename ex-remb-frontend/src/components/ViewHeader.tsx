import React from 'react'
import { Jumbotron, Container } from 'reactstrap';
import { User } from '../models/User';

interface IViewHeaderProps {
    loggedInUser?: User | null;
    heading?: string;
}

export class ViewHeader extends React.Component<IViewHeaderProps> {

    render() {
        return (
            <Jumbotron>
                <Container>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            {!this.props.heading ?
                            <h2 className="page-title">{this.props.loggedInUser ? 'Welcome' : null} {this.props.loggedInUser?.firstName} {this.props.loggedInUser?.lastName}</h2>
                            : 
                            <h2 className="fin-title">{this.props.heading}</h2>
                            }

                        </div>
                    </div>
                </Container>
            </Jumbotron>
        );
    }
}