import { useState } from 'react';
import type { Note } from '../types/Note';
import './NoteCard.css';

interface NoteCardProps {
  note: Note;
}

export const NoteCard = ({ note }: NoteCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="note-card">
      <h2 
        className={`note-title ${isExpanded ? 'expanded' : ''}`} 
        onClick={toggleExpand}
      >
        {note.title}
        <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
      </h2>
      <div className={`note-content ${isExpanded ? 'expanded' : ''}`}>
        {note.content}
      </div>
    </div>
  );
};
