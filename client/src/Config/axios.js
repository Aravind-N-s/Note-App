import Axios from 'axios'
 
const axios = Axios.create({
    baseURL: 'localhost:3005'
    //http://localhost:3005
})

export default axios