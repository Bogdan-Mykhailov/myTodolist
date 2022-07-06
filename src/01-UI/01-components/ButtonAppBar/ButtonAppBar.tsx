import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useTypedDispatch, useTypedSelector} from "../../../02-BLL/Store";
import {logoutTC} from "../../../02-BLL/auth-reducer";
import bad from '../../../00-assets/Untitled-1.svg'
import s from './ButtonAppBar.module.css'

export const ButtonAppBar = () => {

  const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
  const dispatch = useTypedDispatch()

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static"
              sx={{background: 'linear-gradient(4deg, #F2B56B 4%, #253759 90%)'}}>
        <Toolbar>
          {/*<IconButton*/}
          {/*  size="large"*/}
          {/*  edge="start"*/}
          {/*  color="inherit"*/}
          {/*  aria-label="menu"*/}
          {/*  sx={{*/}
          {/*    mr: 2,*/}
          {/*    color: '#253759'*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <MenuIcon/>*/}
          {/*</IconButton>*/}
          <Typography variant="h6"
                      component="div"
                      sx={{
                        flexGrow: 1,
                        color: '#253759',
                        fontWeight: '300'
                      }}>
            <div className={s.imgWrapper}>
              <img className={s.logoImg} src={bad} alt='badLogo'/>
              Stand With Ukraine
            </div>
          </Typography>
          {
            isLoggedIn &&
              <Button onClick={logoutHandler} color="inherit"
                      sx={{
                        color: '#F2B56B',
                        fontWeight: '900',
                        fontSize: '15px'
                      }}>
                  Log Out
              </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}