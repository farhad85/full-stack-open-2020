import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/';

const api = {
    getAll: () => {
        return axios.get(baseUrl + 'persons');
    },
    create: data => {
        return axios.post(baseUrl + 'persons', data);
    },
    delete: id => {
        return axios.delete(baseUrl + 'person/' + id);
    },
    put: (id, data) => {
        return axios.put(baseUrl + 'person/' + id, data);
    }
};


export default api;
