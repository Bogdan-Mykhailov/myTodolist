import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Box from '@mui/material/Box';
import {Input} from "@mui/material";
import s from './EditableSpan.module.css'

type EditableSpanPropsType = {
  title: string
  onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');

  const activeEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const onKeyPressInputHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setEditMode(false);
    }
  };

  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  return (
    editMode
      ? <Box
        component="form"
        sx={{
          '& > :not(style)': {marginTop: -1},
          color: '#F2B56B',
        }}
        noValidate
        autoComplete="off"
      >
        <div className={s.inputWrapper}>
          <Input
            onKeyPress={onKeyPressInputHandler}
            color='warning'
            sx={{
              color: "#253759",
              width: '190px',
              fontSize: '17px',
              marginLeft: '12px',
            }}
            onBlur={activateViewMode}
            onChange={onChangeTitleHandler}
            value={title}
            autoFocus
          />
        </div>
      </Box>
      : <span onDoubleClick={activeEditMode}>{props.title}</span>
  );
};

