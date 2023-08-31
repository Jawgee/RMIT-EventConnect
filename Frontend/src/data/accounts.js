import axios from 'axios';

const client = axios.create({
    baseURL: `http://localhost:4000/api/users`,
});

// Constants for localStorage
const LS_USER = 'user';

const verifyUser = async (email, password) => {
    // Sends the user to the backend
    try {
        let res = await client.post('/login', { email: email, password: password });
        if (res.status === 200) {
            // TODO: Add token to cookie
            console.log("success")
            console.log(res)
            document.cookie = res.data.token;
            return [true, ""];
        }
        return [false, "Something went wrong, try again"];
    } catch (e) {
        // TODO: return message from backend
        console.log(e.response);
        // return e.response.status;
        return [false, e.response.data.error];
    }
};

const registerUser = async (email, password, first_name, last_name) => {
    // Sends the user to the backend
    try {
        let res = await client.post('/createUser', { email: email, password: password, first_name: first_name, last_name: last_name });

        if (res.status === 200) {
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