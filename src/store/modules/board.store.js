import { boardService } from '../../services/board.service'

export const boardStore = {
    state: {
        board: null,
        boardGroups: []
    },
    getters: {
        board(state) {
            return state.board
        }
    },
    mutations: {
        setBoard(state, { board }) {
            console.log('board', board)
            state.board = board
            state.boardGroups = board.groups
        },
        addGroup(state, { newGroup }) {
            state.boardGroups.push(newGroup)
        }
    },
    actions: {
        async loadBoard({ commit }) {
            try {
                const board = await boardService.query('b101')
                commit({ type: 'setBoard', board })
                return board
            } catch (err) {
                console.log(err);
            }
        },
        async addGroup({state, commit}, { title }) {
            try {
                const newBoard = JSON.parse(JSON.stringify(state.board))
                const newGroup = await boardService.addGroup(title, newBoard)
                commit({ type: 'addGroup', newGroup })
            } catch (err) {
                console.log(err);
            }

        }

    }
}