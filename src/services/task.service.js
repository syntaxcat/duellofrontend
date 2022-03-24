import { storageService } from "./storage.service";
import { boardService } from "./board.service";
import { utilService } from "./util.service";

export const taskService = {
  addTask,
  removeTask,
  updateTask,
};
const BOARD_KEY = "boardDB";

async function addTask(taskTitle, groupId, boardId) {
  const task = {
    title: taskTitle,
    id: utilService.makeId(),
  };
  const group = await _findGroup(groupId, boardId);
  group.tasks.push(task);
  return boardService.updateGroup(group, boardId);
}

async function updateTask(newTask, groupId, boardId) {
  const group = await _findGroup(groupId, boardId);
  const taskIdx = group.tasks.findIndex((task) => task.id === newTask.id);
  console.log(newTask.id);
  console.log(group, taskIdx);
  if (taskIdx === -1) return;
  group.tasks.splice(taskIdx, 1, newTask);
  return boardService.updateGroup(group, boardId);
}

async function removeTask(taskId, groupId, boardId) {
  const group = await _findGroup(groupId, boardId);
  const taskIdx = group.tasks.findIndex((task) => task.id === taskId);
  if (taskIdx === -1) return;
  group.tasks.splice(taskIdx, 1);
  return boardService.updateGroup(group, boardId);
}

async function _findGroup(groupId, boardId) {
  const board = await storageService.get(BOARD_KEY, boardId);
  const group = board.groups.find((group) => group.id === groupId);
  return group;
}
