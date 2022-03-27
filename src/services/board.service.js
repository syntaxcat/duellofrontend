import { storageService } from './storage.service';
import { utilService } from './util.service';

export const boardService = {
  query,
  addGroup,
  removeGroup,
  updateGroup,
  updateGroups,
  getEmptyBoard,
  addNewBoard,
  updateBoardLabel,
  createBoardLabel,
  deleteBoardLabel,
};

const BOARD_KEY = 'boardDB';

_createBoard();

async function query(filterBy) {
  try {
    const boards = await storageService.query(BOARD_KEY);
    if (filterBy.boardId) return boards.find((board) => filterBy.boardId === board._id);
    else if (filterBy.userId) {
      boards.filter((board) => filterBy.userId === board.createdBy._id);
      return boards.filter((board) => filterBy.userId === board.createdBy._id);
    }
  } catch (err) {
    console.log(err);
  }
}

async function addGroup(title, boardId) {
  const group = {
    id: utilService.makeId(),
    title,
    tasks: [],
  };
  const boards = await storageService.query(BOARD_KEY);
  const board = boards.find((currBoard) => currBoard._id === boardId);
  board.groups.push(group);
  await storageService.put(BOARD_KEY, board);
  return group;
}

async function updateGroup(newGroup, boardId) {
  const board = await storageService.get(BOARD_KEY, boardId);
  const groupIdx = board.groups.findIndex((group) => group.id === newGroup.id);
  if (groupIdx !== -1) {
    board.groups.splice(groupIdx, 1, newGroup);
    await storageService.put(BOARD_KEY, board);
    return newGroup;
  }
}

async function updateGroups(newOrder, board) {
  board.groups = newOrder;
  storageService.put(BOARD_KEY, board);
  return newOrder;
}

async function getById(boardId) {
  const board = await storageService.get(BOARD_KEY, boardId);
}

async function removeGroup(groupId, boardId) {
  const board = await storageService.get(BOARD_KEY, boardId);
  const idx = board.groups.findIndex((group) => group.id === groupId);
  if (idx === -1) return;
  board.groups.splice(idx, 1);
  await storageService.put(BOARD_KEY, board);
}

async function updateBoardLabel(updatedLabel, boardId) {
  const board = await storageService.get(BOARD_KEY, boardId);
  const idx = board.labels.findIndex((label) => label.id === updatedLabel.id);
  console.log(idx);
  if (idx === -1) {
    return board;
  }
  board.labels.splice(idx, 1, updatedLabel);
  return await storageService.put(BOARD_KEY, board);
}

async function deleteBoardLabel(labelId, boardId) {
  const board = await storageService.get(BOARD_KEY, boardId);
  board.labels = board.labels.filter((label) => label.id !== labelId);
  return await storageService.put(BOARD_KEY, board);
}
async function createBoardLabel(labelData, boardId) {
  const board = await storageService.get(BOARD_KEY, boardId);
  board.labels.push({
    id: utilService.makeId(),
    ...labelData,
  });
  return await storageService.put(BOARD_KEY, board);
}

async function addNewBoard(board) {
  board.createdAt = Date.now();
  return await storageService.post(BOARD_KEY, board);
}

function getEmptyBoard() {
  return {
    _id: '',
    title: '',
    createdAt: null,
    createdBy: {},
    style: {
      backgroundImg: null,
    },
    labels: _createLabels(),
    members: [],
    groups: [],
    activities: [],
  };
}

