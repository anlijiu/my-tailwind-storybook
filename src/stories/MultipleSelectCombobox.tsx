import { Fragment, useState, useEffect } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Chip, Input } from '@/components';

const defEqual = (def1, def2) => def1.name === def2.name
const defsEqual = (defs1, defs2) => defs1 && defs2 && defs1.length === defs2.length && defs1.every((d, idx) => defEqual(d, defs2[idx]))

export const MultipleSelectCombobox = (props) => {
  const {
    optionKey = "name",
    multiple = false,
    selected,
    onSelected,
    onDeleteSelect,
  } = props;
  
  const [candidates, setCandidates] = useState([])
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState(selected)

  console.log("MultipleSelectCombobox.tsx selected: ", selected)

  useEffect(() => {
    if(props.candidates && !defsEqual(candidates, props.candidates)) setCandidates(props.candidates)
  })

  const onInputChange = (value) => {
    setSearch(value)
    props.onInputChange(value)
  }

  const handleChange = (value) => {
    setSelectedValue(value)
    onSelected(value);
  }

  const handleTagClicked = (t) => {
    console.log("onTagClicked: ", t)
  }

  const handleTagDelete = (e, v, value) => {
    e.stopPropagation();
    console.log("onTagDelete : ", v, value)

    const newSelected = selectedValue.filter(e => e[optionKey] !== value[optionKey]);

    setSelectedValue(newSelected)
    onDeleteSelect(value);
  }

  const renderMultipleSelected = () => {
    if(selectedValue.length > 0) {
      return (
        <ul className="flex flex-wrap gap-2">
          {selectedValue.map((value, index) => (
            <Chip
              key={index}
              variant="gradient"
              onClick={handleTagClicked}
              // onTouchStart={handleTagClicked}
              dismissible={{
                onClose: (e, v) => handleTagDelete(e, v, value)
              }}
              value={value[optionKey]}
            />
          ))}
        </ul>
      )
    }
  }

  return (
    <div className="w-full">
      <Combobox value={selectedValue} onChange={handleChange} multiple={multiple}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            { multiple && renderMultipleSelected() }
            <Combobox.Input
              as={Input}
              displayValue={(v) => v[optionKey]}
              onChange={(event) => onInputChange(event.target.value)}
              icon={
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              }
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => onInputChange('')}
          >
            <Combobox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {candidates.length === 0 ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                candidates.map((cand) => (
                  <Combobox.Option
                    key={cand.name}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={cand}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {cand.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default MultipleSelectCombobox;
