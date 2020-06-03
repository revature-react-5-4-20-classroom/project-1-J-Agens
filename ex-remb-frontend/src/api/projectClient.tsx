import axios from 'axios';
import { User } from '../models/User';
import { FailedLoginError } from '../errors/FailedLoginError';
import { Reimbursement } from '../models/Reimbursement';

const projectClient = axios.create({
    baseURL: 'http://13.58.192.151:3000',
    // baseURL: 'http://localhost:3000',
    withCredentials: true
});

export async function login(un : string, pw : string) : Promise<User> {
    try {
        const response = await projectClient.post('/login', {username: un, password: pw});
        const {userId, username, password, firstName, lastName, email, role} = response.data;
        return new User(userId, username, password, firstName, lastName, email, role);
    } catch (e) {
        if (e.response.status === 401) {
            throw new FailedLoginError('Failed to authenticate: ', un);
        } else {
            throw e;
        }
    }
}

export async function submitTicket(ath : number, amt : number, date : string, dsc : string, typ : number) : Promise<Reimbursement> {

    try {        
        const configObj = {author: ath, amount: amt, dateSubmitted: date, description: dsc, type: typ}
        const response = await projectClient.post('/reimbursements', configObj);
        const {
            reimbursementId, 
            author, 
            amount, 
            dateSubmitted, 
            dateResolved, 
            description, 
            resolver, 
            status, 
            type
        } = response.data;
        return new Reimbursement(
            reimbursementId,
            author,
            amount,
            dateSubmitted,
            dateResolved,
            description,
            resolver,
            status,
            type
        );
    } catch (e) {
        if (e.response.status === 400) {
            throw new FailedLoginError('Failed to Create new ticket: ', dsc);
        } else {
            throw e;
        }
    }
}

export async function getMyTickets(u : number) : Promise<Reimbursement[]> {
    try {
        const response = await projectClient.get(`/reimbursements/author/userId/${u}`);
        const myTickets = response.data.map((ticket : any) => {
            // Remember that date is a number, should be reformatted later
            const dateSub = ticket.dateSubmitted.slice(0, 10);
            return (new Reimbursement(
                ticket.reimbursementId, 
                ticket.author, 
                ticket.amount, 
                dateSub,
                ticket.dateResolved, 
                ticket.description, 
                ticket.resolver, 
                ticket.status, 
                ticket.type
            ));
        });
        return myTickets;
    } catch (e) {
        if (e.response.status === 400) {
            throw new FailedLoginError('Failed to get your tickets: ', `${u}`);
        } else {
            throw e;
        }
    }
}

export async function editMyInfo(uId : number, un: string, em: string) : Promise<User> {
    try {
        const configObj = {userId: uId, username: un, email: em}
        const response = await projectClient.patch('/users', configObj);
        const {userId, username, password, firstName, lastName, email, role} = response.data;
        return new User(userId, username, password, firstName, lastName, email, role);
    } catch (e) {
        if (e.response.status === 400) {
            throw new FailedLoginError('Failed to edit your info: ', un);
        } else {
            throw e;
        }
    }
}

export async function getAllTickets() : Promise<Reimbursement[]> {
    try {
        const response = await projectClient.get('/reimbursements');
        const ticketsArr : Reimbursement[] = response.data.map((ticket : any) => {
            const {
                reimbursementId, 
                author, 
                amount, 
                dateSubmitted, 
                dateResolved, 
                description, 
                resolver, 
                status, 
                type
            } = ticket;
            return new Reimbursement(
                reimbursementId,
                author,
                amount,
                dateSubmitted,
                dateResolved,
                description,
                resolver,
                status,
                type
            );
        });
        return ticketsArr;
    } catch (e) {
        if (e.response.status === 400) {
            throw new FailedLoginError('Failed to get to /rembs: ', "try again");
        } else {
            throw e;
        }
    }
}