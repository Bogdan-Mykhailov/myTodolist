import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {ReduxStoreProviderDecorator} from "../02-BLL/ReduxStoreProviderDecorator";
import {App} from "./App";

export default {
  title: 'Todolist/TodoListList',
  component: App,
  decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App />;

export const AppStory = Template.bind({});

AppStory.args = {}
