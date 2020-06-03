import React from 'react';
import { User } from '../models/User';
import { ViewHeader } from '../components/ViewHeader';
import { Container, Row, Col, Table } from 'reactstrap';
import { getAllEmployees } from '../api/projectClient';

interface IAllEmployeeState {
    allEmployees : User[];
}

export class AllEmployeesPage extends React.Component<any, IAllEmployeeState> {

    constructor(props : any) {
        super(props);
        this.state = {
            allEmployees: []
        };
    }

    async componentDidMount() {
        const people = await getAllEmployees();
        this.setState({allEmployees: people})
    }

    generateEmployees = (employees : User[]) : any => {
        return this.state.allEmployees.map((employee) => {
            return (
                <Col key={employee.userId} className="test-box">

                        {/* <thead>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Title</th>
                        </thead> */}

                            <ul>
                                <li list-style-type="none">ID# {employee.userId}</li>
                                <li>{employee.firstName}</li>
                                <li>{employee.lastName}</li>
                                <li>{employee.email}</li>
                                <li>{employee.role?.role}</li>
                             </ul>


                </Col>
            );

        })
    } 

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
        return (
            <div>
                <ViewHeader heading="All Employees" />
                <Container fluid="xl">
                <Row xs="1" sm="2" md="4">{this.generateEmployees(this.state.allEmployees)}</Row>
                </Container>
            </div>
        );
    }
    
}