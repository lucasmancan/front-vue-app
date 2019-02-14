import Http from './http'; // não precisa de .js
// import obj from '../models/user'


export default {
  create : (User) => Http.post('/users', User),

  get : () => {  
    return Http.get('/users/');
  },

  update : (user) => {
    return Http.put('/users/',user)
  },

  removeAddress : (id) => {
    return Http.delete('/addresses/'+id)
  },

  removePhone : (id) => {
    return Http.delete('/phones/'+ id)
  },

  updatePhone : (phone) => {
    return Http.put('/phones/', phone)
  },
  postPhone : (phone) => {
    return Http.post('/phones/', phone)
  },
   getCountries : () => {
    return Http.get('/countries/');
  },
  
   getStates : () => {
    return Http.get('/states/');
  }, 
  getStatesByCountry : (id) => {
    return Http.get('/states/country/'+id);
  },
  getCitiesByState : (id) => {
    return Http.get('/cities/state/'+id);
  }
  
}



 


