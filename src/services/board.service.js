import { storageService } from "./storage.service";
import { utilService } from './util.service'

export const boardService = {
    query,
    addGroup,
    updateGroup
    // remove,
    // add,
    // update
}

const BOARD_KEY = 'boardDB'
var gBoard;

_createBoard()

async function query(filterBy) {
    try{
        const boards = await storageService.query(BOARD_KEY)
        if(filterBy.boardId) return boards.find(board => filterBy.boardId === board._id)
        if(filterBy.userId) return boards.filter(board => filterBy.userId === board.createdBy._id)
    } catch(err){
        console.log(err)
    }
}

async function addGroup(title, board) {
    const group = {
        id: utilService.makeId(),
        title,
        tasks: []
    }
    board.groups.push(group)
    await storageService.put(BOARD_KEY, board)
    console.log(board);
    return group
}

async function updateGroup(groupToUpdate){
    const boards = await storageService.query(BOARD_KEY)
    const board = boards.find(currBoard => currBoard._id === groupToUpdate.boardId)
    const idx = board.groups.findIndex(grp => grp.id === groupToUpdate.id)
    board.groups[idx].title = groupToUpdate.title
    // console.log(board.groups[idx]);
    await storageService.put(BOARD_KEY, board)
    return board.groups[idx]

}

async function getById(boardId) {
    const board = await storageService.get(BOARD_KEY, boardId)
    console.log(board)
}

async function _createBoard() {
    try {
        gBoard = await storageService.query(BOARD_KEY)
        if (!gBoard || !gBoard.length) {
            console.log('query');
            gBoard = {
                "_id": "b101",
                "title": "Robot dev proj",
                "createdAt": 1589983468418,
                "createdBy": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "style": {},
                "labels": [
                    {
                        "id": "l101",
                        "title": "Done",
                        "color": "#61bd4f"
                    },
                    {
                        "id": "l102",
                        "title": "Progress",
                        "color": "#61bd33"
                    }
                ],
                "members": [
                    {
                        "_id": "u101",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "https://www.google.com"
                    }
                ],
                "groups": [
                    {
                        "id": "g101",
                        "title": "Group 1",
                        "tasks": [
                            {
                                "id": "c101",
                                "title": "Replace logo"
                            },
                            {
                                "id": "c102",
                                "title": "Add Samples"
                            }
                        ],
                        "style": {}
                    },
                    {
                        "id": "g102",
                        "title": "Group 2",
                        "tasks": [
                            {
                                "id": "c103",
                                "title": "Do that"
                            },
                            {
                                "id": "c104",
                                "title": "Help me",
                                "status": "in-progress",
                                "description": "description",
                                "comments": [
                                    {
                                        "id": "ZdPnm",
                                        "txt": "also @yaronb please CR this",
                                        "createdAt": 1590999817436.0,
                                        "byMember": {
                                            "_id": "u101",
                                            "fullname": "Tal Tarablus",
                                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                        }
                                    }
                                ],
                                "checklists": [
                                    {
                                        "id": "YEhmF",
                                        "title": "Checklist",
                                        "todos": [
                                            {
                                                "id": "212jX",
                                                "title": "To Do 1",
                                                "isDone": false
                                            }
                                        ]
                                    }
                                ],
                                "members": [
                                    {
                                        "_id": "u101",
                                        "username": "Tal",
                                        "fullname": "Tal Tarablus",
                                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                    }
                                ],
                                "labelIds": ["l101", "l102"],
                                "createdAt": 1590999730348,
                                "dueDate": 16156215211,
                                "byMember": {
                                    "_id": "u101",
                                    "username": "Tal",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                },
                                "style": {
                                    "bgColor": "#26de81"
                                }
                            }
                        ],
                        "style": {}
                    }
                ],
                "activities": [
                    {
                        "id": "a101",
                        "txt": "Changed Color",
                        "createdAt": 154514,
                        "byMember": {
                            "_id": "u101",
                            "fullname": "Abi Abambi",
                            "imgUrl": "http://some-img"
                        },
                        "task": {
                            "id": "c101",
                            "title": "Replace Logo"
                        }
                    }
                ]
            }
            storageService.post(BOARD_KEY, gBoard)
        }
    } catch (err) {
        console.log(err);
    }
}