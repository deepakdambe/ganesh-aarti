import { useState, useEffect } from 'react';
import { Droppable, Draggable, type DropResult, type DroppableProvided, type DraggableProvided, type DraggableStateSnapshot } from '@hello-pangea/dnd';
import { DndProvider } from './DndProvider';
import { type Note } from '../types/Note';
import { NoteCard } from './NoteCard';
import { SearchBox } from './SearchBox';
import './NotesGrid.css';

interface NotesGridProps {
  notes: Note[];
}

export const NotesGrid = ({ notes: initialNotes }: NotesGridProps) => {
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>(() => {
    // Try to get saved order from localStorage
    const savedNotes = localStorage.getItem('notesOrder');
    if (savedNotes) {
      try {
        const savedOrder = JSON.parse(savedNotes);
        // Recreate notes array based on saved order
        const orderedNotes = savedOrder.map((id: number) => 
          initialNotes.find(note => note.id === id)
        ).filter(Boolean);
        
        // Add any new notes that weren't in the saved order
        interface SavedNote {
          id: number;
        }

        const newNotes: Note[] = initialNotes.filter((note: Note) => 
          !orderedNotes.some((saved: SavedNote | undefined) => saved && saved.id === note.id)
        );
        
        return [...orderedNotes, ...newNotes];
      } catch (e) {
        console.error('Error parsing saved notes order:', e);
        return initialNotes;
      }
    }
    return initialNotes;
  });

  useEffect(() => {
    // Save order to localStorage whenever notes change
    const notesOrder = notes.map(note => note.id);
    localStorage.setItem('notesOrder', JSON.stringify(notesOrder));
  }, [notes]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNotes(items);
  };

  useEffect(() => {
    if (selectedNoteId !== null) {
      const noteElement = document.querySelector(`[data-note-id="${selectedNoteId}"]`);
      if (noteElement) {
        noteElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const highlightClass = 'note-highlight';
        noteElement.classList.add(highlightClass);
        setTimeout(() => {
          noteElement.classList.remove(highlightClass);
        }, 2000); // Remove highlight after 2 seconds
      }
      setSelectedNoteId(null);
    }
  }, [selectedNoteId]);

  // Removed duplicate setSearchQuery function

  const filteredNotes = searchQuery
    ? notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : notes;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectNote = (noteId: number) => {
    const noteIndex = notes.findIndex(note => note.id === noteId);
    if (noteIndex > -1) {
      document.querySelector(`[data-note-id="${noteId}"]`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <DndProvider onDragEnd={handleDragEnd}>
      <SearchBox
        notes={notes}
        onSearch={handleSearch}
        onSelectNote={handleSelectNote}
      />
      <Droppable droppableId="notes">
        {(provided: DroppableProvided) => (
          <div 
            className="notes-grid"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {filteredNotes.map((note: Note, index: number) => (
              <Draggable 
                key={note.id} 
                draggableId={note.id.toString()} 
                index={index}
              >
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`note-wrapper ${snapshot.isDragging ? 'dragging' : ''}`}
                    data-note-id={note.id}
                  >
                    <NoteCard note={note} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <div 
              style={{ 
              textAlign: 'center', 
              marginTop: '10px', 
              color: '#555',
              gridColumn: '1 / -1'
              } as React.CSSProperties}
            >
              Deepak D Dambe
            </div>
          </div>
        )}
      </Droppable>
    </DndProvider>
  );
};

