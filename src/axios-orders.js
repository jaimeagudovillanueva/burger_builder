import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-f0d0f.firebaseio.com/'
});

export default instance;