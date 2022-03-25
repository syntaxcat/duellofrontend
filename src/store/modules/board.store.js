import { boardService } from "../../services/board.service";
import { taskService } from "../../services/task.service";

export const boardStore = {
  state: {
    board: null,
    boardGroups: [],
    currGroup: null,
    draggable: {
      options: {
        group: "groups",
        // animation: 200,
        direction: "horizontal",
        // delay: 200,
        // delayOnTouchOnly: true,
        ghostClass: "groupGhost",
      },
    },
  },
  getters: {
    board(state) {
      return state.board;
    },
    groups(state) {
      return state.boardGroups;
    },
    dragOptions(state) {
      return state.draggable.options;
    },
    tasks(state) {
      return state.currGroup.tasks
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
    updateGroups(state, { newOrder }) {
      state.board.groups = newOrder;
      state.boardGroups = state.board.groups;
    },
    setGroup(state, { group }) {
      state.currGroup = group
    }
  },
  actions: {
    // async saveDate({ commit }, { date }) {
    //   try {
    //     const date = await boardService.
    //   }
    // },
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
        const updatedGroup = await boardService.updateGroup(
          newGroup,
          state.board._id
        );
        commit({ type: "updateGroup", updatedGroup });
      } catch (err) {
        console.log(err);
      }
    },
    async removeTask({ state, commit }, { taskId, groupId }) {
      try {
        const updatedGroup = await taskService.removeTask(
          taskId,
          groupId,
          state.board._id
        );
        commit({ type: "updateGroup", updatedGroup });
      } catch (err) {
        console.log(err);
      }
    },
    async addTask({ state, commit }, { taskTitle, groupId }) {
      try {
        const updatedGroup = await taskService.addTask(
          taskTitle,
          groupId,
          state.board._id
        );
        commit({ type: "updateGroup", updatedGroup });
      } catch (err) {
        console.log(err);
      }
    },
    async updateTask({ commit, state }, { task, groupId }) {
      console.log("task", task);
      try {
        const updatedGroup = await taskService.updateTask(
          task,
          groupId,
          state.board._id
        );
        commit({ type: "updateGroup", updatedGroup });
      } catch (err) {
        console.log(err);
      }
    },
    async drag({ commit, state }, { value }) {
      const newOrder = await boardService.updateGroups(value, {
        ...state.board,
      });
      commit({ type: "updateGroups", newOrder });
    },
    async dragTask({ commit, state }, { value, group }) {
      try {
        group.tasks = value
        // console.log(value);
        // console.log(Date.now());
        const updatedGroup = await boardService.updateGroup(group, JSON.parse(JSON.stringify(state.board)))
        console.log(updatedGroup);
        commit({ type: 'updateGroup', updatedGroup })
      } catch (err) {
        console.log(err);
      }
    },
    async createBoard({ commit }, { board }) {
      try {
        const newBoard = await boardService.addNewBoard(board);
        commit({ type: "setBoard", board: newBoard });
        return newBoard._id;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
