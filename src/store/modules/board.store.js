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
      state.board = board;
      state.boardGroups = board.groups;
    },
    setBoards(state, { boards }) {
      state.boards = boards;
    },
    addGroup(state, { newGroup }) {
      state.boardGroups.push(newGroup);
    },
    editGroup(state, { updatedGroup }) {
      const idx = state.board.groups.findIndex(
        (grp) => grp.id === updatedGroup.id
      );
      state.board.groups.splice(idx, 1, updatedGroup);
    },
    removeGroup(state, { groupId }) {
      const idx = state.board.groups.findIndex((group) => group.id === groupId);
      if (idx !== -1) state.board.groups.splice(idx, 1);
    },
  },
  actions: {
    async loadBoard({ commit }, { filterBy }) {
      try {
        const board = await boardService.query(filterBy);
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
    async groupTitle({ commit }, { groupToUpdate }) {
      try {
        const updatedGroup = await boardService.updateGroup(groupToUpdate);
        commit({ type: "editGroup", updatedGroup });
      } catch (err) {
        console.log(err);
      }
    },
    async loadBoards({ commit }, { filterBy }) {
      try {
        const boards = await boardService.query(filterBy);
        commit({ type: "setBoards", boards });
        return boards;
      } catch (err) {
        console.log(err);
      }
    },
    async removeGroup({ state, commit }, { groupId }) {
      try {
        await boardService.removeGroup(groupId, state.board._id);
        commit({ type: "removeGroup", groupId });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
