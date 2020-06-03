import React from 'react';
import { User } from '../models/User';
import { Table, Button, ButtonGroup } from 'reactstrap';
import { Role } from '../models/Role';
import { editMyInfo } from '../api/projectClient';

interface IUserEditTableProps {
    loggedInUser: User | null;
    toggleEdit: () => void;
    setAppUser: (user: User) => void
} 

interface IUserEditTableState {
    username: string;
    // firstName: string; // NOT NECESSARY
    // lastName: string;  // NOT NECESSARY
    email: string;
    // role: Role;        // MAYBE LATER
}

export class UserEditTable extends React.Component<IUserEditTableProps, IUserEditTableState>{

    constructor(props : IUserEditTableProps) {
        super(props);
        this.state = {
            username: '',
            email: ''
        };
    }

    handleChange = (e : any) => {
        if (e.target.name === "username") {
            this.setState({username: e.currentTarget.value});
        } else if (e.target.name === "email") {
            this.setState({email: e.currentTarget.value});
        } else {
            console.log("nothing is happening");
        }
    }

    handleSubmit = async (e : any) => {
        e.preventDefault();
        try {
            if(this.props.loggedInUser) {
                const editedUser : User = await editMyInfo(this.props.loggedInUser.userId, this.state.username, this.state.email)
                this.setState({
                    username: '',
                    email: ''
                });
                this.props.toggleEdit();
                this.props.setAppUser(editedUser);
            } else {
                console.log("User not logged in. UserEditTable Component props are: ", this.props);
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    
    render() {
        console.log("UserEditTable State: ", this.state);
        console.log("UserEditTable Props: ", this.props);
        
        return (
            <form onSubmit={this.handleSubmit}>
                <Table size="sm">
            <tbody>
                <tr>
                    <th scope="row">Username</th>
                    <td>
                        <input 
                            onChange={this.handleChange} 
                            type="text" 
                            value={this.state.username} 
                            name="username" 
                            id="usernameInput" 
                            placeholder="no change"
                        />
                    </td>
                </tr>
                <tr>
                    <th scope="row">First Name</th>
                    <td className="unavailable">{this.props.loggedInUser?.firstName}</td>
                </tr>
                <tr>
                    <th scope="row">Last Name</th>
                    <td className="unavailable">{this.props.loggedInUser?.lastName}</td>
                </tr>
                <tr>
                    <th scope="row">Email</th>
                    <td>
                        <input 
                            onChange={this.handleChange} 
                            type="text" value={this.state.email} 
                            name="email" 
                            id="emailInput"
                            placeholder="no change"
                        />
                    </td>
                </tr>
                <tr>
                    <th scope="row">Role</th>
                    <td className="unavailable">{this.props.loggedInUser?.role ? this.props.loggedInUser.role.role : null}</td>
                </tr>
            </tbody>
            <Button onClick={this.props.toggleEdit}>Cancel</Button>
            <Button color="primary">Save</Button>
        </Table>
            </form>
        );
    }
}