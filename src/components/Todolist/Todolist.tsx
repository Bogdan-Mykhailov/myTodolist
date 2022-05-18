import React, {useCallback, useEffect} from 'react';
import classes from './Todolist.module.css'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import {Task} from "../Task/Task";
import {FilterValueType} from "../../State/todolist-reducer";
import {TaskStatuses, TaskType} from "../../api/tasks-api";
import {fetchTasksTC} from "../../State/tasks-reducer";
import {useTypedDispatch} from "../../State/Store";

type TodolistPropsType = {
  id: string
  title: string,
  tasks: TaskType[]
  addTask: (todoListId: string, title: string) => void
  changeFilter: (todoListId: string, filter: FilterValueType) => void
  filter: FilterValueType
  removeTodoLists: (todoListId: string) => void
  changeTodolistTitleHandler: (todoListId: string, newTitle: string) => void
  removeTask: (todoListId: string, taskId: string) => void
  changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
  changeTaskStatus: (todoListId: string, taskId: string, status: TaskStatuses) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {

  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(props.id))
  }, [])

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
    tasksFiltered = tasksFiltered.filter(i => i.status === TaskStatuses.New)
  }

  if (props.filter === 'completed') {
    tasksFiltered = tasksFiltered.filter(i => i.status === TaskStatuses.Completed)
  }

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
                removeTask={props.removeTask}
                changeTaskTitle={props.changeTaskTitle}
                changeTaskStatus={props.changeTaskStatus}
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

