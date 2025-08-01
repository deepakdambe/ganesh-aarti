import { type Note } from '../types/Note';
import { NoteCard } from './NoteCard';
import './NotesGrid.css';

interface NotesGridProps {
  notes: Note[];
}

export const NotesGrid = ({ notes }: NotesGridProps) => {
  return (
    <div className="notes-grid">
      {notes.map(note => (
        <NoteCard key={note.id} note={note} />
      ))}
      <div style={{ textAlign: 'center', marginTop: '10px', color: '#555' }}>
        Deepak D Dambe
      </div>
    </div>
  );
};
