import React from 'react';

import { ColumnsListView } from "@/components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/ColumnsListView',
  component: ColumnsListView,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
};

const data = [
  { id: '1',     name: 'item1',   nlevel: 1, path: '1'      },  
  { id: '2',     name: 'item2',   nlevel: 1, path: '2'      },  
  { id: '3',     name: 'item3',   nlevel: 2, path: '2.3'    },  
  { id: '4',     name: 'item4',   nlevel: 2, path: '1.4'    },  
  { id: '5',     name: 'item5',   nlevel: 2, path: '1.5'    },  
  { id: '6',     name: 'item6',   nlevel: 3, path: '1.4.6'  },  
]

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return (
    <ColumnsListView
      items={data}
      {...args}
    />
  )
}

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
};
