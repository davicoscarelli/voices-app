import axios from 'axios'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://waveapp-api.herokuapp.com/v1'
    : 'http://localhost:3333/v1'
   

