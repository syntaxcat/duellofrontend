import { storageService } from "./storage.service";
import { utilService } from "./util.service";

export const userService = {
    login,
    signup,
};
const USER_KEY = "userDB";

_createUsers()

async function login(userCreds) {
    console.log(userCreds)
    const users = await _query()
    const user = users.find(usr => usr.password === userCreds.password && usr.username === userCreds.username)
    console.log(users)
    console.log(user)
    return user

}
async function signup(newUser) {
    console.log(newUser)
    const users = await _query()
    console.log(users)
    const isUserExist = users.every(usr => usr.password === newUser.password || usr.username === newUser.username)
    if (isUserExist) return
    newUser._id = utilService.makeId()
    return storageService.post(USER_KEY, newUser)
}

async function _query() {
    return storageService.query(USER_KEY)
}

async function _createUsers() {
    const users = await _query()
    if (!users || !users.length) {
        const user = {
            username: 'user',
            fullname: 'user',
            password: 123,
            _id: 'u101'
        }
        storageService.post(USER_KEY, user)
    }
} 