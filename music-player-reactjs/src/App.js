import './App.scss';

import React, { useState, useRef } from 'react';

import Controls from './components/Controls/Controls';
import PlayList from './components/PlayList/PlayList';
import SongDetail from './components/SongDetail/SongDetail';
import ProgressArea from './components/ProgressArea/ProgressArea';

function App() {
  const audioRef = useRef();
  const [showPlayList, setShowPlayList] = useState(false);

  const onPlay = () => {
    audioRef.current.play();
  };

  const onPause = () => {
    audioRef.current.pause();
  };

  const changeVolume = (volume) => {
    audioRef.current.changeVolume(volume);
  };

  const resetDuration = () => {
    audioRef.current.resetDuration();
  };

  return (
    <div className="App">
      <div className="container">
        <SongDetail />
        <ProgressArea ref={audioRef} />
        <Controls
          setShowPlayList={setShowPlayList}
          onPlay={onPlay}
          onPause={onPause}
          changeVolume={changeVolume}
          resetDuration={resetDuration}
        />
        <PlayList
          setShowPlayList={setShowPlayList}
          showPlayList={showPlayList}
        />
      </div>
    </div>
  );
}

export default App;
