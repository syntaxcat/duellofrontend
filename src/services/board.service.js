import { storageService } from "./storage.service";
import { utilService } from "./util.service";

export const boardService = {
  query,
  addGroup,
  removeGroup,
  updateGroup,
  updateGroups,
  getEmptyBoard,
  addNewBoard,
};

const BOARD_KEY = "boardDB";

_createBoard();

async function query(filterBy) {
  try {
    const boards = await storageService.query(BOARD_KEY);
    if (filterBy.boardId)
      return boards.find((board) => filterBy.boardId === board._id);
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

async function updateGroup(newGroup, board) {
  // const board = await storageService.get(BOARD_KEY, boardId);
  const groupIdx = board.groups.findIndex((group) => group.id === newGroup.id);
  if (groupIdx !== -1) {
    // console.log(newGroup);
    board.groups.splice(groupIdx, 1, newGroup);
    // console.log(board.groups);
     await storageService.put(board);
    //  await storageService.put(BOARD_KEY, JSON.parse(JSON.stringify(board)));
    // console.log(la);
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

async function addNewBoard(board) {
  board.createdAt = Date.now()
  return await storageService.post(BOARD_KEY, board)
}

function getEmptyBoard() {
  return {
    _id: "",
    title: "",
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
    var board = await storageService.query(BOARD_KEY);
    console.log('board!', board)
    if (!board || !board.length) {
      console.log("query");
      board = {
        _id: "b101",
        title: "Robot dev proj",
        createdAt: 1589983468418,
        createdBy: {
          _id: "u101",
          fullname: "Abi Abambi",
          imgUrl: "http://some-img",
        },
        style: {
          backgroundImg: null,
        },
        labels: _createLabels(),
        members: [
          {
            _id: "u101",
            fullname: "Tal Tarablus",
            imgUrl: "https://www.google.com",
          },
        ],
        groups: [
          {
            id: "g101",
            title: "Group 1",
            tasks: [
              {
                id: "c101",
                title: "Replace logo",
                labels:[]
              },
              {
                id: "c102",
                title: "Add Samples",
                labels:[]
              },
            ],
            style: {},
          },
          {
            id: "g102",
            title: "Group 2",
            tasks: [
              {
                id: "c103",
                title: "Do that",
                labels:[]
              },
              {
                id: "c104",
                title: "Help me",
                status: "in-progress",
                description: "description",
                labels:[],
                comments: [
                  {
                    id: "ZdPnm",
                    txt: "also @yaronb please CR this",
                    createdAt: 1590999817436.0,
                    byMember: {
                      _id: "u101",
                      fullname: "Tal Tarablus",
                      imgUrl:
                        "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
                    },
                  },
                ],
                checklists: [
                  {
                    id: "YEhmF",
                    title: "Checklist",
                    todos: [
                      {
                        id: "212jX",
                        title: "To Do 1",
                        isDone: false,
                      },
                    ],
                  },
                ],
                members: [
                  {
                    _id: "u101",
                    username: "Tal",
                    fullname: "Tal Tarablus",
                    imgUrl:
                      "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
                  },
                ],
                labelIds: ["l101", "l102"],
                createdAt: 1590999730348,
                dueDate: 16156215211,
                byMember: {
                  _id: "u101",
                  username: "Tal",
                  fullname: "Tal Tarablus",
                  imgUrl:
                    "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
                },
                style: {
                  bgColor: "#26de81",
                },
              },
            ],
            style: {},
          },
        ],
        activities: [
          {
            id: "a101",
            txt: "Changed Color",
            createdAt: 154514,
            byMember: {
              _id: "u101",
              fullname: "Abi Abambi",
              imgUrl: "http://some-img",
            },
            task: {
              id: "c101",
              title: "Replace Logo",
            },
          },
        ],
      };
      storageService.post(BOARD_KEY, board);
    }
  } catch (err) {
    console.log(err);
  }
}

function _createLabels(){
  return [
    {
        title:'urgent',
        id: utilService.makeId(),
        color: '#61bd4f'
    },
    {
        title:'doing',
        id: utilService.makeId(),
        color: '#f2d600'
    },
    {
        title:'',
        id: utilService.makeId(),
        color: '#f2d600'
    },
    {
        title:'',
        id: utilService.makeId(),
        color: '#ff9f1a'
    },
    {
        title:'',
        id: utilService.makeId(),
        color: '#eb5a46'
    },
    {
        title:'',
        id: utilService.makeId(),
        color: '#c377e0'
    },
    {
        title:'',
        id: utilService.makeId(),
        color: '#0079bf'
    },
    {
        title:'',
        id: utilService.makeId(),
        color: '#00c2e0'
    },
    {
        title:'',
        id: utilService.makeId(),
        color: '#51e898'
    },
    {
        title:'',
        id: utilService.makeId(),
        color: '#ff78cb'
    },
    {
        title:'',
        id: utilService.makeId(),
        color: '#344563'
    },
    {
        title:'',
        id: utilService.makeId(),
        color: '#b3bac5'
    },
]
}