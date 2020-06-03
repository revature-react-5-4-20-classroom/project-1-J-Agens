import React from 'react';
import { User } from '../models/User';
import { Reimbursement } from '../models/Reimbursement';
import { Jumbotron, Container, Row } from 'reactstrap';
import { getAllTickets } from '../api/projectClient';

interface IAllTicketsPageProps {
    loggedInUser : User | null;
}

interface IAllTicketsPageState {
    allTickets : Reimbursement[];
}
export class AllTicketsPage extends React.Component<IAllTicketsPageProps, IAllTicketsPageState> {

    constructor(props : IAllTicketsPageProps) {
        super(props);
        this.state = {
            allTickets: []
        }
    }

    async componentDidMount() {
        const respTickets = await getAllTickets();
        this.setState({allTickets: respTickets});
        console.log('There was a problem getting all tickets.');
    }

    generateRembListItems = (tickets : any) => {
        // Write a function that produces the list
        return tickets.map((ticket : Reimbursement) => {
            if (ticket.status === 1) {
                return <li className="pending-ticket" key={ticket.reimbursementId}>{ticket.amount} | {ticket.dateSubmitted}</li>;
            } else if(ticket.status === 2) {
                return <li className="approved-ticket" key={ticket.reimbursementId}>{ticket.amount} | {ticket.dateSubmitted}</li>;
            } else if (ticket.status === 3){
                return <li className="denied-ticket" key={ticket.reimbursementId}>{ticket.amount} | {ticket.dateSubmitted}</li>;
            } else return null
            
        });
    }

    render() {
        // const finalTickets = this.generateRembListItems(this.state.allTickets)
        console.log("AllTicketsPage Props: ", this.props);
        console.log("AllTicketsPage State: ", this.state);
        
        return (
          <div>
            <Jumbotron>
                <Container>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <h2 className="fin-title">All Tickets</h2>
                        </div>
                    </div>
                </Container>
            </Jumbotron>
            <Container>
                <Row>
                    <ul>{this.generateRembListItems(this.state.allTickets)}</ul>
                </Row>
            </Container>
          </div>
        )
    }
}