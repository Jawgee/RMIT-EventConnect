import { getRequest, postRequest } from './genericRequests';
import axios from 'axios';

const eventClient = axios.create({
    baseURL: 'http://localhost:4000/api/events',
});

// Creates an event
const addEvent = async (data) => {
    const [didSucceed, _] = await postRequest(eventClient, '/', data);
    return [didSucceed, ''];
};

const getProfile = async () => await getRequest(eventClient, '/Categories/profile');

const getTags = async () => await getRequest(eventClient, '/Categories/tags');

const getEvents = async () => await getRequest(eventClient, '/');

export { addEvent, getProfile, getTags, getEvents };
