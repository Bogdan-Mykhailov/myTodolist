import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useTypedDispatch, useTypedSelector} from "../../02-BLL/Store";
import {loginTC} from "../../02-BLL/auth-reducer";
import {useNavigate} from "react-router-dom";
import {PATH} from "../Routes/Routs";
import bad from '../../00-assets/Untitled-1.svg'
import s from './Login.module.css'

type FormikErrorsType = {
  email?: string
  password?: string
  rememberMe?: boolean
}


export const Login = () => {
  const dispatch = useTypedDispatch()
  const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate: (values) => {
      const errors: FormikErrorsType = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 4) {
        errors.password = 'Must be 4 characters or more'
      }

      return errors;
    },
    onSubmit: values => {
      dispatch(loginTC(values))
      formik.resetForm()
    },
  })

  /*если залогинился перенаправляет на TODO_LIST*/
  {
    isLoggedIn && navigate(PATH.TODO_LIST)
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid
        sx={{
          border: '1px solid black',
          borderRadius: '7px',
          marginTop: '20vh',
          padding: '20px'
        }}
        item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <img className={s.logo} src={bad} alt="badLogo"/>
            <FormLabel sx={{width: '300px', marginTop: '0px'}}>
              <p>
                To log in use test credentials:
                <hr className={s.hr}/>
                Email: free@samuraijs.com
                <br/>
                Password: free
              </p>
            </FormLabel>
            <FormGroup>
              <TextField
                size='small'
                label="Email"
                margin="normal"
                // name='email'
                // onChange={formik.handleChange}
                // value={formik.values.email}
                // /*onBlur вешаю чтоб ошибка падала только тогда когда я не заполнил до конца поле ввода */
                // onBlur={formik.handleBlur}

                /*вместо 4 строк кода можно написать одну такую*/
                {...formik.getFieldProps('email')}
              />
              {/*тут я проверяю или я тронул поле и если да тогда отрисовую ошибку */}
              {formik.touched.email &&
                formik.errors.email &&
                  <div style={{color: 'red'}}>{formik.errors.email}</div>}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                size='small'
                // name='password'
                // onChange={formik.handleChange}
                // value={formik.values.password}
                // /*onBlur вешаю чтоб ошибка падала только тогда когда я не заполнил до конца поле ввода */
                // onBlur={formik.handleBlur}

                /*вместо 4 строк кода можно написать одну такую*/
                {...formik.getFieldProps('password')}
              />
              {/*тут я проверяю или я тронул поле и если да тогда отрисовую ошибку*/}
              {formik.touched.password &&
                formik.errors.password &&
                  <div style={{color: 'red'}}>{formik.errors.password}</div>}
              <FormControlLabel
                label={'Remember me'}
                control={<Checkbox
                  color='default'
                  sx={{
                    color: '#253759',
                  }}/>}

                checked={formik.values.rememberMe}
                // name='rememberMe'
                // onChange={formik.handleChange}
                // /*onBlur вешаю чтоб ошибка падала только тогда когда я не заполнил до конца поле ввода */
                // onBlur={formik.handleBlur}

                /*вместо 3 строк кода можно написать одну такую*/
                {...formik.getFieldProps('rememberMe')}
              />
              <Button type={'submit'}
                      variant='contained'
                      sx={{
                        border: 'none',
                        fontStyle: 'italic',
                        color: '#F2B56B',
                        background: '#253759',
                        transition: 'all 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.01)',
                          background: '#253759'
                        }
                      }}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
}
