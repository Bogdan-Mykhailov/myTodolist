import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useTypedDispatch, useTypedSelector} from "../../02-BLL/Store";
import {logoutTC} from "../../02-BLL/auth-reducer";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../05-features/Routes/Routs";

export const ButtonAppBar = () => {

  const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
  const dispatch = useTypedDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static"
              sx={{background: 'linear-gradient(4deg, #F2B56B 4%, #253759 90%)'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              color: '#253759'
            }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6"
                      component="div"
                      sx={{
                        flexGrow: 1,
                        fontFamily: 'Museo Sans Cyrl',
                        color: '#253759',
                        fontWeight: '300'
                      }}>
            Stand With Ukraine 🇺🇦
          </Typography>
          {
            isLoggedIn &&
              <Button onClick={logoutHandler} color="inherit"
                      sx={{
                        color: '#F2B56B',
                        fontFamily: 'Museo Sans Cyrl',
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