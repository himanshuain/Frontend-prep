
import { useState, useRef, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';

const ResizableBox = ({ children }) => {
  const [width, setWidth] = useState(200); // initial width of the box
  const boxRef = useRef(null);
  const isResizing = useRef(false);
  const initialX = useRef(0);
  const initialWidth = useRef(0);

  const handleMouseDown = (e) => {
    isResizing.current = true;
    initialX.current = e.clientX;
    initialWidth.current = boxRef?.current?.offsetWidth;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback(
    debounce((e) => {
      if (isResizing.current) {
        const newWidth = initialWidth.current + (e.clientX - initialX.current);
        
        if (newWidth > 100) { // minimum width constraint
            setWidth(newWidth);
          }
      }
    }, 10), // Adjust the delay as needed
    []
  );

  const handleMouseUp = () => {
    isResizing.current = false;

    // Remove the event listeners when done
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      // Cleanup in case component unmounts during resize
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove]);

  return (
    <div
      className="resizable-box"
      ref={boxRef}
      style={{ width: `${width}px` }}
    >
      {children}
      <div
        className="resizer"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default ResizableBox;
