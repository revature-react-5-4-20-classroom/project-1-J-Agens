import React from 'react';
import { User } from '../models/User';
import { login } from '../api/projectClient';
import { Form, FormGroup, Label, Col, Input, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';

interface ILoginComponentProps {
    setAppUser: (user : User) => void;
}

interface ILoginComponentState {
    
    username: string;
    password: string;
    isError: boolean;
    errorMessage: string;
}

export class LoginComponent extends React.Component<ILoginComponentProps, ILoginComponentState> {
    
    constructor(props : ILoginComponentProps) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isError: false,
            errorMessage: ''
        }
    }
    
    handleChange = (e : any) => {
        if(e.target.name === 'username') {
            this.setState({
                username: e.target.value
            });
        } else {
            this.setState({
                password: e.target.value
            });
        }
    }

    clearError = () => {
        this.setState({
            isError: false,
            errorMessage: ''
        });
    }

    handleSubmit = async (e : any) => {
        e.preventDefault();
        try {
            const loggedInUser : User = await login(this.state.username, this.state.password);
            this.props.setAppUser(loggedInUser);
            this.setState({username: '', password: ''});
        } catch (error) {
            this.setState({password: '', isError: true, errorMessage: error.message});
        }
    }

    render() {
        return (
            <div className="container">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label for="username" sm={2}>Username</Label>
                        <Col sm={6}>
                            {/* onChange lets Input change state, value lets Input display state */}
                            <Input onChange={this.handleChange} value={this.state.username} type="text" name="username" id="username" placeholder="your username" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={2}>Password</Label>
                        <Col sm={6}>
                            {/* input can be set to required here with an attribute I don't remember */}
                            <Input onChange={this.handleChange} value={this.state.password} type="text" name="password" id="password" placeholder="password"></Input>
                        </Col>
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
                <Toast isOpen={this.state.isError}>
                    <ToastHeader toggle={this.clearError}>
                        Error!
                    </ToastHeader>
                    <ToastBody>
                        {this.state.errorMessage}
                    </ToastBody>
                </Toast>
            </div>
        )
    }
}