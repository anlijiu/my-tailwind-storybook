//FixedSizeList : 如果您有一个长长的一维列表，其中包含的项目大小相同，则使用 FixedSizeList 组件。
//VariableSizeGrid : 使用 VariableSizeList 组件可渲染具有不同大小的项目的列表。该组件的工作方式与固定大小的列表相同，但需要 itemSize 属性的函数，而不是特定值。
// 本组件为最简单的一种 grid ,  用于以grid的方式展示list 所以就用 FixedSizeGrid 了

import { FixedSizeGrid, GridChildComponentProps, VariableSizeGrid } from 'react-window';
import React, { useRef, useState, ReactElement, ComponentType, useEffect } from 'react';
import AutoSizer from "react-virtualized-auto-sizer";
import useResizeObserver from "use-resize-observer";

const ItemViewWrapper = (props) => {
  const {
    columnIndex,
    rowIndex,
    style,
    data,
    isScrolling,
  } = props;

  const { itemWrapperClassName, items, columnCount, itemView: ItemView } = data;

  const index = rowIndex*columnCount + columnIndex;
  const item = items[index];

  console.log(" ItemViewWrapper ,  item: ", item, "    index: ", index, "  items:", items);
  if(item) {
    return (
      <div style={style} className={itemWrapperClassName}>
        <ItemView item={item}>
        </ItemView>
      </div>
    )
  } else {
    return <div></div>;
  }
}

export type GridViewProps = {
  items: [any]
  itemView: ComponentType;
  columnWidth: number;
  rowHeight: number;
  itemWrapperClassName?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
};
export const GridView: React.FC<GridViewProps> = (props): ReactElement => {
  const {
    items,
    itemView,
    columnWidth,
    rowHeight,
    itemWrapperClassName,
    className,
    onClick
  } = props;

  const [height, setHeight] = useState(rowHeight);
  
  const { ref, width=600 } = useResizeObserver<HTMLDivElement>({
    box: "border-box",
  });

  let columnCount = Math.floor(width/columnWidth);
  if(columnCount < 1) columnCount = 1;

  let rowCount = Math.floor(items.length/columnCount);
  if(rowCount < 1) rowCount = 1;


  console.log("GridView   width: ", width, ", height: ", height)


  useEffect(() => {

    if(items && items.length > 0) {



      const _height = rowCount * rowHeight
      if(_height > height) setHeight(_height)
    }
  })

  console.log(" GridView,  items: ", items);
  return (
    <div
      ref={ref}
      style={{height: `${height}px`}}
      >
            <FixedSizeGrid
              className={className}
              columnWidth={columnWidth}
              rowHeight={rowHeight}
              columnCount={columnCount}
              height={height}
              rowCount={rowCount}
              width={width}
              itemData={{
                itemWrapperClassName,
                items: items,
                columnCount: columnCount,
                itemView: itemView
              }}
            >
              {ItemViewWrapper}
            </FixedSizeGrid>  
    </div>
  )

}