async function _createBoard() {
  try {
    var boards = await storageService.query(BOARD_KEY);
    // console.log('board!', board)
    if (!boards || !boards.length) {
      boards = [{
        _id: 'b101',
        title: 'Robot dev proj',
        createdAt: 1589983468418,
        createdBy: {
          _id: 'u101',
          fullname: 'user',
          imgUrl: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/768x960/0de3084…/photo-1646657411842-704b5afe9036.jpg',
        },
        style: {
          backgroundImg: 'https://embedwistia-a.akamaihd.net/deliveries/d5ae8190f0aa7dfbe0b01f336f29d44094b967b5.webp?image_crop_resized=1280x720',
        },
        labels: _createLabels(),
        members: [
          {
            _id: 'u101',
            fullname: 'user',
            imgUrl: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648287220/Profile-Ferb_jh83qj.webp',
          },
          {
            _id: 'u102',
            fullname: 'Tal Tarablus',
            imgUrl: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648298649/profile-mulan_w7o2uz.webp',
          },
        ],
        groups: [
          {
            id: 'g101',
            title: 'Group 1',
            tasks: [
              {
                id: 'c101',
                title: 'Replace logo',
                labels: [],
                members: [],
                comments: [],
              },
              {
                id: 'c102',
                title: 'Add Samples',
                labels: [],
                members: [],
                comments: [],
              },
            ],
            style: {},
          },
          {
            id: 'g102',
            title: 'Group 2',
            tasks: [
              {
                id: 'c103',
                title: 'Do that',
                labels: [],
                members: [],
                comments: [],
              },
              {
                id: 'c104',
                title: 'Help me',
                status: 'in-progress',
                description: 'description',
                labels: [],
                members: [],
                comments: [
                  {
                    id: 'ZdPnm',
                    txt: 'also @yaronb please CR this',
                    createdAt: 1590999817436.0,
                    byMember: {
                      _id: 'u101',
                      fullname: 'Tal Tarablus',
                      imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                    },
                  },
                ],
                checklists: [
                  {
                    id: 'YEhmF',
                    title: 'Checklist',
                    todos: [
                      {
                        id: '212jX',
                        title: 'To Do 1',
                        isDone: false,
                      },
                    ],
                  },
                ],
                members: [
                  {
                    _id: 'u102',
                    username: 'Tal',
                    fullname: 'Tal Tarablus',
                    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                  {
                    _id: 'u101',
                    fullname: 'user',
                    imgUrl: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648287220/Profile-Ferb_jh83qj.webp',
                  },
                ],
                labelIds: ['l101', 'l102'],
                createdAt: 1590999730348,
                dueDate: 1648249455832,
                isDueDateDone: false,
                byMember: {
                  _id: 'u101',
                  username: 'Tal',
                  fullname: 'Tal Tarablus',
                  imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
                style: {
                  bgColor: '#26de81',
                },
              },
            ],
            style: {},
          },
        ],
        activities: [
          {
            id: 'a101',
            txt: 'Changed Color',
            createdAt: 154514,
            byMember: {
              _id: 'u101',
              fullname: 'Abi Abambi',
              imgUrl: 'http://some-img',
            },
            task: {
              id: 'c101',
              title: 'Replace Logo',
            },
          },
        ],
      },
      {
        _id: 'b101',
        title: 'Robot dev proj',
        createdAt: 1589983468418,
        createdBy: {
          _id: 'u101',
          fullname: 'user',
          imgUrl: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/768x960/0de3084…/photo-1646657411842-704b5afe9036.jpg',
        },
        style: {
          backgroundImg: 'https://images.unsplash.com/photo-1486728297118-82a07bc48a28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dHJlbGxvfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        },
        labels: _createLabels(),
        members: [
          {
            _id: 'u101',
            fullname: 'user',
            imgUrl: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648287220/Profile-Ferb_jh83qj.webp',
          },
          {
            _id: 'u102',
            fullname: 'Tal Tarablus',
            imgUrl: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648298649/profile-mulan_w7o2uz.webp',
          },
        ],
        groups: [
          {
            id: 'g101',
            title: 'Group 1',
            tasks: [
              {
                id: 'c101',
                title: 'Replace logo',
                labels: [],
                members: [],
                comments: [],
              },
              {
                id: 'c102',
                title: 'Add Samples',
                labels: [],
                members: [],
                comments: [],
              },
            ],
            style: {},
          },
          {
            id: 'g102',
            title: 'Group 2',
            tasks: [
              {
                id: 'c103',
                title: 'Do that',
                labels: [],
                members: [],
                comments: [],
              },
              {
                id: 'c104',
                title: 'Help me',
                status: 'in-progress',
                description: 'description',
                labels: [],
                members: [],
                comments: [
                  {
                    id: 'ZdPnm',
                    txt: 'also @yaronb please CR this',
                    createdAt: 1590999817436.0,
                    byMember: {
                      _id: 'u101',
                      fullname: 'Tal Tarablus',
                      imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                    },
                  },
                ],
                checklists: [
                  {
                    id: 'YEhmF',
                    title: 'Checklist',
                    todos: [
                      {
                        id: '212jX',
                        title: 'To Do 1',
                        isDone: false,
                      },
                    ],
                  },
                ],
                members: [
                  {
                    _id: 'u102',
                    username: 'Tal',
                    fullname: 'Tal Tarablus',
                    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                  {
                    _id: 'u101',
                    fullname: 'user',
                    imgUrl: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648287220/Profile-Ferb_jh83qj.webp',
                  },
                ],
                labelIds: ['l101', 'l102'],
                createdAt: 1590999730348,
                dueDate: 1648249455832,
                isDueDateDone: false,
                byMember: {
                  _id: 'u101',
                  username: 'Tal',
                  fullname: 'Tal Tarablus',
                  imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
                style: {
                  bgColor: '#26de81',
                },
              },
            ],
            style: {},
          },
        ],
        activities: [
          {
            id: 'a101',
            txt: 'Changed Color',
            createdAt: 154514,
            byMember: {
              _id: 'u101',
              fullname: 'Abi Abambi',
              imgUrl: 'http://some-img',
            },
            task: {
              id: 'c101',
              title: 'Replace Logo',
            },
          },
        ],
      },
       {
        _id: 'b101',
        title: 'Robot dev proj',
        createdAt: 1589983468418,
        createdBy: {
          _id: 'u101',
          fullname: 'user',
          imgUrl: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/768x960/0de3084…/photo-1646657411842-704b5afe9036.jpg',
        },
        style: {
          backgroundImg: 'https://mixkit.imgix.net/art/85/85-original.png-1000h.png',
        },
        labels: _createLabels(),
        members: [
          {
            _id: 'u101',
            fullname: 'user',
            imgUrl: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648287220/Profile-Ferb_jh83qj.webp',
          },
          {
            _id: 'u102',
            fullname: 'Tal Tarablus',
            imgUrl: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648298649/profile-mulan_w7o2uz.webp',
          },
        ],
        groups: [
          {
            id: 'g101',
            title: 'Group 1',
            tasks: [
              {
                id: 'c101',
                title: 'Replace logo',
                labels: [],
                members: [],
                comments: [],
              },
              {
                id: 'c102',
                title: 'Add Samples',
                labels: [],
                members: [],
                comments: [],
              },
            ],
            style: {},
          },
          {
            id: 'g102',
            title: 'Group 2',
            tasks: [
              {
                id: 'c103',
                title: 'Do that',
                labels: [],
                members: [],
                comments: [],
              },
              {
                id: 'c104',
                title: 'Help me',
                status: 'in-progress',
                description: 'description',
                labels: [],
                members: [],
                comments: [
                  {
                    id: 'ZdPnm',
                    txt: 'also @yaronb please CR this',
                    createdAt: 1590999817436.0,
                    byMember: {
                      _id: 'u101',
                      fullname: 'Tal Tarablus',
                      imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                    },
                  },
                ],
                checklists: [
                  {
                    id: 'YEhmF',
                    title: 'Checklist',
                    todos: [
                      {
                        id: '212jX',
                        title: 'To Do 1',
                        isDone: false,
                      },
                    ],
                  },
                ],
                members: [
                  {
                    _id: 'u102',
                    username: 'Tal',
                    fullname: 'Tal Tarablus',
                    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                  {
                    _id: 'u101',
                    fullname: 'user',
                    imgUrl: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648287220/Profile-Ferb_jh83qj.webp',
                  },
                ],
                labelIds: ['l101', 'l102'],
                createdAt: 1590999730348,
                dueDate: 1648249455832,
                isDueDateDone: false,
                byMember: {
                  _id: 'u101',
                  username: 'Tal',
                  fullname: 'Tal Tarablus',
                  imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
                style: {
                  bgColor: '#26de81',
                },
              },
            ],
            style: {},
          },
        ],
        activities: [
          {
            id: 'a101',
            txt: 'Changed Color',
            createdAt: 154514,
            byMember: {
              _id: 'u101',
              fullname: 'Abi Abambi',
              imgUrl: 'http://some-img',
            },
            task: {
              id: 'c101',
              title: 'Replace Logo',
            },
          },
        ],
      }]
      storageService.postMany(BOARD_KEY, boards);
    }
  } catch (err) {
    console.log(err);
  }
}

function _createLabels() {
  return [
    {
      title: 'urgent',
      id: 'l101',
      color: '#61bd4f',
    },
    {
      title: 'doing',
      id: 'l102',
      color: '#f2d600',
    },
    {
      title: '',
      id: utilService.makeId(),
      color: '#ff9f1a',
    },
    {
      title: '',
      id: utilService.makeId(),
      color: '#eb5a46',
    },
    {
      title: '',
      id: utilService.makeId(),
      color: '#c377e0',
    },
    {
      title: '',
      id: utilService.makeId(),
      color: '#0079bf',
    },
  ];
}
