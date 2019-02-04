import Http from './http'; // não precisa de .js
// import obj from '../models/user'


export const create = (User) => Http.post('/users', User);

export const get = (id) => {  
  return Http.get('/users/'+id);
};

export const update = (user) => {
  return Http.put('/users/',user)
}

export const removeAddress = (id) => {
  return Http.delete('/addresses/'+id)
}

export const removePhone = (id) => {
  return Http.delete('/phones/'+ id)
}

export const getCountries = () => {
  return Http.get('/countries/');
}

export const getStates =() => {
  return Http.get('/states/');
}