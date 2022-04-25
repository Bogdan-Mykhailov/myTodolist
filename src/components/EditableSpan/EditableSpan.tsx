import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Box from '@mui/material/Box';
import {Input} from "@mui/material";

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
      activateViewMode();
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
          '& > :not(style)': {m: 1},
          color: 'white',
        }}
        noValidate
        autoComplete="off"
      >
        <Input
          onKeyPress={onKeyPressInputHandler}
          color="warning"
          onBlur={activateViewMode}
          onChange={onChangeTitleHandler}
          value={title}
          autoFocus/>
      </Box>
      : <span
        onDoubleClick={activeEditMode}
      >{props.title}</span>
  );
};

