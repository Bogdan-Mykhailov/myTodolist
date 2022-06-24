import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {Login} from "../Login/Login";
import {TodoListList} from "../TodolistList/TodolistList";
import {Error404} from "../ErrorPage/Error404";


export const PATH = {
  LOGIN: '/login',
  TODO_LIST: '/todo-list',
  ERROR_404: '/error-404'
}

export const Routs = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to={PATH.TODO_LIST}/>}/>
        <Route path={PATH.LOGIN} element={<Login/>}/>
        <Route path={PATH.TODO_LIST} element={<TodoListList/>}/>
        <Route path='/*' element={<Navigate to={PATH.ERROR_404}/>}/>
        <Route path={PATH.ERROR_404} element={<Error404/>}/>
      </Routes>
    </div>
  );
};