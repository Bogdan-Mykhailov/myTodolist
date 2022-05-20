import React, {ChangeEvent, useCallback} from 'react';
import classes from "../Todolist.module.css";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../../../api/tasks-api";

export type TaskPropsType = {
  task: TaskType
  todoListId: string
  removeTask: (todoListId: string, taskId: string) => void
  changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
  changeTaskStatus: (todoListId: string, taskId: string, status: TaskStatuses) => void
}

export const Task = React.memo((props: TaskPropsType) => {

  const label = {inputProps: {'aria-label': 'Checkbox demo'}};

  const removeTasksButtonHandler = useCallback(() => {
    props.removeTask(props.todoListId, props.task.id)
  }, [props.removeTask])



  const changeTitleHandler = useCallback((newValue: string) => {
    props.changeTaskTitle(props.todoListId, props.task.id, newValue)

  }, [props.changeTaskTitle])




  const changeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = event.currentTarget.checked
    props.changeTaskStatus(props.todoListId, props.task.id, newStatusValue ? TaskStatuses.Completed : TaskStatuses.New)
  }, [props.changeTaskStatus])

  return (
    <div key={props.task.id}
         className={props.task.status === TaskStatuses.Completed ? classes.isDone : ''}>
      <Checkbox {...label}
                checked={props.task.status === TaskStatuses.Completed}
                onChange={changeStatusHandler}
                size="small"
                color='default'
                sx={{color: '#F2E7AC'}}/>
      <EditableSpan title={props.task.title} onChange={changeTitleHandler}/>
      <IconButton aria-label="delete" onClick={removeTasksButtonHandler}>
        <DeleteIcon sx={{color: '#F2E7AC'}}/>
      </IconButton>
    </div>
  );
});