import { MouseEvent, ReactElement, ReactNode, useRef, useState } from 'react';
import { Box, styled } from '@mui/material';

const ScrollableContainer = styled(Box)(
  () => `
    display: flex;
    overflow: auto;
    cursor: pointer;
    
    &::-webkit-scrollbar {
      display: none;
    }
`,
);

interface Props {
  children: ReactNode;
}

const Scrollable = ({ children }: Props): ReactElement => {
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsMouseDown(true);
    setStartX(e.pageX - scrollableDivRef.current!.offsetLeft);
    setScrollLeft(scrollableDivRef.current!.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || !startX) return;
    e.preventDefault();
    const x = e.pageX - scrollableDivRef.current!.offsetLeft;
    scrollableDivRef.current!.scrollLeft = scrollLeft - x + startX;
  };

  return (
    <ScrollableContainer
      ref={scrollableDivRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {children}
    </ScrollableContainer>
  );
};

export default Scrollable;
