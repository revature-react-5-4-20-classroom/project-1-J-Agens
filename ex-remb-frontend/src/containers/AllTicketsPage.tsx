import React from 'react';
import { User } from '../models/User';
import { Reimbursement } from '../models/Reimbursement';
import { Jumbotron, Container, Row, Table } from 'reactstrap';
import { getAllTickets } from '../api/projectClient';
import { generateRembListItems } from '../subcomponents/generateRembListItems' 
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
                            <h2 className="fin-title" style={{textAlign: "center"}}>All Tickets</h2>
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
                            {generateRembListItems(this.state.allTickets)}
                        </tbody>
                    </Table>
                    </div>
                </Row>
            </Container>
          </div>
        )
    }
}