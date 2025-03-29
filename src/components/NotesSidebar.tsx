import { Note } from './types';

interface NotesSidebarProps {
  notes: Note[];
  activeNoteId: string | null;
  onCreateNote: () => void;
  onSelectNote: (id: string) => void;
}

export default function NotesSidebar({ 
  notes, 
  activeNoteId, 
  onCreateNote, 
  onSelectNote 
}: NotesSidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Notes</h2>
        <button 
          onClick={onCreateNote}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {notes.map(note => (
          <div
            key={note.id}
            onClick={() => onSelectNote(note.id)}
            className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              activeNoteId === note.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
            }`}
          >
            <h3 className="font-medium truncate">
              {note.title || 'Untitled Note'}
            </h3>
            <p className="text-xs text-gray-500">
              {new Date(note.updatedAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 truncate mt-1">
              {note.content.substring(0, 60)}{note.content.length > 60 ? '...' : ''}
            </p>
          </div>
        ))}
        {notes.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            <p>No notes yet</p>
            <button 
              onClick={onCreateNote}
              className="mt-2 text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              Create your first note
            </button>
          </div>
        )}
      </div>
    </div>
  );
}