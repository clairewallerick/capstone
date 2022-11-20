import client from './client'

const endpoint = ('/api/facts/getfacts')

const getFacts = () => client.get(endpoint);

export default { getFacts }