import {addTaskAC, removeTaskAC, tasksReducer, TasksStateType, updateTaskAC} from '../tasks-reducer';
import {addTodolistAC, removeTodolistAC} from "../todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../../03-DAL/tasks-api";

let startState: TasksStateType

beforeEach(() => {
  startState = {
    'todoListId1': [
      {
        id: '1',
        title: 'Sass 👽',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: ''
      },
      {
        id: '2',
        title: 'HTML & CSS 🤖',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: ''
      },
      {
        id: '3',
        title: 'React ⚛️',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: ''
      },
      {
        id: '4',
        title: 'Git 🤟',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: ''
      },
      {
        id: '5',
        title: 'Redux 🎮',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: ''
      },
    ],
    'todoListId2': [
      {
        id: '1',
        title: 'Angular',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId2',
        order: 0,
        addedDate: ''
      },
      {
        id: '2',
        title: 'Python',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId2',
        order: 0,
        addedDate: ''
      },
      {
        id: '3',
        title: 'C#',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId2',
        order: 0,
        addedDate: ''
      },
      {
        id: '4',
        title: 'Xcode',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId2',
        order: 0,
        addedDate: ''
      },
    ],
  };
})

test('correct task should be deleted from correct array', () => {

  const endState = tasksReducer(startState, removeTaskAC({
    taskId: '2',
    todoListId: 'todoListId2'
  }))

  expect(endState).toEqual({
    'todoListId1': [
      {
        id: '1',
        title: 'Sass 👽',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: ''
      },
      {
        id: '2',
        title: 'HTML & CSS 🤖',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: ''
      },
      {
        id: '3',
        title: 'React ⚛️',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: ''
      },
      {
        id: '4',
        title: 'Git 🤟',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: ''
      },
      {
        id: '5',
        title: 'Redux 🎮',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: ''
      },
    ],
    'todoListId2': [
      {
        id: '1',
        title: 'Angular',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId2',
        order: 0,
        addedDate: ''
      },
      {
        id: '3',
        title: 'C#',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId2',
        order: 0,
        addedDate: ''
      },
      {
        id: '4',
        title: 'Xcode',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId2',
        order: 0,
        addedDate: ''
      },
    ],
  });
});

test('correct task should be added to correct array', () => {

  const endState = tasksReducer(startState, addTaskAC({
    task:
      {
        id: '5',
        title: 'Redux 🎮',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId2',
        order: 0,
        addedDate: ''
      }
  }))

  expect(endState['todoListId1'].length).toBe(5);
  expect(endState['todoListId2'].length).toBe(5);
  expect(endState['todoListId2'][0].id).toBeDefined();
  expect(endState['todoListId2'][0].title).toBe('Redux 🎮');
  expect(endState['todoListId2'][0].status).toBe(TaskStatuses.Completed);
})

test('status of specified task should be changed', () => {

  const endState = tasksReducer(startState, updateTaskAC({
    taskId: '2',
    todoListId: 'todoListId2',
    model: {status: TaskStatuses.New}
  }))

  expect(endState['todoListId1'].length).toBe(5);
  expect(endState['todoListId2'].length).toBe(4);
  expect(endState['todoListId2'][1].status).toBe(TaskStatuses.New)
  expect(endState['todoListId1'][1].status).toBe(TaskStatuses.New)
});

test('title of specified task should be changed', () => {

  const endState = tasksReducer(startState, updateTaskAC({
    model: {title: 'REACT'},
    taskId: '2',
    todoListId: 'todoListId1'
  }))

  expect(endState['todoListId1'][0].title).toBe('Sass 👽');
  expect(endState['todoListId1'][1].title).toBe('REACT');
  expect(endState['todoListId2'][1].title).toBe('Python');
});

test('new array should be added when new todolist is added', () => {

  const newTodolist = {
    id: '2022.10.03',
    title: 'new todoList',
    order: 0,
    addedDate: ''
  };

  const endState = tasksReducer(startState, addTodolistAC({todoList: newTodolist}))

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

  const endState = tasksReducer(startState, removeTodolistAC({todoListId: removeTodoList}))


  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["todolistId2"]).not.toBeDefined();
});
