import React, { ReactElement, useState, useRef, useMemo } from 'react';
import {
  Button,
  Input
} from '@/components';

type ColumnsListViewProps = {
  items: any[];
  parent?: any;
};

type ColumnViewItem = {
  idx: number;
  items: any[];
  parent: any;
  onItemClick: (item: any) => void;
  onAddCategory: (name: any) => void;
}

type ColumnViewProps = {
  data: ColumnViewItem;
};

const bgColors = [
  'bg-red-50',
  'bg-orange-50',
  'bg-amber-50',
  'bg-yellow-50',
  'bg-lime-50',
  'bg-green-50',
  'bg-emerald-50',
  'bg-teal-50',
  'bg-cyan-50',
  'bg-light-blue-50',
  'bg-blue-50',
  'bg-indigo-50',
  'bg-violet-50',
  'bg-purple-50',
  'bg-fuchsia-50',
  'bg-pink-50',
  'bg-rose-50',
]

const ColumnView: React.FC<ColumnViewProps> = (props): ReactElement => {
  const { data } = props;
  const { items, idx, parent, onItemClick, onAddCategory } = data;
  const inputRef = useRef<HTMLInputElement>();
  const [inputValue, setInputValue] = useState<string>("");

  const colorIdx = idx % bgColors.length;
  const colorClass = bgColors[colorIdx];

  const handleChange = (e) => {
    console.log("handleChange, e: ", e.target.value);
    setInputValue(e.target.value);
  }
  const handleAddCategory = (e) => {
    console.log("handleAddCategory , e: ", e, ",  inputRef.current: ", inputRef.current.value);
    onAddCategory(inputRef.current.value) 
  }
  console.log("ColumnView, data:", items, "  parent: ", parent);
  return (
    <div className={`min-w-[350px] sm:w-52 mr-2 ${colorClass}`}>
      <div className={"p-2 bg-gray-100 items-center flex justify-between border-b-2"}>
        <div className={"font-medium"}>{parent ? parent.name : "root"}</div>
        <div className="flex gap-2">
          <Input ref={inputRef} containerProps={{className: "w-20"}} onChange={handleChange} />
          <Button size="sm" onClick={handleAddCategory} disabled={!inputValue}>Add</Button>
        </div>
      </div>
      <div className={"overflow-auto divide-y-2 mt-1"}>
        { items.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            onClick={() => onItemClick(item)}
            className={`p-2 hover:bg-gray-100 bg-gray-200: ${item.focus && "bg-gray-200"}`}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function subpath(path, nlevel) {
  let arr = path.split('.')
  return arr.slice(0, nlevel).join('.')
}

const group = (list, key) => {
  return list.reduce((prev, curr) => {
    return {
      ...prev,
      [curr[key]]: [
        ...(prev[curr[key]] || []),
        curr, 
      ] 
    }    
  }, {}) 
}

export const ColumnsListView: React.FC<ColumnsListViewProps> = (props): ReactElement => {
  const { items: origItems } = props;

  const [focusItemPath, setFocusItemPath] = useState<string|undefined>();

  const handleItemClick = (item) => {
    console.log("handleItemClick  , item: ", item);
    setFocusItemPath(item.path)
  }

  const handleAddCategoryClick = (parent, name) => {
    console.log("handleAddCategoryClick , parent: ", parent, name);
  }

  const columns = useMemo(() => {
    let itemsWithFocus = origItems.map(item => {
      let focus = focusItemPath && subpath(focusItemPath, item.nlevel) === item.path;
      return { ...item, focus };
    });

    console.log("itemsWithFocus , itemsWithFocus: ", itemsWithFocus)

    // let items = Object.values(itemsWithFocus.group(e => e.nlevel))
    let items: any[] = Object.values(group(itemsWithFocus, 'nlevel'))
    return items.map((list, idx) => {
      const parentPath = focusItemPath ? subpath(focusItemPath, idx) : undefined
      const parent = parentPath ? itemsWithFocus.find(e => e.path === parentPath) : undefined
      return {
        items: list,
        idx: idx,
        onItemClick: handleItemClick,
        onAddCategory: (name) => handleAddCategoryClick(parent, name),
        parent: parent
      }
    });
  }, [origItems, focusItemPath]);


  return (
    <div className="flex">
      {
        columns.map((column, idx) => {
          return (
            <ColumnView
              key={idx}
              data={column}
            />
          );
        })
      }
    </div>
  );
}


