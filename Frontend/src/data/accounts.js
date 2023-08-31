import axios from 'axios';

// TODO: Add URL for backend here
const client = axios.create({
    baseURL: `http://localhost:4000/api`,
});

// Constants for localStorage
const LS_USER = 'user';

const verifyUser = async (email, password) => {
    // Sends the user to the backend
    try {
        let res = await client.post('/login', { email: email, password: password });
        if (res.status === 200) {
            // localStorage.setItem(res.data.email);
            console.log("success")
            return true;
        }
        return false;
    } catch (e) {
        // return e.response.status;
        return false;
    }
};

const registerUser = async (/*email, password,*/ first_name, last_name) => {
    // Sends the user to the backend
    try {
        let res = await client.post('/createUser', { /*email: email, password: password,*/ first_name: first_name, last_name: last_name });

        if (res.status === 200) {
            // localStorage.setItem(res.data.email);
            console.log("success")
            return true;
        }
        return false;
    } catch (e) {
        // return e.response.status;
        console.log(e)
        return false;
    }
};

export {verifyUser, registerUser}