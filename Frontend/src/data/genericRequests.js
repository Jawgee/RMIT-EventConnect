const getRequest = async (client, requestURL) => {
    // Return format: If it was successful, error message to be shown to the user
    // Sends the user to the backend
    try {
        const res = await client.get(requestURL);

        // If there was success
        if (res.status >= 200 && res.status <= 299) {
            return res.data;
        }

        // Fallback, in case the code reaches here
        return 'Something went wrong, try again';
    } catch (e) {
        // If there was a 4xx/5xx response, it throws an error
        return e.response.data.error ?? "Something went wrong, try again";
    }
};

const postRequest = async (client, requestURL, data) => {
    // Return format: If it was successful, error message to be shown to the user
    // Sends the user to the backend
    try {
        const res = await client.post(requestURL, data);
        // If there was success
        if (res.status >= 200 && res.status <= 299) {
            return [true, res.data];
        }

        // Fallback, in case the code reaches here
        return [false, 'Something went wrong, try again'];
    } catch (e) {
        // If there was a 4xx/5xx response, it throws an error
        return [false, e.response.data.error ?? "Something went wrong, try again"];
    }
};

const putRequest = async (client, requestURL, data) => {
    // Return format: If it was successful, error message to be shown to the user
    // Sends the user to the backend
    try {
        const res = await client.put(requestURL, data);
        // If there was success
        if (res.status >= 200 && res.status <= 299) {
            return [true, res.data];
        }

        // Fallback, in case the code reaches here
        return [false, 'Something went wrong, try again'];
    } catch (e) {
        // If there was a 4xx/5xx response, it throws an error
        return [false, e.response.data.error ?? "Something went wrong, try again"];
    }
};

export { getRequest, postRequest, putRequest };
