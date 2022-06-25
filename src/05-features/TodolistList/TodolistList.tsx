import {
  addTodoListTC, changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodosTC, FilterValueType,
  removeTodoListTC,
  TodolistDomainType
} from "../../02-BLL/todolist-reducer";
import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useTypedDispatch, useTypedSelector} from "../../02-BLL/Store";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "../../02-BLL/tasks-reducer";
import {TaskStatuses} from "../../03-DAL/tasks-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../01-components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {useNavigate} from "react-router-dom";
import {PATH} from "../Routes/Routs";

export const TodoListList: React.FC = () => {

  const todoLists = useTypedSelector(state => state.todoLists);
  const tasks = useTypedSelector(state => state.tasks);
  const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
  const dispatch = useTypedDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchTodosTC())
    } else {
      navigate(PATH.LOGIN)
    }
  }, [isLoggedIn])

  const addTodoList = useCallback((title: string) => {
    dispatch(addTodoListTC(title))
  }, [])
  const removeTodoList = useCallback((todoListId: string) => {
    dispatch(removeTodoListTC(todoListId))
  }, [])
  const changeTodolistTitle = useCallback((todoListId: string, newTitle: string) => {
    dispatch(changeTodolistTitleTC(todoListId, newTitle))
  }, [])
  const changeTodolistFilter = useCallback((todoListId: string, value: FilterValueType) => {
    dispatch(changeTodolistFilterAC(todoListId, value))
  }, [])
  const addTask = useCallback((todoListId: string, title: string) => {
    dispatch(addTaskTC(todoListId, title))
  }, [])
  const removeTask = useCallback((todoListId: string, taskId: string) => {
    dispatch(removeTaskTC(todoListId, taskId))
  }, [])
  const changeTaskTitle = useCallback((todoListId: string, taskId: string, newTitle: string) => {
    dispatch(updateTaskTC(todoListId, taskId, {title: newTitle}))
  }, [])
  const changeTaskStatus = useCallback((todoListId: string, taskId: string, status: TaskStatuses) => {
    dispatch(updateTaskTC(todoListId, taskId, {status: status}))
  }, [])

  return <>
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
                filter={tl.filter}
                entityStatus={tl.entityStatus}
                addTask={addTask}
                changeFilter={changeTodolistFilter}
                removeTodoLists={removeTodoList}
                changeTodolistTitleHandler={changeTodolistTitle}
                removeTask={removeTask}
                changeTaskTitle={changeTaskTitle}
                changeTaskStatus={changeTaskStatus}
              />
            </Paper>
          </Grid>
        )
      })
      }
    </Grid>
  </>
}