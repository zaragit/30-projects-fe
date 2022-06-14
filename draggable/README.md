# Draggable

패스트캠퍼스 강의를 들으면서 만들어보는 Draggable 라이브리리

## Usage

```jsx
const Modal = () => {
  const headerRef = useRef(null);

  return (
    <Draggable
      handleRef={handle}
      onMove={(x, y) => console.log(x, y)}
      x={100}
      y={100}
    >
      <div className="modal">
        <div ref={headerRef} className="modal_header"></div>
        <div className="modal_content"></div>
      </div>
    </Draggable>
  );
};
```
