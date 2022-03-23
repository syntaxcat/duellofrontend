import { utilService } from '../../services/util.service'

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
                context.commit({type:'setUser', user})
                return user
            }
        },
        async login(context, {user}){
            const loggedUser = await utilService.saveToSessionStorage('user', user)
            context.commit({type:'setUser', user})
            return loggedUser
        }
    }
}