import { boardService } from "../../services/board.service";
import { taskService } from "../../services/task.service";

export const boardStore = {
  state: {
    board: null,
    boardGroups: [],
    draggable: {
      options: {
        group: 'groups',
        animation: 500,
        direction: 'horizontal',
        // delay: 200,
        // delayOnTouchOnly: true,
        ghostClass: 'groupGhost'
      }
    }
  },
  getters: {
    board(state) {
      return state.board;
    },
    groups(state){
      return state.boardGroups
    },
    dragOptions(state) {
      return state.draggable.options;
    }
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
    updateGroup(state, { updatedGroup }) {
      const idx = state.board.groups.findIndex(grp => grp.id === updatedGroup.id);
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
    updateGroups(state, { newOrder }) {
      state.board.groups = newOrder
      state.boardGroups = state.board.groups
    }
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
    async updateGroup({ commit, state }, { newGroup }) {
      try {
        const updatedGroup = await boardService.updateGroup(newGroup, state.board._id);
        commit({ type: "updateGroup", updatedGroup });
      } catch (err) {
        console.log(err);
      }
    },
    async removeTask({ state, commit }, { taskId, groupId }) {
      try {
        const updatedGroup = await taskService.removeTask(taskId, groupId, state.board._id);
        commit({ type: "updateGroup", updatedGroup });
      } catch (err) {
        console.log(err);
      }
    },
    async addTask({ state, commit }, { taskTitle, groupId }){
      try {
        const updatedGroup = await taskService.addTask(taskTitle, groupId, state.board._id);
        commit({ type: "updateGroup", updatedGroup });
      } catch (err) {
        console.log(err);
      }
      
    },
    async updateTask({ commit, state }, { task, groupId }) {
      try {
        const updatedGroup = await taskService.updateTask(task, groupId, state.board._id)
        commit({ type: "updateGroup", updatedGroup });
      } catch (err) {
        console.log(err);
      }
    },
    async drag({ commit, state }, { value }) {
      const newOrder = await boardService.updateGroups(value, {...state.board})
      commit({type: 'updateGroups', newOrder})
    }
  },
};
