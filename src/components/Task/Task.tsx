import React, {ChangeEvent, useCallback} from 'react';
import {ObjectType} from "../Todolist/Todolist";
import classes from "../Todolist/Todolist.module.css";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../State/tasks-reducer";

export type TaskPropsType = {
  task: ObjectType
  todoListId: string
  // removeTasks: (taskId: string) => void
  // changeTaskTitle: (taskId: string, newValue: string) => void
  // changeStatus: (taskId: string,newStatusValue: boolean) => void
}

export const Task = React.memo(({
                                  task,
                                  todoListId,
                                  // removeTasks,
                                  // changeStatus,
                                  // changeTaskTitle,
                                }: TaskPropsType) => {

  const dispatch = useDispatch()

  const label = {inputProps: {'aria-label': 'Checkbox demo'}};

  const changeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    let newStatusValue = event.currentTarget.checked
    dispatch(changeTaskStatusAC(todoListId, task.id, newStatusValue))
  }, [dispatch])

  const changeTitleHandler = (newValue: string) => {
    dispatch(changeTaskTitleAC(todoListId, task.id, newValue))
  }

  const onClickRemoveTasksButtonHandler = () => {
    dispatch(removeTaskAC(todoListId, task.id))
  }

  return (
    <div key={task.id}
         className={task.isDone ? classes.isDone : ''}>

      <IconButton aria-label="delete" onClick={onClickRemoveTasksButtonHandler}>
        <DeleteIcon sx={{color: '#F2E7AC'}}/>
      </IconButton>
      <Checkbox {...label}
                checked={task.isDone}
                onChange={changeStatusHandler}
                size="small"
                color='default'
                sx={{color: '#F2E7AC'}}/>
      <EditableSpan title={task.title} onChange={changeTitleHandler}/>
    </div>
  );
});