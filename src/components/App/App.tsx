import React, {useCallback} from 'react';
import './App.css';
import {ObjectType, Todolist} from "../Todolist/Todolist";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {ButtonAppBar} from "../ButtonAppBar/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "../../State/todolist-reducer";
import {addTaskAC} from "../../State/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../State/Store";

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

  const todoLists = useSelector<AppRootStateType, TodolistType[]>(state => state.todoLists);
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
  const dispatch = useDispatch();

  const addTodoList = useCallback((newTodolistTitle: string) => {
    let action = addTodolistAC(newTodolistTitle)
    dispatch(action)
  }, [dispatch])

  const removeTodoLists = useCallback((todoListId: string) => {
    let action = removeTodolistAC(todoListId)
    dispatch(action)
  }, [dispatch])

  const changeTodolistTitleHandler = useCallback((todoListId: string, newTitle: string) => {
    dispatch(changeTodolistTitleAC(todoListId, newTitle))
  }, [dispatch])

  const changeFilter = useCallback((todoListId: string, value: FilterValueType) => {
    dispatch(changeTodolistFilterAC(todoListId, value))
  }, [dispatch])

  const addTask = useCallback((todoListId: string, title: string) => {
    dispatch(addTaskAC(todoListId, title))
  }, [dispatch])

  return (
    <div>
      <ButtonAppBar/>

      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map((tl) => {

            return (
              <Grid item key={tl.id}>
                <Paper
                  style={{
                    maxWidth: '244px',
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
                    tasks={tasks[tl.id]}
                    addTask={addTask}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodoLists={removeTodoLists}
                    changeTodolistTitleHandler={changeTodolistTitleHandler}
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
