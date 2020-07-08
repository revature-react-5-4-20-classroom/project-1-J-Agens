import React from 'react';
import { Container, Jumbotron, Form, Row, Col, FormGroup, Label, Input, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { User } from '../models/User';
import { submitTicket } from '../api/projectClient';

// Changed loggedInUser prop to any type to avoid trouble with compiling
interface INewRembPageProps {
    loggedInUser: any
}

interface INewRembPageState {
    amount: number;
    dateSubmitted: string; // 'DD/MM/YYYY'
    description: string;
    type: number;
    isError: boolean;
    errorMessage: string;
}

export class NewRembPage extends React.Component<INewRembPageProps, INewRembPageState> {

    constructor(props : INewRembPageProps) {
        super(props);
        this.state = {
            // author: this.props.loggedInUser.userId,
            amount: 0,
            dateSubmitted: '',
            description: '',
            type: 1,
            isError: false,
            errorMessage: ''
        }
    }


    handleChange = (e : any) => {
        switch (e.target.name) {
            case 'amount':
                this.setState({amount: parseFloat(e.target.value)});
                break;
            case 'dateSubmitted':
                this.setState({dateSubmitted: e.target.value})
                break;
            case 'description':
                this.setState({description: e.target.value});
                break;
            case 'type':
                this.setState({type: parseInt(e.target.value)});
            default:
                break;
        }
    }

    handleSubmit = async (e : any) => {
        e.preventDefault();
        
        try {
            const newRemb = await submitTicket(
                this.props.loggedInUser.userId,
                this.state.amount,
                this.state.dateSubmitted,
                this.state.description,
                this.state.type,
            );
            this.setState({
                amount: 0,
                dateSubmitted: '',
                description: '',
                type: 1
            });
            console.log('NEW REIMBURSEMENT CREATED', newRemb);
            
        } catch (error) {
            this.setState({isError: true, errorMessage: error.message + " please include required fields."});
        }
    }

    clearError = () => {
        this.setState({
            isError: false,
            errorMessage: ''
        });
    }

    
    render() {
        
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <h2 className="page-title">Submit a New Ticket</h2>
                            </div>
                        </div>
                    </Container>
                </Jumbotron>
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="amountInput">Amount</Label>
                                <Input value={this.state.amount} onChange={this.handleChange} type="number" min="1" step=".01" name="amount" id="amountInput"  placeholder="$00.00" />
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="dateSubmittedInput">Date of Expenditure</Label>
                                <Input value={this.state.dateSubmitted} onChange={this.handleChange} type="text" name="dateSubmitted" id="dateSubmittedInput" placeholder="DD/MM/YYYY" />
                            </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="descriptionInput">Description</Label>
                            <Input value={this.state.description} onChange={this.handleChange} type="text" name="description" id="descriptionInput" placeholder="Please provide a short description"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="typeInput">Select</Label>
                            <Input value={this.state.type} onChange={this.handleChange} type="select" name="type" id="typeInput">
                                <option value={1}>Lodging</option>
                                <option value={2}>Travel</option>
                                <option value={3}>Food</option>
                                <option value={4}>Other</option>
                            </Input>
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                    <Toast isOpen={this.state.isError}>
                        <ToastHeader toggle={this.clearError}>
                            Error!
                        </ToastHeader>
                        <ToastBody>
                            {this.state.errorMessage}
                        </ToastBody>
                    </Toast>
                </Container>
            </div>
        );
    }
}