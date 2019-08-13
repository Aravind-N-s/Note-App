import Axios from './node_modules/axios'
 
const axios = Axios.create({
    baseURL: '/'
    //http://localhost:3005
})

export default axios