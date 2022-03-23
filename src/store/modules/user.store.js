import { utilService } from '../../services/util.service.js'
import { userService } from '../../services/user.service.js'

export const userStore = {
    state: {
        loggediUser: null
    },
    getters: {
        user(state) {
            return state.loggediUser
        }
    },
    mutations: {
        setUser(state, { user }) {
            state.loggediUser = user
        }
    },
    actions: {
        async loadUser(context) {
            const user = await utilService.loadFromSessionStorage('user')
            if (user) {
                context.commit({ type: 'setUser', user })
                return user
            }
        },
        async login(context, { user }) {
            const loggedinUser = await userService.login(user)
            if (!loggedinUser) return
            await utilService.saveToSessionStorage('user', loggedinUser)
            context.commit({ type: 'setUser', loggedinUser })
            return loggedinUser
        },
        async signup(context, { user }) {
            const loggedinUser = await userService.signup(user)
            if (!loggedinUser) return
            await utilService.saveToSessionStorage('user', loggedinUser)
            context.commit({ type: 'setUser', loggedinUser })
            return loggedinUser

        }
    }
}