import React from 'react';
import { Container, Jumbotron, Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { User } from '../models/User';

// Changed loggedInUser prop to any type to avoid trouble with compiling
interface INewRembPageProps {
    loggedInUser: any
}

interface INewRembPageState {
    author: number;
    amount: number;
    dateSubmitted: string; // 'DD/MM/YYYY'
    description: string;
    type: number | null;
    isError: boolean;
    errorMessage: string;
}

export class NewRembPage extends React.Component<INewRembPageProps, INewRembPageState> {

    constructor(props : INewRembPageProps) {
        super(props);
        this.state = {
            author: this.props.loggedInUser.userId,
            amount: 0,
            dateSubmitted: '',
            description: '',
            type: null,
            isError: false,
            errorMessage: ''
        }
    }

    handleSubmit = (e : any) => {
        e.preventDefault();
    }

    
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
                    <Form onSubmit={this.handleSubmit}>
                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="amountInput">amount</Label>
                                <Input type="number" name="amount" id="amountInput" placeholder="$00.00" />
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="dateSubmittedInput">Date</Label>
                                <Input type="text" name="dateSubmitted" id="dateSubmittedInput" placeholder="DD/MM/YYYY" />
                            </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="descriptionInput">Description</Label>
                            <Input type="text" name="description" id="descriptionInput" placeholder="Please provide a short description"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="typeInput">Select</Label>
                            <Input type="select" name="type" id="typeInput">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </Input>
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}