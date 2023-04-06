import React from 'react';

import { Typography } from "@/components";
import { MultipleSelectList } from './MultipleSelectList';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/MultipleSelectList',
  component: MultipleSelectList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
  { id: 6, name: '11 Durward Reynolds' },
  { id: 7, name: '22 Kenton Towne' },
  { id: 8, name: '33 Therese Wunsch' },
  { id: 9, name: '44 Benedict Kessler' },
  { id: 10, name: '55 Katelyn Rohan' },
]

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const [selected, setSelected] = React.useState([])
  return (
    <MultipleSelectList
      selected={selected}
      options={people}
      onSelect={(selected) => setSelected(selected)}
      {...args}
    />
  )
}

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  multiple: true,
  placeholderStr: "tap to select",
};

export const Secondary = Template.bind({});
Secondary.args = {
  multiple: false,
  placeholder: (<Typography variant="h4" color="blue">tap to select</Typography>),
};
