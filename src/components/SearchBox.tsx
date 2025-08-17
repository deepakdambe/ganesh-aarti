import { useState, useRef, useEffect } from 'react';
import { type Note } from '../types/Note';
import './SearchBox.css';

interface SearchBoxProps {
  notes: Note[];
  onSearch: (query: string) => void;
  onSelectNote: (noteId: number) => void;
}

export const SearchBox = ({ notes, onSearch, onSelectNote }: SearchBoxProps) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Note[]>([]);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle clicks outside of search box to close suggestions
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    // Update suggestions
    if (searchQuery.trim()) {
      const matchingNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4); // Limit to 4 suggestions
      setSuggestions(matchingNotes);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (note: Note) => {
    setQuery(note.title);
    onSelectNote(note.id);
    setShowSuggestions(false);
  };

  return (
    <div className="search-container" ref={searchBoxRef}>
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search aarti..."
          value={query}
          onChange={handleSearchChange}
        />
        {query && (
          <button
            className="clear-button"
            onClick={() => {
              setQuery('');
              onSearch('');
              setSuggestions([]);
              setShowSuggestions(false);
            }}
          >
            X
          </button>
        )}
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map(note => (
            <li
              key={note.id}
              onClick={() => handleSuggestionClick(note)}
            >
              <span className="suggestion-title">{note.title}</span>
              <span className="suggestion-preview">
                {note.content.slice(0, 50)}...
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
