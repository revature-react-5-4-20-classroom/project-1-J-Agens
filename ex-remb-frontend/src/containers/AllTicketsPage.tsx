import React from 'react';
import { User } from '../models/User';
import { Reimbursement } from '../models/Reimbursement';
import { Jumbotron, Container, Row, Table } from 'reactstrap';
import { getAllTickets } from '../api/projectClient';

// Needed later to approve/deny/resolve requests.
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
                return (
                    <tr key={ticket.reimbursementId} className="pending-ticket">
                        <td>{ticket.author}</td>
                        <td>{ticket.amount}</td>
                        <td>{ticket.dateSubmitted}</td>
                        <td>{ticket.dateResolved}<i className="gray">pending</i></td>
                        <td>{ticket.resolver}<i className="gray">pending</i></td>
                    </tr>
                    );
            } else if(ticket.status === 2) {
                return (
                    <tr key={ticket.reimbursementId} className="approved-ticket">
                        <td>{ticket.author}</td>
                        <td>{ticket.amount}</td>
                        <td>{ticket.dateSubmitted}</td>
                        <td>{ticket.dateResolved}</td>
                        <td>{ticket.resolver}</td>
                    </tr>
                );
            } else if (ticket.status === 3){
                return (
                    <tr key={ticket.reimbursementId} className="denied-ticket">
                        <td>{ticket.author}</td>
                        <td>{ticket.amount}</td>
                        <td>{ticket.dateSubmitted}</td>
                        <td>{ticket.dateResolved}</td>
                        <td>{ticket.resolver}</td>
                    </tr>
                );
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
            <Container fluid="xl">
                <Row>
                    <div className="col-12">
                    <Table size="lg">
                        <thead>
                            <th>Author</th> 
                            <th>Amount</th> 
                            <th>Date Submitted</th> 
                            <th>Date Resolved</th>
                            <th>Resolver</th> 
                        </thead>
                        <tbody>
                            {this.generateRembListItems(this.state.allTickets)}
                        </tbody>
                    </Table>
                    </div>
                </Row>
            </Container>
          </div>
        )
    }
}