import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useTypedDispatch, useTypedSelector} from "../../02-BLL/Store";
import {setAppErrorAC} from "../../02-BLL/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {

  const error = useTypedSelector<string | null>((state) => state.app.error)
  const dispatch = useTypedDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppErrorAC({error: null}))
  };

  return (
    <Snackbar open={error !== null} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
        {error}
      </Alert>
    </Snackbar>
  );
};
