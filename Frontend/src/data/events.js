const userClient = axios.create({
    baseURL: 'http://localhost:4000/api/event',
});

// Creates an event
const addEvent = async (data) => {
    // Return format: If it was successful, error message to be shown to the user
    // Sends the user to the backend
    try {
        const res = await userClient.post('/', data);

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

export { addEvent };
