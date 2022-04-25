import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";

export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  onChange: {
    description: 'Hello World'
  },
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});

EditableSpanStory.args = {
  onChange: action('Hello World')
}
