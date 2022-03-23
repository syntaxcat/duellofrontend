import { storageService } from "./storage.service";
import { boardService } from "./board.service";
import { utilService } from "./util.service";

export const taskService = {
  //   addTask,
  removeTask,
  //   updateTask,
};
const BOARD_KEY = "boardDB";

async function removeTask(taskId, groupId) {
  const group = await storageService.get(BOARD_KEY, boardId);
  const idx = group.tasks.findIndex((task) => task.id === taskId);
  if (idx === -1) return;
  group.tasks.splice(idx, 1);
  boardService.updateGroup(group);
}
