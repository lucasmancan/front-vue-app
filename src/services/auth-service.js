import Http from './http'; // não precisa de .js
// import obj from '../models/user'

export default{
    login : ({username, password}) => Http.post('/auth', {username, password}),

    isValid : () => localStorage.getItem('user-token') != null
} 
