import Http from './http'; // não precisa de .js
// import obj from '../models/user'


export const create = (User) => Http.post('/users', User);
export const update = (User) => Http.put('/users', User);
// export const delete = (id) => Http.delete('/users/'+id);

export const get = (id) => {  
  return Http.get('/users/'+id);
};