import axios from 'axios'


const API = process.env.REACT_APP_API + '/api'


export const register = async (data) => await axios.post(API + '/register', data)

export const login = async (data) => await axios.post(API + '/login', data)
    
