import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';
import Draggable from '@zaradev/draggable';
import {
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
  useCallback,
} from 'react';

import './Memo.scss';
import { debounce } from 'underscore';
import { observer } from 'mobx-react';

function Memo({ item, remove, edit, setPosition, setSize }) {
  const handleRef = useRef(null);
  const memoContainer = useRef(null);

  const onChangeMemo = useMemo(
    () => debounce((e) => edit(item.id, e.target.value), 500),
    [item.id, edit]
  );

  const onChangeSize = useMemo(
    () =>
      debounce((entry) => {
        const { width, height } = entry[0].contentRect;
        setSize(item.id, width, height);
      }, 100),
    [item.id, setSize]
  );

  const onChangePosition = useCallback(
    (x, y) => setPosition(item.id, x, y),
    [item.id, setPosition]
  );

  useEffect(() => {
    return () => {
      onChangeMemo.cancel();
      onChangeSize.cancel();
    };
  }, [onChangeMemo, onChangeSize]);

  useLayoutEffect(() => {
    let RO = new ResizeObserver(onChangeSize);
    RO.observe(memoContainer.current);
    return () => {
      RO.disconnect();
      RO = null;
    };
  });

  const onClickClose = useCallback(() => {
    remove(item.id);
  }, [item.id, remove]);

  return (
    <Draggable
      handleRef={handleRef}
      x={item.position.x}
      y={item.position.y}
      onMove={onChangePosition}
    >
      <div
        ref={memoContainer}
        className="memo-container"
        style={{ width: `${item.width}px`, height: `${item.height}px` }}
      >
        <div className="menu">
          <DragHandleIcon
            ref={handleRef}
            sx={{ cursor: 'move', fontSize: '25px' }}
          />
          <CloseIcon
            sx={{ cursor: 'pointer', fontSize: '25px', float: 'right' }}
            onClick={onClickClose}
          />
        </div>
        <textarea
          className="memo-text-area"
          defaultValue={item.content}
          name="txt"
          placeholder="Enter memo here"
          onChange={onChangeMemo}
        ></textarea>
      </div>
    </Draggable>
  );
}

export default observer(Memo);
