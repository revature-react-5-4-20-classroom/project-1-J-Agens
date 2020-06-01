import React from 'react';
import { User } from '../models/User';
import { Table } from 'reactstrap';

interface IUserInfoTableProps {
    loggedInUser : User
}

export const UserInfoTable = (props : IUserInfoTableProps) => {
    return (
        <Table size="sm">
            <tbody>
                <tr>
                    <th scope="row">Username</th>
                    <td>{props.loggedInUser.username}</td>
                </tr>
                <tr>
                    <th scope="row">First Name</th>
                    <td>{props.loggedInUser.firstName}</td>
                </tr>
                <tr>
                    <th scope="row">Last Name</th>
                    <td>{props.loggedInUser.lastName}</td>
                </tr>
                <tr>
                    <th scope="row">Email</th>
                    <td>{props.loggedInUser.email}</td>
                </tr>
                <tr>
                    <th scope="row">Role</th>
                    <td>{props.loggedInUser.role ? props.loggedInUser.role.role : null}</td>
                </tr>
            </tbody>
        </Table>
    )
}