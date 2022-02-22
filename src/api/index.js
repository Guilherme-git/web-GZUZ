import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost/Conte-tecnologia/GZUZ/api/public'
    //baseURL: ''
})

export default api