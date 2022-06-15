import { ReactNode, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

type Direction = 'column' | 'row';
type Position = 'left' | 'right';

const Container = styled.div<{ direction: Direction }>`
  width: 500px;
  height: 500px;
  display: flex;
  overflow: hidden;
  background-color: #e3e3e3;
  position: relative;

  ${({ direction }) =>
    css`
      flex-direction: ${direction};
    `}
`;

const Item = styled.div<{
  offset: number;
  transitionTime: number;
  direction: Direction;
}>`
  width: 500px;
  height: 500px;

  ${({ transitionTime, direction, offset }) =>
    css`
      transition: ${transitionTime}ms;
      ${direction === 'row'
        ? css`
            min-width: 500px;
            transform: translateX(${-offset * 100}%);
          `
        : css`
            min-height: 500px;
            transform: translateY(${-offset * 100}%);
          `}
    `}
`;

const Button = styled.div<{
  position: Position;
  direction: Direction;
}>`
  cursor: pointer;
  z-index: 999;
  width: 50px;
  height: 50px;
  background-color: #555;
  color: white;
  position: absolute;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ direction, position }) =>
    direction === 'row'
      ? css`
          bottom: 50%;
          transform: translateY(50%);
          ${position === 'right'
            ? css`
                right: 0;
              `
            : css`
                left: 0;
              `}
        `
      : css`
          left: 50%;
          transform: translateX(-50%) rotate(90deg);
          ${position === 'right'
            ? css`
                bottom: 0;
              `
            : css`
                top: 0;
              `}
        `}
`;

interface CarouselProps {
  loop?: boolean;
  autoLoop?: boolean;
  autoTime?: number;
  transitionTime?: number;
  direction?: Direction;
  children: ReactNode | ReactNode[];
}

function Carousel({
  loop,
  autoLoop,
  autoTime = 3000,
  transitionTime = 500,
  direction = 'row',
  children: propsChildren,
}: CarouselProps) {
  const children = Array.isArray(propsChildren)
    ? propsChildren
    : [propsChildren];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (autoLoop) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev < children.length - 1 ? prev + 1 : 0));
      }, autoTime);
      return () => clearInterval(interval);
    }
  }, [autoLoop, autoTime, children.length]);

  return (
    <Container direction={direction}>
      <Button
        position="left"
        onClick={() => {
          if (index > 0) {
            setIndex((prev) => prev - 1);
          } else if (loop) {
            setIndex(children.length - 1);
          }
        }}
        direction={direction}
      >
        {'<'}
      </Button>
      {children.map((child, idx) => (
        <Item
          key={idx}
          offset={index}
          transitionTime={transitionTime}
          direction={direction}
        >
          {child}
        </Item>
      ))}
      <Button
        position="right"
        onClick={() => {
          if (index < children.length - 1) {
            setIndex((prev) => prev + 1);
          } else if (loop) {
            setIndex(0);
          }
        }}
        direction={direction}
      >
        {'>'}
      </Button>
    </Container>
  );
}

export default Carousel;
