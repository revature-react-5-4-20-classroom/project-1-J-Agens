import React from 'react';
import { User } from '../models/User';
import { Jumbotron, Container, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { Reimbursement } from '../models/Reimbursement';
import { getMyTickets } from '../api/projectClient';

interface IMyTicketsPageProps {
    loggedInUser?: User | null;
}

interface IMyTicketsPageState {
    myTickets: Reimbursement[];
}

export class MyTicketsPage extends React.Component<IMyTicketsPageProps, IMyTicketsPageState> {

    constructor(props : IMyTicketsPageProps) {
        super(props);
        this.state = {
            myTickets: []
        }
    }

    async componentDidMount() {
        if (this.props.loggedInUser) {
            const respTickets = await getMyTickets(this.props.loggedInUser.userId);
            this.setState({myTickets: respTickets});
        } else {
            console.log('There was a problem getting your tickets.');
        }
        
    }

    generateRembListItems = (tickets : Reimbursement[]) => {
        // Write a function that produces the list
        return tickets.map((ticket : Reimbursement) => {
            if (ticket.status === 1) {
                return <li className="pending-ticket" key={ticket.reimbursementId}>{ticket.amount} | {ticket.dateSubmitted}</li>;
            } else if(ticket.status === 2) {
                return <li className="approved-ticket" key={ticket.reimbursementId}>{ticket.amount} | {ticket.dateSubmitted}</li>;
            } else {
                return <li className="denied-ticket" key={ticket.reimbursementId}>{ticket.amount} | {ticket.dateSubmitted}</li>;
            }
            
        });
    }

    render() {
        return (
          <div>
            <Jumbotron>
                <Container>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <h2>My Tickets</h2>
                        </div>
                    </div>
                </Container>
            </Jumbotron>
            <Container>
                <Row>
                    <ul>{this.generateRembListItems(this.state.myTickets)}</ul>
                </Row>
            </Container>
          </div>
        )
    }
}