import React from 'react';

import { Checkbox } from '@/components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Checkbox',
  component: Checkbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Checkbox {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Checkbox',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Checkbox',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Checkbox',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Checkbox',
};
