import React, {useEffect} from 'react';
import classes from './App.module.css'
import {ButtonAppBar} from "../01-components/ButtonAppBar/ButtonAppBar";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import {useTypedDispatch, useTypedSelector} from "../02-BLL/Store";
import {RequestStatusType} from "../02-BLL/app-reducer";
import {ErrorSnackbar} from "../01-components/ErrorSnackbar/ErrorSnackbar";
import {Routs} from "../05-features/Routes/Routs";
import {initializeMeTC} from "../02-BLL/auth-reducer";

export const App = () => {
  const status = useTypedSelector((state) => state.app.status)
  const isInitialized = useTypedSelector((state) => state.auth.isInitialized)
  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(initializeMeTC())
  }, [])

  if (!isInitialized) return <LinearProgress color="inherit" style={{color: '#253759'}}/>

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
