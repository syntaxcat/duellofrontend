import { storageService } from './storage.service';
import { utilService } from './util.service';

export const userService = {
  login,
  signup,
  getUsers
};
const USER_KEY = 'userDB';

_createUsers();

async function login(userCreds) {
  const users = await _query();
  const user = users.find((usr) => usr.password === userCreds.password && usr.username === userCreds.username);
  return user;
}
async function signup(newUser) {
  const users = await _query();
  const isUserExist = users.every((usr) => usr.password === newUser.password || usr.username === newUser.username);
  if (isUserExist) return;
  newUser._id = utilService.makeId();
  return storageService.post(USER_KEY, newUser);
}

async function getUsers(searchVal){
  console.log(searchVal)
  const users = await _query()
  return users.filter(user => user.fullname.includes(searchVal)||user.fullname.includes(searchVal))
}

async function _query() {
  return storageService.query(USER_KEY);
}

async function _createUsers() {
  const users = await _query();
  if (!users || !users.length) {
    const user = {
      _id: '6242f863997c38fd3b0699ee',
      username: 'RonShitrit',
      fullname: 'user',
      password: 123,
      imgUrl: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648287220/Profile-Ferb_jh83qj.webp',
    };
    storageService.post(USER_KEY, user);
  }
}
