import axios from 'axios';

const userClient = axios.create({
    baseURL: 'http://localhost:4000/api/events',
});

// Creates an event
const addEvent = async (data) => {
    // Return format: If it was successful, error message to be shown to the user
    // Sends the user to the backend
    try {
        const res = await userClient.post('/', data);

        console.log(res);

        // If there was success
        if (res.status >= 200 && res.status <= 299) {
            return [true, ''];
        }

        // Fallback, in case the code reaches here
        return [false, 'Something went wrong, try again'];
    } catch (e) {
        // If there was a 4xx/5xx response, it throws an error
        return [false, e.response.data.error];
    }
};

const getProfile = async () => {
    try {
        const res = await userClient.get('/Categories/profile');

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

const getTags = async () => {
    try {
        const res = await userClient.get('/Categories/tags');

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

const getEvents = async () => {
    try {
        const res = await userClient.get('/');

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

export { addEvent, getProfile, getTags, getEvents };
