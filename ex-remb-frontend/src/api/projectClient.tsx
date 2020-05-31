import axios from 'axios';
import { User } from '../models/User';
import { FailedLoginError } from '../errors/FailedLoginError';

const projectClient = axios.create({
    baseURL: 'http://13.58.192.151:3000',
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