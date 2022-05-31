import './SongDetail.scss';

import React from 'react';
import { useSelector } from 'react-redux';

function SongDetail() {
  const { playing, playList, currentIndex } = useSelector(
    ({ playing, playList, currentIndex }) => ({
      playing,
      playList,
      currentIndex,
    })
  );

  return (
    <>
      <div className="header">
        <span>{playing ? 'Now Playing' : 'Not Playing'}</span>
      </div>
      <div className="img-area">
        <img
          src={playList[currentIndex].img}
          alt={playList[currentIndex].name}
        />
      </div>
      <div className="music-info">
        <p className="song">{playList[currentIndex].name}</p>
        <p className="artist">{playList[currentIndex].artist}</p>
      </div>
    </>
  );
}

export default SongDetail;
