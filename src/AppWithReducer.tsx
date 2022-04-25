import React, {useReducer} from 'react';
import './App.css';
import {ObjectType, Todolist} from "./components/Todolist/Todolist";
import {v1} from 'uuid'
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistReducer
} from "./State/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./State/tasks-reducer";

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}
export type TasksStateType = {
  [key: string]: ObjectType[]
}

export function AppWithReducer() {

  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, dispatchTodoLists] = useReducer(todolistReducer, [
    {id: todoListId1, title: 'Monday', filter: 'all'},
    {id: todoListId2, title: 'Tuesday', filter: 'all'}
  ])

  let [tasks, dispatchTasks] = useReducer(tasksReducer, {
    [todoListId1]: [
      {id: v1(), title: 'Sass 👽', isDone: true},
      {id: v1(), title: 'HTML & CSS 🤖', isDone: false},
      {id: v1(), title: 'React ⚛️', isDone: true},
      {id: v1(), title: 'Git 🤟', isDone: true},
      {id: v1(), title: 'Redux 🎮', isDone: false},
    ],
    [todoListId2]: [
      {id: v1(), title: 'Angular', isDone: true},
      {id: v1(), title: 'Python', isDone: false},
      {id: v1(), title: 'C#', isDone: true},
      {id: v1(), title: 'Xcode', isDone: true},
    ],
  })

  function addTodoList(newTodolistTitle: string) {
    let action = addTodolistAC(newTodolistTitle)
    dispatchTodoLists(action)
    dispatchTasks(action)
  }

  function removeTodoLists(todoListId: string) {
    let action = removeTodolistAC(todoListId)
    dispatchTodoLists(action)
    dispatchTasks(action)
  }

  function changeTodolistTitleHandler(todoListId: string, newTitle: string) {
    dispatchTodoLists(changeTodolistTitleAC(todoListId, newTitle))
  }

  function changeFilter(todoListId: string, value: FilterValueType) {
    dispatchTodoLists(changeTodolistFilterAC(todoListId, value))
  }

  function removeTasks(todoListId: string, id: string) {
    dispatchTasks(removeTaskAC(todoListId, id))
  }

  function addTask(todoListId: string, title: string) {
    dispatchTasks(addTaskAC(todoListId, title))
  }

  function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
    dispatchTasks(changeTaskStatusAC(todoListId, taskId, isDone))
  }

  function changeTaskTitle(todoListId: string, taskId: string, newTitle: string) {
    dispatchTasks(changeTaskTitleAC(todoListId, taskId, newTitle))
  }

  return (
    <div>
      <ButtonAppBar/>

      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map((tl) => {

            let tasksFiltered = tasks[tl.id]

            if (tl.filter === 'active') {
              tasksFiltered = tasksFiltered.filter(i => !i.isDone)
            }
            if (tl.filter === 'completed') {
              tasksFiltered = tasksFiltered.filter(i => i.isDone)
            }

            return (
              <Grid item>
                <Paper
                  style={{
                    maxWidth: '265px',
                    wordWrap: 'break-word',
                    padding: '20px',
                    fontFamily: 'Museo Sans Cyrl',
                    fontWeight: '300',
                    fontSize: '18px',
                    background: 'linear-gradient(45deg, #F2B56B 40%, #253759 190%)',
                    color: '#013A40'
                  }}
                  elevation={6}>
                  <Todolist
                    title={tl.title}
                    id={tl.id}
                    key={tl.id}
                    tasks={tasksFiltered}
                    // removeTasks={removeTasks}
                    addTask={addTask}
                    // changeStatus={changeStatus}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodoLists={removeTodoLists}
                    changeTodolistTitleHandler={changeTodolistTitleHandler}
                    // changeTaskTitle={changeTaskTitle}
                  />
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </div>
  );
}
