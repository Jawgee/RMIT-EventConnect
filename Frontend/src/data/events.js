import { getRequest, postRequest } from './genericRequests';
import axios from 'axios';

const eventClient = axios.create({
    baseURL: 'http://ec2-54-225-45-141.compute-1.amazonaws.com:4000/api/events',
});

// Creates an event
const addEvent = async (data) => {
    const [didSucceed, _] = await postRequest(eventClient, '/', data);
    return [didSucceed, ''];
};

const getProfile = async () => await getRequest(eventClient, '/Categories/profile');

const getTags = async () => await getRequest(eventClient, '/Categories/tags');

const getEvents = async () => await getRequest(eventClient, '/');

const getEventsForUser = async (id) => await getRequest(eventClient, `/user/${id}`).events;

const getEventForTag = async (tag) => await getRequest(eventClient, `/tags/${tag}`);

export { addEvent, getProfile, getTags, getEvents, getEventsForUser, getEventForTag };
