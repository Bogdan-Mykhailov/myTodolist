import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC, FilterValueType,
  removeTodolistAC, TodolistDomainType,
  todolistReducer
} from "../todolist-reducer";
import {v1} from "uuid";
import {TodolistType} from "../../03-DAL/todolist-api";


let todoListId1: string
let todoListId2: string
let startState: TodolistDomainType[]

beforeEach(() => {

  todoListId1 = v1();
  todoListId2 = v1();

  startState = [
    {id: todoListId1, title: 'Monday', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    {id: todoListId2, title: 'Tuesday', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
  ]
})


test('correct todolist should be removed', () => {

  const endState = todolistReducer(startState, removeTodolistAC({todoListId: todoListId1}))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {

  let todoList: TodolistType = {
    title: 'Thursday',
    id: 'todoListId3',
    order: 0,
    addedDate: '',
  };

  const endState = todolistReducer(startState, addTodolistAC({todoList}))

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe('Thursday');
  expect(endState[0].id).toBe('todoListId3');
})

test('correct todolist should change its name', () => {

  let newTodolistTitle = "New Todolist";

  const endState = todolistReducer(startState, changeTodolistTitleAC({title: newTodolistTitle, todoListId: todoListId2}));

  expect(endState[0].title).toBe("Monday");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

  let newFilter: FilterValueType = "completed";

  const endState = todolistReducer(startState, changeTodolistFilterAC({filter: newFilter, todoListId: todoListId2}));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
