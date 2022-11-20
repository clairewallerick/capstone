import client from './client'

const endpoint = ('/api/event/futureevent')

const getEvents = () => client.get(endpoint);

export default { getEvents }