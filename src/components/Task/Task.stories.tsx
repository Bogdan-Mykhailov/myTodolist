import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../State/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../State/Store";
import {TaskType} from "../../api/tasks-api";


export default {
  title: 'Todolist/Task',
  component: Task,
  args: {},
  decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof Task>;

const TaskUsingRedux = () => {
  const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todoListId1'][3])
  return <Task task={task} todoListId={'todoListId1'}/>
}

const Template: ComponentStory<typeof TaskUsingRedux> = () => <TaskUsingRedux />;

export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {}