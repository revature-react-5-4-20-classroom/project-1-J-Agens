import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button
  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { User } from '../models/User';

interface INavComponentProps {
    loggedInUser: User | null,
    logOut: () => void;
}

export const NavComponent = (props : INavComponentProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const generateManagerItems = (user : User | null) => {
        if (user) {
            if (user.role) {
                if(user.role.roleId === 2) {
                    return (
                        <React.Fragment>
                            <NavItem>
                                <NavLink tag={Link} to="/reimbursements" id="fin-nav-01">Tickets</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/users" id="fin-nav-02">Employees</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/reimbursements/resolve" id="fin-nav-03">Resolve Ticket</NavLink>
                            </NavItem>
                        </React.Fragment>
                    );
                } else if (user.role.roleId == 3) {
                    return (<React.Fragment>
                        <NavItem>
                            <NavLink tag={Link} to="/admin" id="admin-nav">Admin</NavLink>
                        </NavItem>
                    </React.Fragment>);
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } else return null;
    }

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand tag={Link} to="/">ERS</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="/" id="emp-nav-01"> Home </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/reimbursements/new" id="emp-nav-02"> New + </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={`/reimbursements/author/userId/${props.loggedInUser?.userId}`} id="emp-nav-05"> My Tickets </NavLink>
                </NavItem>
                {generateManagerItems(props.loggedInUser)}
                <NavItem>
                    {props.loggedInUser ? 
                        <NavLink tag={Link} onClick={props.logOut} to="/login" id="emp-nav-03"> Log Out </NavLink>
                        :
                        <NavLink tag={Link} to="/login" id="emp-nav-04">Login</NavLink>
                    }
                </NavItem>
            </Nav>
            <NavbarText>{props.loggedInUser ? props.loggedInUser.username : 'Please Log In'}</NavbarText>
            </Collapse>
        </Navbar>
    );
}