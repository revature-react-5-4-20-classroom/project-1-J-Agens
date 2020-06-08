import React from 'react';
import { User } from '../models/User';
import { Jumbotron, Container, Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { resolveReimbursement, getAllTickets } from '../api/projectClient';
import { Reimbursement } from '../models/Reimbursement';

interface IResolveTicketPageProps {
    loggedInUser: User | null;
}

interface IResolveTicketPageState {
    tickets: Reimbursement[];
    reimbursementId: number ;
    dateResolved: string;
    status: number;
    isError: boolean;
    errorMessage: string;
}

export class ResolveTicketPage extends React.Component<any, IResolveTicketPageState> {
    
    constructor(props : any) {
        super(props);
        this.state = {
            tickets: [],
            reimbursementId: 0,
            dateResolved: '',
            status: 2,
            isError: false,
            errorMessage: ''
        }
    }

    async componentDidMount() {
        const respTickets = await getAllTickets();
        this.setState({tickets: respTickets});
    }

    handleChange = async (e : any) => {
        if (e.target.name === "reimbursementId") {
            this.setState({reimbursementId: e.target.value});
        } else if (e.target.name === "dateResolved") {
            this.setState({dateResolved: e.target.value});
        } else if (e.target.name === "status") {
            this.setState({status: e.target.value});
        }
    }

    handleSubmit = async (e : any) => {
        e.preventDefault();
        
        try {
            const newRemb = await resolveReimbursement(
                this.state.reimbursementId,
                this.state.dateResolved,
                this.props.loggedInUser.userId,
                this.state.status
            );
            console.log('REIMBURSEMENT RESOLVED', newRemb);
        } catch (error) {
            this.setState({isError: true, errorMessage: error.message + " please include required fields."});
        } finally {
            this.setState({
                reimbursementId: 0,
                dateResolved: '',
                status: 1
            });
        }
    }

    generateReimbursementList = (rembs : Reimbursement[]) => {
        const filterdRems = rembs.filter((remb) =>  {
            if (remb.status === 1) {
                return remb;
            }
        });
        return filterdRems.map((rem) => {
            return <option key={rem.reimbursementId} value={rem.reimbursementId}>{rem.reimbursementId} amount: ${rem.amount}</option>
        });
    }

    render() {
        const rembOptions = this.generateReimbursementList(this.state.tickets);
        console.log("ResolveTicketPageProps: ", this.props);
        console.log("ResolveTicketPageState: ", this.state);
        
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <h2 className="fin-title">Resolve A Ticket</h2>
                            </div>
                        </div>
                    </Container>
                </Jumbotron>
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="reimbursementIdInput">Reimbursement ID</Label>
                                    <Input value={this.state.reimbursementId} onChange={this.handleChange} type="select" name="reimbursementId" id="reimbursementIdInput">
                                        {rembOptions}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="dateResolvedInput">Date</Label>
                                    <Input value={this.state.dateResolved} onChange={this.handleChange} type="text" name="dateResolved" id="dateResolvedInput" placeholder="DD/MM/YYYY" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="typeInput">Status</Label>
                                    <Input value={this.state.status} onChange={this.handleChange} type="select" name="status" id="statusInput">
                                        <option value={2}>Approved</option>
                                        <option value={3}>Denied</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button>Submit</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}