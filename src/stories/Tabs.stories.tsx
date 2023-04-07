import React from 'react';

import { Typography } from "@/components";
import { TabsComponent } from './TabsComponent';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Tabs',
  component: TabsComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return (<TabsComponent {...args} />);
}

const data = [
  {
    label: <Typography variant="h4" color="blue">HTML</Typography>,
    value: "html",
    desc: <Typography variant="paragraph" color="red">{`It really matters and then like it really doesn't matter.
    What matters is the people who are sparked by it. And the people 
    who are like offended by it, it doesn't matter.HTML`}</Typography>,
  },
  {
    label: "React",
    value: "react",
    desc: `Because it's about motivating the doers. Because I'm here
    to follow my dreams and inspire other people to follow their dreams, too.`,
  },
  {
    label: "Vue",
    value: "vue",
    desc: `We're not always in the position that we want to be at.
    We're constantly growing. We're constantly making mistakes. We're
    constantly trying to express ourselves and actualize our dreams.`,
  },
  {
    label: "Angular",
    value: "angular",
    desc: `Because it's about motivating the doers. Because I'm here
    to follow my dreams and inspire other people to follow their dreams, too.`,
  },
  {
    label: "Svelte",
    value: "svelte",
    desc: `We're not always in the position that we want to be at.
    We're constantly growing. We're constantly making mistakes. We're
    constantly trying to express ourselves and actualize our dreams.`,
  },
];

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  data: data,
  initalActive: "html"
};
