// import {
//   addTodolistAC,
//   changeTodolistFilterAC,
//   changeTodolistTitleAC, FilterValueType,
//   removeTodolistAC, TodolistDomainType,
//   todolistReducer
// } from "../todolist-reducer";
// import {v1} from "uuid";
//


// @ts-ignore
test('', () => {})

// let todoListId1: string
// let todoListId2: string
// let startState: TodolistDomainType[]
//
// beforeEach(() => {
//
//   todoListId1 = v1();
//   todoListId2 = v1();
//
//   startState = [
//     {id: todoListId1, title: 'Monday', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
//     {id: todoListId2, title: 'Tuesday', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
//   ]
// })
//
//
// test('correct todolist should be removed', () => {
//
//   const endState = todolistReducer(startState, removeTodolistAC(todoListId1))
//
//   expect(endState.length).toBe(1)
//   expect(endState[0].id).toBe(todoListId2)
// })
//
// test('correct todolist should be added', () => {
//
//   let newTodolistTitle = 'New Todolist';
//
//   const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle, 'newTodolistId'))
//
//   expect(endState.length).toBe(3);
//   expect(endState[0].title).toBe(newTodolistTitle);
// })
//
// test('correct todolist should change its name', () => {
//
//   let newTodolistTitle = "New Todolist";
//
//   const endState = todolistReducer(startState, changeTodolistTitleAC(todoListId2, newTodolistTitle));
//
//   expect(endState[0].title).toBe("Monday");
//   expect(endState[1].title).toBe(newTodolistTitle);
// });
//
// test('correct filter of todolist should be changed', () => {
//
//   let newFilter: FilterValueType = "completed";
//
//   const endState = todolistReducer(startState, changeTodolistFilterAC(todoListId2, newFilter));
//
//   expect(endState[0].filter).toBe("all");
//   expect(endState[1].filter).toBe(newFilter);
// });
