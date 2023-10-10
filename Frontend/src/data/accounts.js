import axios from 'axios';
import { getRequest, postRequest, putRequest } from './genericRequests';
import { CapacitorCookies } from '@capacitor/core';

// Axios stuff, will make sure that things are consistent etc
// Also handles all of the HTTP requests easily

const userClient = axios.create({
    baseURL: 'http://ec2-54-225-45-141.compute-1.amazonaws.com:4000/api/users',
});

const tagsClient = axios.create({
    baseURL: 'http://ec2-54-225-45-141.compute-1.amazonaws.com:4000/api/tags',
});

// Verifies the user via login
const verifyUser = async (data) => {
    const [didSucceed, res] = await postRequest(userClient, '/login', data);
    // If there was success
    if (didSucceed) {
        CapacitorCookies.setCookie({ url: location.protocol, key: 'jwt', value: res.token });
        return [true, ''];
    }
    return [false, res];
};

// Registers the user
const registerUser = async (data) => {
    const [didSucceed, res] = await postRequest(userClient, '/register', data);
    if (didSucceed) {
        await CapacitorCookies.setCookie({ url: 'http://' + location.host, key: 'jwt', value: res.token });
        return [true, { email: res.email, id: res.id }];
    }
    return [false, res];
};

const getUserInfo = async (email) => await getRequest(userClient, `/Email/${email}`);

const editUser = async (id, data) => {
    const [didSucceed, res] = await putRequest(userClient, `/${id}`, data);
    if (didSucceed) {
        await CapacitorCookies.setCookie({ url: 'http://' + location.host, key: 'jwt', value: res.token });
        return [true, ''];
    }
    return [false, res];
};

const getTags = async (id) => {
    const res = await getRequest(tagsClient, `/UserTagList/${id}`);
    if (typeof res !== 'string') {
        let data = res[0];
        delete data.first_name;
        delete data.last_name;
        return data;
    }
    return res;
};

const updateTags = async (id, data) => {
    const [didSucceed, _] = await putRequest(tagsClient, `/UserInterests/${id}`, data);
    return [didSucceed, ''];
};

export { verifyUser, registerUser, getUserInfo, editUser, getTags, updateTags };
