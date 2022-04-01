import { httpService } from './httpService';
const ENDPOINT = 'auth';

export const userService = {
  login,
  signup,
  logout,
  // getGuestUser,
  getUsers,
};

async function login(cred) {
  return await httpService.post(ENDPOINT + '/login', cred);
}

async function signup(cred) {
  return await httpService.post(ENDPOINT + '/signup', cred);
}

async function logout() {
  return await httpService.post(ENDPOINT + '/logout');
}

async function getUsers(txt) {
  return await httpService.get('user' + `?txt=${txt}`);
}

// function getGuestUser() {
//   return {
//     fullname: 'Guest User',
//     username: 'guest',
//     password: 'guest',
//     imgUrl: 
//   };
// }
