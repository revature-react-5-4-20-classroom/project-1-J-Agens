import React from "react";
import { Reimbursement } from "../models/Reimbursement";

export const generateRembListItems = (tickets : any) => {
    // Produces a standard, color-coded, table structure for displaying tickets
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