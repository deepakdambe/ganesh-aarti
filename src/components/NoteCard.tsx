import { useState } from 'react';
import type { Note } from '../types/Note';
import './NoteCard.css';

interface NoteCardProps {
  note: Note;
  onToggleFavorite?: (noteId: number) => void;
}

export const NoteCard = ({ note, onToggleFavorite }: NoteCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(note.id);
    }
  };

  return (
    <div className={`note-card ${isExpanded ? 'expanded-bg' : ''}`}>
      <div className="note-header">
        <h2 
          className={`note-title ${isExpanded ? 'expanded' : ''}`} 
          onClick={toggleExpand}
        >
          {note.title}
          <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
        </h2>
        <button 
          className={`favorite-button ${note.favorite ? 'favorite' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={note.favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <span style={{ fontSize: '1.5em' }}>♥</span>
        </button>
      </div>
      <div className={`note-content ${isExpanded ? 'expanded' : ''}`}>
        {note.content}
      </div>
    </div>
  );
};
