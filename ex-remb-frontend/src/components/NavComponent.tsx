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
    NavbarText
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
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand tag={Link} to="/">ERS</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="/">Home</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Options
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                        Option 1
                        </DropdownItem>
                        <DropdownItem>
                        Option 2
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                        Reset
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                    {props.loggedInUser ? 
                        <NavLink tag={Link} onClick={props.logOut}>Log Out</NavLink>
                        :
                        <NavLink tag={Link} to="/">Login</NavLink>
                    }
                </NavItem>
            </Nav>
            <NavbarText>{props.loggedInUser ? props.loggedInUser.username : 'Please Log In'}</NavbarText>
            </Collapse>
        </Navbar>
    );
}