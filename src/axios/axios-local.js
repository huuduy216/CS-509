import axios from 'axios';

const instance = axios.create({
    //local
  //baseURL:'http://localhost:8080'

    //group
     baseURL:'http://ec2-3-144-85-145.us-east-2.compute.amazonaws.com:8080/'

    //jjq
     //baseURL:'http:// ec2-3-144-140-189.us-east-2.compute.amazonaws.com:8080/'


});

export default instance;