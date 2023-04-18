import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import useResizeObserver from "use-resize-observer";
import { Typography } from "@/components";
import { CheckIcon } from "@heroicons/react/24/solid";

type ListOption = Record<string, any>;

export type MultipleSelectListProps = {
  multiple?: boolean;
  selected?: ListOption[];
  options?: ListOption[];
  placeholder?: React.ReactNode;
  onSelect: (value: ListOption[]) => void;
};

export const MultipleSelectList = (props) => {
  const {
    optionKey = "name",
    multiple = false,
    selected = [],
    options = [],
    placeholderStr = "tap to select",
    placeholder = (<Typography variant="paragraph" color="blue-gray">{placeholderStr}</Typography>),
    onSelect,
  } = props;

  const [selectedValue, setSelectedValue] = useState(selected)

  const { ref, height=50 } = useResizeObserver<HTMLButtonElement>({
    box: "border-box",
  });

  const handleChange = (value) => {
    setSelectedValue(value)
    onSelect(value)
  }

  const renderSelected = () => {
    if(!Array.isArray(selectedValue)) {
      return selectedValue[optionKey]
    }

    if (selectedValue.length === 0) {
      return placeholder
    } else {
      return selectedValue.map(v => v[optionKey]).join(', ')
    }
  }

  return (
    <motion.div className="relative ">
      <Listbox value={selectedValue} onChange={handleChange} multiple={multiple}>
        <Listbox.Button
          ref={ref}
          as={motion.div}
          className="rounded-md text-black text-lg px-0 py-0 border-0 flex items-center gap-2 cursor-pointer w-full md:max-w-96"
          layout="position"
        >
          { renderSelected() }
        </Listbox.Button>
        <AnimatePresence>
          <Listbox.Options
            as={motion.ul}
            className={"absolute top-10 left-0 z-50 bg-white p-3 rounded-lg shadow-lg w-full min-w-max text-lg flex flex-col gap-1 list-none focus:outline-none"}
            style={{top: height}}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
              {options.map((option, index) => (
                <Listbox.Option
                  key={`${option[optionKey]}-${index}`}
                  value={option}
                  className="flex cursor-pointer hover:bg-slate-100 py-1 px-2 rounded-lg"
                >
                  {({ active, selected }) => {
                    return (
                      <>
                        { selected && <CheckIcon strokeWidth={3} className="inline-block h-6 w-6 text-blue-gray-500" /> }
                        <Typography className={selected ? "" : "ml-6" } variant="paragraph" color={active ? 'blue-gray' : 'gray'} >{option[optionKey]}</Typography>
                      </>
                    )
                  }}
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </AnimatePresence>
      </Listbox>
    </motion.div>
  )
}

export default MultipleSelectList;
