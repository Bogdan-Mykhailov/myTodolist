import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer
} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";
import {TasksStateType} from "../components/App/App";

let startState: TasksStateType

beforeEach(() => {
  startState = {
    'todoListId1': [
      {id: '1', title: 'Sass 👽', isDone: true},
      {id: '2', title: 'HTML & CSS 🤖', isDone: false},
      {id: '3', title: 'React ⚛️', isDone: true},
      {id: '4', title: 'Git 🤟', isDone: true},
      {id: '5', title: 'Redux 🎮', isDone: false},
    ],
    'todoListId2': [
      {id: '1', title: 'Angular', isDone: true},
      {id: '2', title: 'Python', isDone: false},
      {id: '3', title: 'C#', isDone: true},
      {id: '4', title: 'Xcode', isDone: true},
    ],
  };
})

test('correct task should be deleted from correct array', () => {



  const endState = tasksReducer(startState, removeTaskAC('todoListId2' ,'2' ))

  expect(endState).toEqual({
    'todoListId1': [
      {id: '1', title: 'Sass 👽', isDone: true},
      {id: '2', title: 'HTML & CSS 🤖', isDone: false},
      {id: '3', title: 'React ⚛️', isDone: true},
      {id: '4', title: 'Git 🤟', isDone: true},
      {id: '5', title: 'Redux 🎮', isDone: false},
    ],
    'todoListId2': [
      {id: '1', title: 'Angular', isDone: true},
      {id: '3', title: 'C#', isDone: true},
      {id: '4', title: 'Xcode', isDone: true},
    ],
  });
});

test('correct task should be added to correct array', () => {

  const endState = tasksReducer(startState, addTaskAC('todoListId2', 'Redux 🎮'))

  expect(endState['todoListId1'].length).toBe(5);
  expect(endState['todoListId2'].length).toBe(5);
  expect(endState['todoListId2'][0].id).toBeDefined();
  expect(endState['todoListId2'][0].title).toBe('Redux 🎮');
  expect(endState['todoListId2'][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {

  const endState = tasksReducer(startState, changeTaskStatusAC('todoListId2', "2", false))

  expect(endState['todoListId1'].length).toBe(5);
  expect(endState['todoListId2'].length).toBe(4);
  expect(endState['todoListId2'][1].isDone).toBe(false)
  expect(endState['todoListId1'][1].isDone).toBe(false)
});

test('title of specified task should be changed', () => {

  const endState = tasksReducer(startState, changeTaskTitleAC('todoListId1', '2', 'REACT'))

  expect(endState['todoListId1'][0].title).toBe('Sass 👽');
  expect(endState['todoListId1'][1].title).toBe('REACT');
  expect(endState['todoListId2'][1].title).toBe('Python');
});

test('new array should be added when new todolist is added', () => {

  const newTodolistTitle = "new todolist";

  const endState = tasksReducer(startState, addTodolistAC(newTodolistTitle))

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== 'todoListId1' && k !== 'todoListId2');
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

  const removeTodoList = "todolistId2";

  const endState = tasksReducer(startState, removeTodolistAC(removeTodoList))


  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["todolistId2"]).not.toBeDefined();
});
