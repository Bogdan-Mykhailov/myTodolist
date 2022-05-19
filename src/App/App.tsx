import React from 'react';
import './App.css';
import {ButtonAppBar} from "../components/ButtonAppBar/ButtonAppBar";
import {Container} from "@mui/material";
import {TodoListList} from "../features/TodolistList/TodolistList";

export const App = () => (

  <div>
    <ButtonAppBar/>
    <Container fixed>
      <TodoListList/>
    </Container>
  </div>
);
