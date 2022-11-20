import client from './client';
import settings from '../config/settings';

const getUserID = (email) => client.get(`api/user/getid/${email}`);


export default {getUserID}