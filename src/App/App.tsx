import React from 'react';
import classes from './App.module.css'
import {ButtonAppBar} from "../components/ButtonAppBar/ButtonAppBar";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import {TodoListList} from "../features/TodolistList/TodolistList";
import {useTypedSelector} from "./Store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

export const App = () => {

  const status = useTypedSelector<RequestStatusType>((state) => state.app.status)

  return (
    <div className={classes.App}>
      <ButtonAppBar/>
      {status === 'loading' && <LinearProgress color="inherit" style={{color: '#253759'}}/>}
      <Container fixed>
        <TodoListList/>
        <ErrorSnackbar/>
      </Container>
    </div>
  )
};
