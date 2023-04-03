import React, { ReactElement, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { Chip } from '../Chip';
import { canDrag, canDrop } from './utils';

import RemoveComponent from './RemoveComponent';
import Typography from '../Typography';

const ItemTypes = { TAG: 'tag' };

export type TagProps = {
  readOnly?: boolean;
  tag: any;
  classNames?: {
    remove?: string | undefined;
    tag?: string | undefined;
  } | undefined;
  labelField?: string | undefined;
  allowDragDrop? : boolean | undefined;
  index: number;
  moveTag: (dragIndex: number, hoverIndex: number) => void;
  onTagClicked: (e) => void;
  onDelete: (e) => void;
  removeComponent?: React.ElementType | undefined;
}

const Tag: React.FC<TagProps> = (props): ReactElement => {
  const tagRef = useRef(null);
  const { readOnly, tag, classNames, index } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TAG,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: props,
    canDrag: () => canDrag(props),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TAG,
    drop: (item: any, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      props.moveTag(dragIndex, hoverIndex);
    },
    canDrop: (item) => canDrop(item),
  }));

  drag(drop(tagRef));

  const label = props.tag[props.labelField];
  const { className = '' } = tag;
  /* istanbul ignore next */
  const opacity = isDragging ? 0 : 1;
  const tagComponent = (
    <Chip
      ref={tagRef}
      variant="gradient"
      className={ClassNames('tag-wrapper', classNames.tag, className)}
      style={{
        opacity,
        cursor: canDrag(props) ? 'move' : 'auto',
      }}
      // onClick={props.onTagClicked}
      // onTouchStart={props.onTagClicked}>
      // dismissible={{
      //   onClose: (e) => props.onDelete(e),
      // }}
      value={label}
    >
      <RemoveComponent
        tag={props.tag}
        className={classNames.remove}
        removeComponent={props.removeComponent}
        onRemove={props.onDelete}
        readOnly={readOnly}
        index={index}
      />
    </Chip>
    // <span
    //   ref={tagRef}
    //   className={ClassNames('tag-wrapper', classNames.tag, className)}
    //   style={{
    //     opacity,
    //     cursor: canDrag(props) ? 'move' : 'auto',
    //   }}
    //   onClick={props.onTagClicked}
    //   onTouchStart={props.onTagClicked}>
    //   {label}
    //   <RemoveComponent
    //     tag={props.tag}
    //     className={classNames.remove}
    //     removeComponent={props.removeComponent}
    //     onRemove={props.onDelete}
    //     readOnly={readOnly}
    //     index={index}
    //   />
    // </span>
  );
  return tagComponent;
};

Tag.propTypes = {
  labelField: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  tag: PropTypes.shape({
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    key: PropTypes.string,
  }),
  moveTag: PropTypes.func,
  removeComponent: PropTypes.func,
  onTagClicked: PropTypes.func,
  classNames: PropTypes.shape({
    remove: PropTypes.string,
    tag: PropTypes.string,
  }),
  readOnly: PropTypes.bool,
  index: PropTypes.number.isRequired,
};

Tag.defaultProps = {
  labelField: 'text',
  readOnly: false,
};

export default Tag;
