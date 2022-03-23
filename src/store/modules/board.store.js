import { boardService } from "../../services/board.service";

export const boardStore = {
  state: {
    board: null,
    boardGroups: [],
  },
  getters: {
    board(state) {
      return state.board;
    },
  },
  mutations: {
    setBoard(state, { board }) {
      console.log("board", board);
      state.board = board;
      state.boardGroups = board.groups;
    },
    addGroup(state, { newGroup }) {
      state.boardGroups.push(newGroup);
    },
    removeGroup(state, { groupId }) {
      const idx = state.boardGroups.findIndex((group) => group.id === groupId);
      if (idx !== -1) return;
      state.boardGroups.splice(idx, 1);
    },
  },
  actions: {
    async loadBoard({ commit }) {
      try {
        const board = await boardService.query("b101");
        commit({ type: "setBoard", board });
        return board;
      } catch (err) {
        console.log(err);
      }
    },
    async addGroup({ state, commit }, { title }) {
      try {
        const newBoard = JSON.parse(JSON.stringify(state.board));
        const newGroup = await boardService.addGroup(title, newBoard);
        commit({ type: "addGroup", newGroup });
      } catch (err) {
        console.log(err);
      }
    },
    async removeGroup({ state, commit }, { groupId }) {
      try {
        await JSON.parse(JSON.stringify(state.board));
        commit({ type: "removeGroup", groupId });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
