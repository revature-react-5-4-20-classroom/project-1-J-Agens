import React from 'react';
import { User } from '../models/User';
import { ViewHeader } from '../components/ViewHeader';
import { Container, Row, Col, Table, Input, FormGroup } from 'reactstrap';
import { getAllEmployees } from '../api/projectClient';

interface IAllEmployeeState {
    allEmployees : User[];
    searchKeyword : string;
}

export class AllEmployeesPage extends React.Component<any, IAllEmployeeState> {

    constructor(props : any) {
        super(props);
        this.state = {
            allEmployees: [],
            searchKeyword: ''
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

    // generateEmployees = (employees : User[]) : any => {
    //     return this.state.allEmployees.map((employee) => {
    //         return (
    //             <Col key={employee.userId} className="test-box">

    //                     {/* <thead>
    //                         <th>Employee ID</th>
    //                         <th>First Name</th>
    //                         <th>Last Name</th>
    //                         <th>Email</th>
    //                         <th>Title</th>
    //                     </thead> */}

    //                         <ul>
    //                             <li>ID# {employee.userId}</li>
    //                             <li>{employee.firstName}</li>
    //                             <li>{employee.lastName}</li>
    //                             <li>{employee.email}</li>
    //                             <li>{employee.role?.role}</li>
    //                          </ul>


    //             </Col>
    //         );

    //     })
    // } 

    // generateBootStrapStuff = () : any => {
    //     let myArr = [
    //         1, 2, 3,
    //         4, 5, 6, 
    //         7, 8, 9,
    //         10, 11, 12,
    //         13, 14, 15,
    //         16, 17, 18
    //     ];

        // return myArr.map((el, idx) => {
        //     return <Col key={idx} className="shit-box">{el}</Col>

        // })
            
        
    // }

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
            return (
                <Col key={employee.userId} className="test-box">
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
        
        return (
            <div>
                <ViewHeader heading="All Employees" />
                <Container fluid="xl">
                <FormGroup row>
                    <Input onChange={this.searchHandler} type="text" name="search" id="search-bar" placeholder="search by name" value={this.state.searchKeyword} />
                </FormGroup>
                <Row xs="1" sm="2" md="4">{searchResults}</Row>
                </Container>
            </div>
        );
    }
    
}