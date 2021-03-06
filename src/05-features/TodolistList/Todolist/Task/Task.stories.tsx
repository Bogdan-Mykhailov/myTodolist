import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../../../02-BLL/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../02-BLL/Store";
import {TaskType} from "../../../../03-DAL/tasks-api";


export default {
  title: 'Todolist/Task',
  component: Task,
  args: {},
  decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof Task>;

// const TaskUsingRedux = () => {
//   const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todoListId1'][3])
//   return <Task task={task} todoListId={'todoListId1'} changeTaskTitle={} changeTaskStatus={changeTaskStatus} removeTask={removeTask}/>
// }
//
// const Template: ComponentStory<typeof TaskUsingRedux> = () => <TaskUsingRedux />;

// export const TaskIsDoneStory = Template.bind({});

// TaskIsDoneStory.args = {}