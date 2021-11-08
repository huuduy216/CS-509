import axios from 'axios';

const instance = axios.create({
<<<<<<< HEAD
    baseURL:'http://localhost:8080'
=======
    baseURL:'http://ec2-3-144-85-145.us-east-2.compute.amazonaws.com:8080'
>>>>>>> ce3d5eb104d19c3b4b223010ba2ede35f1616a5a
});

export default instance;