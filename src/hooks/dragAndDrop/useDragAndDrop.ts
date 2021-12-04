import React, { useEffect, useRef } from 'react';

type DragAndDropHandler = (event: MouseEvent) => void;

function useDragAndDrop<T extends EventTarget>(
  ref: React.RefObject<T> | null,
  onStart?: DragAndDropHandler,
  onMove?: DragAndDropHandler,
  onFinish?: DragAndDropHandler,
): void {
  const savedOnFinish = useRef<DragAndDropHandler>();

  const onMouseDown = (e: Event) => {
    const event = e as MouseEvent;
    if (event.button !== 0) {
      return;
    }

    if (onStart) {
      onStart(event);
    }

    addEventListener('mousemove', onMouseMove);
    addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (event: MouseEvent) => {
    if (onMove) {
      onMove(event);
    }
  };

  const onMouseUp = (event: MouseEvent) => {
    if (savedOnFinish.current) {
      savedOnFinish.current(event);
    }

    removeEventListener('mousemove', onMouseMove);
    removeEventListener('mouseup', onMouseUp);
  };

  useEffect(() => {
    if (savedOnFinish.current !== onFinish) {
      savedOnFinish.current = onFinish;
    }

    if (ref?.current) {
      ref.current.addEventListener('mousedown', onMouseDown);
    }

    return () => {
      if (ref?.current) {
        ref.current.removeEventListener('mousedown', onMouseDown);
      }
    };
  });
}

export default useDragAndDrop;
