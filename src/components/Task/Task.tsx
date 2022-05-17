import React, {ChangeEvent, useCallback} from 'react';
import classes from "../Todolist/Todolist.module.css";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../State/tasks-reducer";
import {TaskStatuses, TaskType} from "../../api/tasks-api";
import {useTypedDispatch} from "../../State/Store";

export type TaskPropsType = {
  task: TaskType
  todoListId: string
}

export const Task = React.memo(({
                                  task,
                                  todoListId,
                                }: TaskPropsType) => {

  const dispatch = useDispatch()

  const label = {inputProps: {'aria-label': 'Checkbox demo'}};

  const changeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    let newStatusValue = event.currentTarget.checked
    dispatch(changeTaskStatusAC(todoListId, task.id, newStatusValue? TaskStatuses.Completed : TaskStatuses.New))
  }, [dispatch])

  const changeTitleHandler = (newValue: string) => {
    dispatch(changeTaskTitleAC(todoListId, task.id, newValue))
  }

  const onClickRemoveTasksButtonHandler = () => {
    dispatch(removeTaskAC(todoListId, task.id))
  }

  return (
    <div key={task.id}
         className={task.status === TaskStatuses.Completed ? classes.isDone : ''}>
      <Checkbox {...label}
                checked={task.status === TaskStatuses.Completed}
                onChange={changeStatusHandler}
                size="small"
                color='default'
                sx={{color: '#F2E7AC'}}/>
      <EditableSpan title={task.title} onChange={changeTitleHandler}/>
      <IconButton aria-label="delete" onClick={onClickRemoveTasksButtonHandler}>
        <DeleteIcon sx={{color: '#F2E7AC'}}/>
      </IconButton>
    </div>
  );
});