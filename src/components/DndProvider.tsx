import { useEffect, useState } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';

interface DndProviderProps {
  onDragEnd: (result: DropResult) => void;
  children: React.ReactNode;
}

export const DndProvider = ({ onDragEnd, children }: DndProviderProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {children}
    </DragDropContext>
  );
};
