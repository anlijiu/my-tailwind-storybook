import { Fragment, useState, useEffect } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const defEqual = (def1, def2) => def1.name === def2.name
const defsEqual = (defs1, defs2) => defs1 && defs2 && defs1.length === defs2.length && defs1.every((d, idx) => defEqual(d, defs2[idx]))

export const Tags = (props) => {
  const {
    propertyDefs,
    onInputChange,
    selected,
    onSelected,
    field,
    form,
    meta
  } = props;
  
  const [defs, setDefs] = useState([])

  // const [selected, setSelected] = useState(null)
  console.log("Tags.tsx selected: ", selected)
  // const [query, setQuery] = useState('')

  useEffect(() => {
    if(propertyDefs && !defsEqual(defs, propertyDefs)) setDefs(propertyDefs)
  })

  const onChange = (p) => {
    form.setFieldValue("propertyName", p.name)
    form.setFieldValue("areaArray", [])

    onSelected(p);
  }
//   <div>
//   <input type="text" placeholder="Email" {...field} />
//   {meta.touched && meta.error && (
//     <div className="error">{meta.error}</div>
//   )}
// </div>
  return (
    <div className="w-72">
      <Combobox multiple value={selected} onChange={onChange}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(def) => def?.name ?? ""}
              onChange={(event) => onInputChange(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => onInputChange('')}
          >
            <Combobox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {defs.length === 0 ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                defs.map((def) => (
                  <Combobox.Option
                    key={def.name}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={def}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {def.name}
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

export default Tags;
