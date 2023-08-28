import axios from 'axios';

// TODO: Add URL for backend here
const client = axios.create({
    baseURL: `http://localhost:4000/api`,
});

// Constants for localStorage
const LS_USER = 'user';

const verifyUser = async (email, pass) => {
    // Sends the user to the backend
    try {
        let res = await client.post('/login', { email: email, password: pass });
        if (res.status === 200) {
            // localStorage.setItem(res.data.email);
            console.log("success")
            return true;
        }
        return false;
    } catch (e) {
        return false;
        // return e.response.status;
    }
};

const registerUser = async (/*email, pass,*/ first_name, last_name) => {
    // Sends the user to the backend
    try {
        let res = await client.post('/createUser', { /*email: email, password: pass,*/ first_name: first_name, last_name: last_name });

        if (res.status === 200) {
            // localStorage.setItem(res.data.email);
            console.log("success")
            return true;
        }
        return false;
    } catch (e) {
        return e.response.status;
    }
};

export {verifyUser, registerUser}