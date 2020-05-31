import React from 'react';
import { Container } from 'reactstrap';
import { User } from '../models/User';

interface IHomeProps {
    loggedInUser: User
}

export class Home extends React.Component<IHomeProps, any> {
    
    render() {
        return (
            <Container>
                <h2>Home Component</h2>
            </Container>
        );
    }
}