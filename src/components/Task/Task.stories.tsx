import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";

export default {
  title: 'Todolist/Task',
  component: Task,
  args: {
    changeStatusHandler: action('changeTaskStatus'),
    changeTitleHandler: action('changeTaskTitle'),
    onClickRemoveTasksButtonHandler: action('removeTask')
  },
  decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {
  task: {id: 'Bogdan', title: 'Frontend dev', isDone: true},
  todoListId: 'todoListId'
}

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
  task: {id: 'Bogdan', title: 'Frontend dev', isDone: false},
  todoListId: 'todoListId'
}