import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import classes from "../Todolist/Todolist.module.css";
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";

export type AddItemFormPropsType = {
  addItem: (title: string) => void
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
            maxWidth: '180px',
            minWidth: '180px',
          }}/>

        <Button variant="text"
                onClick={onClickAddTaskButtonHandler}
                sx={{
                  fontSize: '18px',
                  fontFamily: 'Museo Sans Cyrl',
                  fontWeight: '400',
                  fontStyle: 'italic',
                  color: '#253759'
                }}>Add</Button>
        {error && <div style={{
          fontFamily: 'Museo Sans Cyrl',
          fontWeight: '300',
        }} className={classes.errorMessage}>Title is required</div>}
      </div>
    </div>
  )
})