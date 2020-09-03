import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://gp-challenges-bas14.com.francetelecom.fr/caracaAPI/'
    //baseURL: 'http://localhost:8080/caracaAPI/'

})

export default instance