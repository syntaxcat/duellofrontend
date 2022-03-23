import { boardService } from '../../services/board.service'

export const boardStore = {
    state: {
        board: boardService.query(),
    },
    getters: {
        board(state) {
            return state.board
        }
    },
    mutations: {
        setBoard(state, {board}){
            state.board = board
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
        }

    }
}