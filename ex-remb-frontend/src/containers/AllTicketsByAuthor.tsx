import React from 'react';
import { User } from '../models/User';
import { Reimbursement } from '../models/Reimbursement';
import { getAllTickets, getMyTickets } from '../api/projectClient';
import { Container, Jumbotron, Row, Table, Button } from 'reactstrap';
import { generateRembListItems } from '../subcomponents/generateRembListItems';

interface IAllTicketsByAuthorProps {
    loggedInUser? : User | null; 
    author: number;
    authorFirstName: string;
    toggleAuthor: () => void;
}

interface IAllTicketsByAuthorState {
    authorTickets: Reimbursement[];
}

export class AllTicketsByAuthor extends React.Component<IAllTicketsByAuthorProps, IAllTicketsByAuthorState> {
    constructor(props : IAllTicketsByAuthorProps) {
        super(props);
        this.state = {
            authorTickets: []
        }
    }

    async componentDidMount() {
        const respTickets = await getMyTickets(this.props.author);
        this.setState({authorTickets: respTickets});
    }

    // MOVED to subcomponents directory
    // generateRembListItems = (tickets : any) => {...}

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
                            <h2 className="fin-title">{this.props.authorFirstName} Tickets</h2>
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
                            {generateRembListItems(this.state.authorTickets)}
                        </tbody>
                    </Table>
                    </div>
                </Row>
                <Row>
                    <Button onClick={this.props.toggleAuthor}>Back</Button>
                </Row>
            </Container>
          </div>
        )
    }
}