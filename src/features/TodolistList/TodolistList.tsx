import {
  addTodoListTC, changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodosTC, FilterValueType,
  removeTodoListTC,
  TodolistDomainType
} from "./todolist-reducer";
import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useTypedDispatch} from "../../App/Store";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/tasks-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

export const TodoListList: React.FC = () => {

  const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists);
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchTodosTC())
  }, [])

  const addTodoList = useCallback((title: string) => {
    dispatch(addTodoListTC(title))
  }, [dispatch])

  const removeTodoList = useCallback((todoListId: string) => {
    dispatch(removeTodoListTC(todoListId))
  }, [dispatch])

  const changeTodolistTitle = useCallback((todoListId: string, newTitle: string) => {
    dispatch(changeTodolistTitleTC(todoListId, newTitle))
  }, [dispatch])

  const changeTodolistFilter = useCallback((todoListId: string, value: FilterValueType) => {
    dispatch(changeTodolistFilterAC(todoListId, value))
  }, [dispatch])

  const addTask = useCallback((todoListId: string, title: string) => {
    dispatch(addTaskTC(todoListId, title))
  }, [dispatch])
  const removeTask = useCallback((todoListId: string, taskId: string) => {
    dispatch(removeTaskTC(todoListId, taskId))
  }, [dispatch])
  const changeTaskTitle = useCallback((todoListId: string, taskId: string, newTitle: string) => {
    dispatch(updateTaskTC(todoListId, taskId, {title: newTitle}))
  }, [dispatch])
  const changeTaskStatus = useCallback((todoListId: string, taskId: string, status: TaskStatuses) => {
    dispatch(updateTaskTC(todoListId, taskId, {status: status}))
  }, [dispatch])

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
                  addTask={addTask}
                  changeFilter={changeTodolistFilter}
                  filter={tl.filter}
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