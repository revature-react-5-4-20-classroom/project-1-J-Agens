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
        console.log("amount is type: ", typeof amt);
        
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