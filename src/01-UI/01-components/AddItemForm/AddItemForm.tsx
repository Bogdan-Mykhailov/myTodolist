import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import classes from "../../../05-features/TodolistList/Todolist/Todolist.module.css";
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";

export type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }
  const onClickAddTaskButtonHandler = () => {
    if (title.trim() !== '') {
      props.addItem(title.trim())
      setTitle('')
    } else {
      setError('Title is require')
    }
  }
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error) setError(null)
    if (event.key === 'Enter') {
      onClickAddTaskButtonHandler()
    }
  }

  return (
    <div>
      <div>
        <TextField
          autoComplete='off'
          onKeyPress={onKeyPressHandler}
          value={title}
          onChange={onChangeInputHandler}
          className={error ? classes.error : ''}
          error={!!error}
          size={"small"}
          sx={{
            width: '210px'}}
          disabled={props.disabled}
        />

        <Button variant="contained"
                onClick={onClickAddTaskButtonHandler}
                disabled={props.disabled}
                sx={{
                  marginLeft: '10px',
                  width: '40px',
                  height: '40px',
                  fontSize: '15px',
                  fontWeight: '300',
                  fontStyle: 'italic',
                  color: '#F2B56B',
                  background: '#253759',
                  transition: 'all 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    background: '#253759'
                  }
                }}>Add</Button>
        {
          error && <div style={{fontWeight: '300',}}
                        className={classes.errorMessage}
            >Title is required</div>
        }
      </div>
    </div>
  )
})