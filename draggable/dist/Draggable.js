import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'underscore';
import './Draggable.css';

function Draggable({
  children,
  handleRef,
  onMove,
  x = 0,
  y = 0
}) {
  const dragRef = useRef(null);
  const initialX = useRef(0);
  const initialY = useRef(0);
  const [position, setPosition] = useState({
    x,
    y
  });
  const move = useMemo(() => debounce((x, y) => {
    console.log('호출');
    onMove(x, y);
  }, 500), [onMove]);
  const onMouseMove = useCallback(event => {
    setPosition({
      x: event.clientX - initialX.current,
      y: event.clientY - initialY.current
    });
    move(event.clientX - initialX.current, event.clientY - initialY.current);
  }, [move]);
  const removeEvents = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', removeEvents);
    document.body.removeEventListener('mouseleave', removeEvents);
  }, [onMouseMove]);
  const onMouseDown = useCallback(event => {
    const {
      left,
      top
    } = dragRef.current.getBoundingClientRect();
    initialX.current = event.clientX - left;
    initialY.current = event.clientY - top;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', removeEvents);
    document.body.addEventListener('mouseleave', removeEvents);
  }, [onMouseMove, removeEvents]);
  useEffect(() => {
    const handle = handleRef.current;
    handle.addEventListener('mousedown', onMouseDown);
    return () => {
      handle.removeEventListener('mousedown', onMouseDown);
      move.cancel();
    };
  }, [handleRef, onMouseDown]);
  return /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "draggable",
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`
    }
  }, children);
}

export default Draggable;