import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const api = {
    getAll: () => {
        return axios.get(baseUrl);
    },
    create: data => {
        return axios.post(baseUrl, data);
    },
    delete: id => {
        return axios.delete(baseUrl + '/' + id);
    }
};


export default api;
