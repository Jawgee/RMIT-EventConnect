import axios from 'axios';

// TODO: Add URL for backend here
const client = axios.create({
    baseURL: `127.0.0.1:3000/users`,
});

// Constants for localStorage
const LS_USER = 'user';

const verifyUser = async (email, pass) => {
    // Sends the user to the backend
    try {
        let res = await client.post('/login', { email: email, password: pass });
        if (res.status === 200) {
            localStorage.setItem(res.data.email);
            return true;
        }
        return false;
    } catch (e) {
        return e.response.status;
    }
};