// 本组件为最简单的一种 list

import { FixedSizeList, ListChildComponentProps } from 'react-window';
import React, { useRef, useState, ReactElement, ComponentType, useEffect } from 'react';
import useResizeObserver from "use-resize-observer";

const RowViewWrapper = (props: ListChildComponentProps) => {
  const {
    index,
    style,
    data,
    isScrolling,
  } = props;

  const { items, itemView: ItemView, onClick } = data;

  const item = items[index];

  console.log(" ItemViewWrapper ,  item: ", item, "    index: ", index, "  items:", items);
  return (
    <div style={style} onClick={() => onClick(item)}>
      <ItemView item={item}>
      </ItemView>
    </div>
  )
}

export type ListViewProps = {
  items: [any]
  itemView: ComponentType;
  rowHeight: number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
};
export const ListView: React.FC<ListViewProps> = (props): ReactElement => {
  const {
    items,
    itemView,
    rowHeight,
    className,
    onClick
  } = props;

  const [height, setHeight] = useState(rowHeight*items.length);
  
  const { ref, width=600 } = useResizeObserver<HTMLDivElement>({
    box: "border-box",
  });

  console.log("ListView   width: ", width, ", height: ", height)

  console.log("ListView,  items: ", items);
  return (
    <div
      ref={ref}
      style={{height: `${height}px`, width: `100%`}}
      >
        <FixedSizeList
          className={className}
          itemCount={items.length}
          itemSize={rowHeight}
          height={height}
          width={width}
          itemData={{
            items: items,
            itemView: itemView,
            onClick: onClick
          }}
        >
          {RowViewWrapper}
        </FixedSizeList>  
    </div>
  )

}
