import React from 'react';

import QueueMusic from '@mui/icons-material/QueueMusic';
import Close from '@mui/icons-material/Close';

import './PlayList.scss';
import { useDispatch, useSelector } from 'react-redux';
import PlayListItem from './PlayListItem';
import SortableList from '@billy-fe/sortable-list';
import classNames from 'classnames';
import {
  setCurrentIndex,
  updatePlayList,
} from '../../store/musicPlayerReducer';

const PlayList = ({ showPlayList, setShowPlayList }) => {
  const playList = useSelector((state) => state.playList);
  const dispatch = useDispatch();

  const onClickClosePlayList = () => {
    setShowPlayList(false);
  };

  const renderItem = (item, index) => (
    <PlayListItem item={item} index={index} />
  );

  const onClickItem = (index) => {
    dispatch(setCurrentIndex(index));
  };

  const onDropItem = (newPlayList) => {
    dispatch(updatePlayList(newPlayList));
  };

  return (
    <div className={classNames('play-list', { show: showPlayList })}>
      <div className="header">
        <div className="row">
          <QueueMusic className="list" />
          <span>Play list</span>
        </div>
        <Close
          sx={{ fontSize: 22, cursor: 'pointer' }}
          onClick={onClickClosePlayList}
        />
      </div>
      <SortableList
        data={playList}
        renderItem={renderItem}
        onClickItem={onClickItem}
        onDropItem={onDropItem}
      />
    </div>
  );
};

export default PlayList;
