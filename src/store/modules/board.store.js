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
            state.board = board
            state.boardGroups = board[0].groups
        },
        addGroup(state, { newGroup }) {
            state.boardGroups.push(newGroup)
        }
    },
    actions: {
        async loadBoard({ commit }) {
            try {
                const board = await boardService.query()
                commit({ type: 'setBoard', board })
                return board
            } catch (err) {
                console.log(err);
            }
        },
        async addGroup({ commit }, { title }) {
            try {
                const newGroup = await boardService.addGroup(title)
                commit({ type: 'addGroup', newGroup })
            } catch (err) {
                console.log(err);
            }

        }

    }
}