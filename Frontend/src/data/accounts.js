import axios from 'axios';
import { CapacitorCookies } from '@capacitor/core';

// Axios stuff, will make sure that things are consistent etc
// Also handles all of the HTTP requests easily

const userClient = axios.create({
    baseURL: 'http://localhost:4000/api/users',
});

const tagsClient = axios.create({
    baseURL: 'http://localhost:4000/api/tags',
});

// Verifies the user via login
const verifyUser = async (data) => {
    // Return format: If it was successful, error message to be shown to the user
    // Sends the user to the backend
    try {
        const res = await userClient.post('/login', data);

        // If there was success
        if (res.status === 200) {
            CapacitorCookies.setCookie({ url: location.protocol, key: 'jwt', value: res.data.token });
            return [true, ''];
        }

        // Fallback, in case the code reaches here
        return [false, 'Something went wrong, try again'];
    } catch (e) {
        // If there was a 4xx/5xx response, it throws an error
        return [false, e.response.data.error];
    }
};

// Registers the user
const registerUser = async (data) => {
    // Return format: If it was successful, error message to be shown to the user
    // Sends the user to the backend
    try {
        const res = await userClient.post('/register', {
            ...data,
            // TODO: Edit this
            profile: 'Entrepreneur',
        });

        // If there was success
        if (res.status === 200) {
            await CapacitorCookies.setCookie({ url: 'http://' + location.host, key: 'jwt', value: res.data.token });
            return [true, { email: res.data.email, id: res.data.id }];
        }

        // Fallback, in case the code reaches here
        return [false, 'Something went wrong, try again'];
    } catch (e) {
        // If there was a 4xx/5xx response, it throws an error
        return [false, e.response.data.error];
    }
};

const getUserInfo = async (email) => {
    try {
        const res = await userClient.get(`/Email/${email}`);

        // If there was success
        if (res.status === 200) {
            return res.data;
        }

        // Fallback, in case the code reaches here
        return 'Something went wrong, try again';
    } catch (e) {
        // If there was a 4xx/5xx response, it throws an error
        return e.response.data.error;
    }
};

const editUser = async (id, data) => {
    try {
        delete data.id;
        const res = await userClient.put(`/${id}`, data);

        // If there was success
        if (res.status === 200) {
            await CapacitorCookies.setCookie({ url: 'http://' + location.host, key: 'jwt', value: res.data.token });
            return [true, ''];
        }

        // Fallback, in case the code reaches here
        return [false, 'Something went wrong, try again'];
    } catch (e) {
        // If there was a 4xx/5xx response, it throws an error
        return [false, e.response.data.error];
    }
};

const getTags = async (id) => {
    try {
        const res = await tagsClient.get(`/UserTagList/${id}`);

        // If there was success
        if (res.status === 200) {
            let data = res.data[0];
            delete data.first_name;
            delete data.last_name;
            return data;
        }

        // Fallback, in case the code reaches here
        return 'Something went wrong, try again';
    } catch (e) {
        // If there was a 4xx/5xx response, it throws an error
        return e.response.data.error;
    }
};

const updateTags = async (id, tags) => {
    try {
        const res = await tagsClient.put(`/UserInterests/${id}`, tags);

        // If there was success
        if (res.status === 200) {
            return [true, ''];
        }

        // Fallback, in case the code reaches here
        return [false, 'Something went wrong, try again'];
    } catch (e) {
        // If there was a 4xx/5xx response, it throws an error
        return [false, e.response.data.error];
    }
};

export { verifyUser, registerUser, getUserInfo, editUser, getTags, updateTags };
