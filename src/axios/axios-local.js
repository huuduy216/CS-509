import axios from 'axios';

const instance = axios.create({
    // baseURL:'http://localhost:8080'
     baseURL:'http://ec2-3-144-85-145.us-east-2.compute.amazonaws.com:8080/'

});

export default instance;