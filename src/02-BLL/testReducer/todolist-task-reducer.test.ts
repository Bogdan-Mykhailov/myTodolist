import {addTodolistAC, TodolistDomainType, todolistReducer} from "../todolist-reducer";
import {tasksReducer, TasksStateType} from "../tasks-reducer";
import {TodolistType} from "../../03-DAL/todolist-api";

test("id's should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodoListsState: Array<TodolistDomainType> = [];

  const todoList: TodolistType = {
    title: "new todolist",
    id: 'newTodolistId',
    addedDate: '',
    order: 0
  }

  const action = addTodolistAC({todoList});

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodoListsState = todolistReducer(startTodoListsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodoLists = endTodoListsState[0].id;


  expect(idFromTasks).toBe(action.payload.todoList.id);
  expect(idFromTodoLists).toBe(action.payload.todoList.id);
});



