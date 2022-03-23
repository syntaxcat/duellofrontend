import { boardService } from "../../services/board.service";
import { taskService } from "../../services/task.service";

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
    removeTask(state, { taskId, groupId }) {
      const groupIdx = state.board.groups.findIndex(
        (group) => group.id === groupId
      );
      const idx = state.board.groups[groupIdx].tasks.findIndex(
        (task) => task.id === taskId
      );
      if (idx !== -1) state.board.group[groupIdx].tasks.splice(idx, 1);
    },
  },
  actions: {
    async loadBoards({ commit }, { filterBy }) {
      try {
        const board = await boardService.query(filterBy);
        commit({ type: "setBoard", board });
        return board;
      } catch (err) {
        console.log(err);
      }
    },
    async addGroup({ commit }, { title, boardId }) {
      try {
        const newGroup = await boardService.addGroup(title, boardId);
        commit({ type: "addGroup", newGroup });
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
    async updateGroup({ commit }, { groupToUpdate }) {
      try {
        const updatedGroup = await boardService.updateGroup(groupToUpdate);
        commit({ type: "editGroup", updatedGroup });
      } catch (err) {
        console.log(err);
      }
    },
    async removeTask({ state, commit }, { taskId, groupId }) {
      try {
        await taskService.removeTask(taskId, groupId);
        commit({ type: "removeTask", taskId });
      } catch (err) {
        console.log(err);
      }
    },
    // async updateTask({commit})
  },
};
