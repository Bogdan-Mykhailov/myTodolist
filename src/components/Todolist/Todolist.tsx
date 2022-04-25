import React, {useCallback} from 'react';
import {FilterValueType} from "../../App";
import classes from './Todolist.module.css'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import {Task} from "../Task/Task";

export type ObjectType = {
  id: string,
  title: string,
  isDone: boolean
}
type TodolistPropsType = {
  id: string
  title: string,
  tasks: ObjectType[]
  // removeTasks: (todoListId: string, id: string) => void
  addTask: (todoListId: string, title: string) => void
  // changeStatus: (todoListId: string, taskId: string, isDone: boolean) => void
  // changeTaskTitle: (todoListId: string, taskId: string, newValue: string) => void
  changeFilter: (todoListId: string, filter: FilterValueType) => void
  filter: FilterValueType
  removeTodoLists: (todoListId: string) => void
  changeTodolistTitleHandler: (todoListId: string, newTitle: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {

  const onClickChangeFilterHandler = useCallback((value: FilterValueType) => {
    props.changeFilter(props.id, value)
  }, [props.changeFilter, props.id])

  const onClickRemoveTodolistHandler = useCallback(() => {
    props.removeTodoLists(props.id)
  }, [props.removeTodoLists, props.id])

  const addTask = useCallback((title: string) => {
    props.addTask(props.id, title)
  }, [props.addTask, props.id])

  const changeTodolistTitleHandler = (newTitle: string) => {
    props.changeTodolistTitleHandler(props.id, newTitle)
  }

  let tasksFiltered = props.tasks

  if (props.filter === 'active') {
    tasksFiltered = tasksFiltered.filter(i => !i.isDone)
  }

  if (props.filter === 'completed') {
    tasksFiltered = tasksFiltered.filter(i => i.isDone)
  }

  // const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
  //   props.changeTaskTitle(props.id, taskId, newTitle)
  // }, [props.changeTaskTitle, props.id])
  //
  // const changeStatus = useCallback((taskId: string, newStatusValue: boolean) => {
  //   props.changeStatus(props.id, taskId, newStatusValue)
  // }, [props.changeStatus, props.id])
  //
  // const removeTasks = useCallback((taskId: string) => {
  //   props.removeTasks(props.id, taskId)
  // }, [props.removeTasks, props.id])

  return (
    <div>

      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitleHandler}/>
        <IconButton aria-label="delete" onClick={onClickRemoveTodolistHandler}>
          <DeleteIcon/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>

      <div>
        {
          tasksFiltered.map((i) => {

            return (
              <Task
                key={i.id}
                task={i}
                todoListId={props.id}
              />
            )
          })
        }
      </div>

      <div>
        <Button
          sx={{
            fontFamily: 'Museo Sans Cyrl',
            fontStyle: 'italic',
          }}
          color='inherit'
          className={props.filter === 'all' ? classes.activeFilter : ''}
          onClick={() => onClickChangeFilterHandler('all')}>All</Button>
        <Button
          sx={{
            fontFamily: 'Museo Sans Cyrl',
            fontStyle: 'italic',
          }}
          color='inherit'
          className={props.filter === 'active' ? classes.activeFilter : ''}
          onClick={() => onClickChangeFilterHandler('active')}>Active</Button>
        <Button
          sx={{
            fontFamily: 'Museo Sans Cyrl',
            fontStyle: 'italic',
          }}
          color='inherit'
          className={props.filter === 'completed' ? classes.activeFilter : ''}
          onClick={() => onClickChangeFilterHandler('completed')}>Completed</Button>
      </div>
    </div>
  );
});

