import React from 'react';
import classes from './App.module.css'
import {ButtonAppBar} from "../components/ButtonAppBar/ButtonAppBar";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import {useTypedSelector} from "./Store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {HashRouter} from "react-router-dom";
import {Routs} from "../features/Routes/Routs";

export const App = () => {

  const status = useTypedSelector<RequestStatusType>((state) => state.app.status)

  return (
    <div className={classes.App}>
      <ButtonAppBar/>
      <div style={{height: '5px'}}>
        {status === 'loading' && <LinearProgress color="inherit" style={{color: '#253759'}}/>}
      </div>
      <Container fixed>
        <Routs/>
        <ErrorSnackbar/>
      </Container>
    </div>
  )
};
