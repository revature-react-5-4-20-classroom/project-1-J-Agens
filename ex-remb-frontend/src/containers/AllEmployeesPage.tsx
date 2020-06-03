import React from 'react';
import { User } from '../models/User';
import { ViewHeader } from '../components/ViewHeader';
import { Container, Row, Col, Table, Input, FormGroup } from 'reactstrap';
import { getAllEmployees } from '../api/projectClient';
import { AllTicketsByAuthor } from './AllTicketsByAuthor';

interface IAllEmployeeState {
    allEmployees : User[];
    searchKeyword : string;
    author: number;
    authorFirstName: string;
}

export class AllEmployeesPage extends React.Component<any, IAllEmployeeState> {

    constructor(props : any) {
        super(props);
        this.state = {
            allEmployees: [],
            searchKeyword: '',
            author: 0,
            authorFirstName: ''
        };
    }

    async componentDidMount() {
        const people = await getAllEmployees();
        this.setState({allEmployees: people})
    }

    searchHandler = (event : any) : void => {
        let keyword = event.target.value;
        this.setState({searchKeyword: keyword})
    }

    // NOT implemented yet
    handleEmployeeClick = (emp : number, firstName : string) : void => {
        this.setState({author: emp, authorFirstName: firstName});
        console.log('clicked');
        
    }

    toggleAuthor = () : void => {
        this.setState({author: 0})
    }

    render() {
        console.log('state', this.state);
        const searchFilter = this.state.allEmployees.filter((employee) => {
            if (this.state.searchKeyword === '') {
                return employee;
            } else if(employee.firstName?.toLowerCase().includes(this.state.searchKeyword.toLowerCase()) || employee.lastName?.toLowerCase().includes(this.state.searchKeyword)) {
                return employee;
            }
        })
        const searchResults = searchFilter.map(employee => {
            const EMP = employee;
            return (
                <Col key={employee.userId} className="test-box" onClick={(e) => {return this.handleEmployeeClick(EMP.userId, EMP.firstName || '')}}>
                            <ul>
                                <li>ID# {employee.userId}</li>
                                <li>{employee.firstName}</li>
                                <li>{employee.lastName}</li>
                                <li>{employee.email}</li>
                                <li>{employee.role?.role}</li>
                            </ul>
                        </Col>
            );
            });
        console.log('search results: ', searchResults);
        
        return (<div> 
                {
                this.state.author === 0 ? <div>
                <ViewHeader heading="All Employees" /> 
                    <Container fluid="xl">
                    <FormGroup row>
                        <Input onChange={this.searchHandler} type="text" name="search" id="search-bar" placeholder="search by name" value={this.state.searchKeyword} />
                    </FormGroup>
                    <Row xs="1" sm="2" md="4">{searchResults}</Row>
                    </Container></div> : <div>
                        <AllTicketsByAuthor author={this.state.author} authorFirstName={this.state.authorFirstName} toggleAuthor={this.toggleAuthor} />
                        </div> 
                    }
            </div>
        );
    }
    
}