import React, {useState} from 'react';
import './App.css';
import {ObjectType, Todolist} from "./components/Todolist/Todolist";
import {v1} from 'uuid'
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}
export type TasksStateType = {
  [key: string]: ObjectType[]
}

export function App() {

  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoLists] = useState<TodolistType[]>([
    {id: todoListId1, title: 'Monday', filter: 'all'},
    {id: todoListId2, title: 'Tuesday', filter: 'all'}
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
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

  function addTodoList(title: string) {
    let todolist: TodolistType = {id: v1(), title, filter: 'all'}
    setTodoLists([todolist, ...todoLists])
    setTasks({...tasks, [todolist.id]: []})
  }

  function removeTodoLists(todoListId: string) {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
    delete tasks[todoListId]
    setTasks({...tasks})
  }

  function changeTodolistTitleHandler(todoListId: string, newTitle: string) {
    const todoList = todoLists.find(tl => tl.id === todoListId)
    if (todoList) {
      todoList.title = newTitle
      setTodoLists([...todoLists])
    }
  }

  function changeFilter(todoListId: string, value: FilterValueType) {
    setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))

    // let todoList = todoLists.find(tl => tl.id === todoListId)
    // if (todoList) {
    //   todoList.filter = value
    //   setTodoLists([...todoLists])
    // }
  }

  function removeTasks(todoListId: string, id: string) {
    setTasks({...tasks, [todoListId]: tasks[todoListId].filter(tl => tl.id !== id)})

    // let tasksArr = tasks[todoListId]
    // tasks[todoListId] = tasksArr.filter(i => i.id !== id)
    // setTasks({...tasks})
  }

  function addTask(todoListId: string, title: string) {
    const newTask = {id: v1(), title: title, isDone: false}
    setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})

    // const newTask = {id: v1(), title: title, isDone: false}
    // let tasksArr = tasks[todoListId]
    // tasks[todoListId] = [newTask, ...tasksArr]
    // setTasks({...tasks})
  }

  function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
    setTasks({...tasks, [todoListId]: tasks[todoListId].map(tl => tl.id === taskId ? {...tl, isDone} : tl)})

    // let tasksArr = tasks[todoListId]
    // let task = tasksArr.find(i => i.id === taskId)
    // if (task) {
    //   task.isDone = isDone
    //   setTasks({...tasks})
    // }
  }

  function changeTaskTitle(todoListId: string, taskId: string, newTitle: string) {
    setTasks({...tasks, [todoListId]: tasks[todoListId].map(tl => tl.id === taskId ? {...tl, title: newTitle} : tl)})

    // let tasksArr = tasks[todoListId]
    // let task = tasksArr.find(i => i.id === taskId)
    // if (task) {
    //   task.isDone = isDone
    //   setTasks({...tasks})
    // }
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
