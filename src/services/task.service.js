import { storageService } from './storage.service';
import { boardService } from './board.service';
import { utilService } from './util.service';

export const taskService = {
  addTask,
  removeTask,
  updateTask,
  getById,
  getEmptyComment,
};
const BOARD_KEY = 'boardDB';
var counter = 0;

async function addTask(taskTitle, groupId, boardId) {
  const task = {
    title: taskTitle,
    id: utilService.makeId(),
    labels: [],
  };
  const group = await _findGroup(groupId, boardId);
  group.tasks.push(task);
  return boardService.updateGroup(group, boardId);
}

async function updateTask(taskPartial, groupId, boardId) {
  const group = await _findGroup(groupId, boardId);
  const taskIdx = group.tasks.findIndex((task) => task.id === taskPartial.id);
  if (taskIdx === -1) return;
  group.tasks.splice(taskIdx, 1, {
    ...group.tasks[taskIdx],
    ...taskPartial,
  });
  return boardService.updateGroup(group, boardId);
}

async function removeTask(taskId, groupId, boardId) {
  const group = await _findGroup(groupId, boardId);
  const taskIdx = group.tasks.findIndex((task) => task.id === taskId);
  if (taskIdx === -1) return;
  group.tasks.splice(taskIdx, 1);
  return boardService.updateGroup(group, boardId);
}

async function getById(taskId, groupId, boardId) {
  const group = await _findGroup(groupId, boardId);
  const task = group.tasks.find((task) => task.id === taskId);
  return { task, group };
}

function getEmptyComment() {
  return {
    id: utilService.makeId(),
    txt: '',
    createdAt: null,
    byMember: {},
  };
}

// async function updateTasks(taskId, groupId, board) {}

async function _findGroup(groupId, boardId) {
  const board = await storageService.get(BOARD_KEY, boardId);
  const group = board.groups.find((group) => group.id === groupId);
  return group;
}
