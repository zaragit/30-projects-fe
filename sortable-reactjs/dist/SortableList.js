import './SortableList.css';
import React, { useCallback, useState } from 'react';
import SortableListItem from './SortableListItem';

function SortableList({
  data,
  onDragItem,
  onClickItem,
  renderItem
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [listData, setListData] = useState(data);

  const onDragStart = index => setStartIndex(index);

  const onDrop = useCallback(index => {
    const dragItem = listData[startIndex];
    const list = [...listData];
    list.splice(startIndex, 1);
    const newListData = startIndex < index ? [...list.slice(0, index - 1), dragItem, ...list.slice(index - 1, list.length)] : [...list.slice(0, index), dragItem, ...list.slice(index, list.length)];
    setListData(newListData);
    onDragItem(newListData);
  }, [startIndex, onDragItem, listData]);
  return /*#__PURE__*/React.createElement("ul", {
    className: "sortable-list"
  }, listData.map((item, index) => /*#__PURE__*/React.createElement(SortableListItem, {
    key: index,
    index: index,
    draggable: true,
    onDropItem: onDrop,
    onDragStart: onDragStart,
    onClickItem: onClickItem
  }, renderItem(item, index))), /*#__PURE__*/React.createElement(SortableListItem, {
    key: listData.length,
    index: listData.length,
    draggable: false,
    onDropItem: onDrop
  }));
}

export default SortableList;