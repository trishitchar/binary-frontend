import { useState, useEffect } from 'react';
import { summarizeText } from './utils/routes';
import NotesSidebar from './components/NotesSidebar';
import NoteEditor from './components/NoteEditor';
import AIToolsPanel from './components/AIToolsPanel';
import { Note } from './components/types';

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load notes
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes);
      if (parsedNotes.length > 0) {
        setActiveNoteId(parsedNotes[0].id);
      }
    }
  }, []);

  // Save notes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const activeNote = notes.find(note => note.id === activeNoteId);

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      updatedAt: Date.now()
    };
    setNotes(prev => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
  };

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(prev => prev.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ));
  };

  const handleAIAction = async (action: string, options?: any) => {
    if (!activeNote) return;
    
    setIsProcessing(true);
    try {
      let result;
      switch(action) {
        case 'summarize':
          result = await summarizeText(activeNote.content);
          break;
        case 'revise':
          result = await summarizeText(`Provide detailed explanation: ${activeNote.content}`);
          break;
        case 'cheatsheet':
          result = await summarizeText(`Create concise cheatsheet: ${activeNote.content}`);
          break;
        case 'reading-time':
          const words = activeNote.content.split(/\s+/).length;
          const minutes = Math.ceil(words / 200); // avg reading speed
          result = `Estimated reading time: ${minutes} minute${minutes !== 1 ? 's' : ''}`;
          break;
        case 'translate':
          result = await summarizeText(`Translate to ${options?.language || 'Spanish'}: ${activeNote.content}`);
          break;
        default:
          result = await summarizeText(activeNote.content);
      }
  
      if (action === 'reading-time') {
        alert(result); // Show reading time as alert
      } else {
        handleUpdateNote({
          ...activeNote,
          content: typeof result === 'string' ? result : result.summary,
          updatedAt: Date.now()
        });
      }
    } catch (error) {
      console.error('AI action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <NotesSidebar
        notes={notes}
        activeNoteId={activeNoteId}
        onCreateNote={handleCreateNote}
        onSelectNote={setActiveNoteId}
      />
      
      {/* Editor */}
      <NoteEditor
        note={activeNote}
        onUpdateNote={handleUpdateNote}
        className="flex-1 border-r border-gray-200"
      />
      
      {/* AI Tools */}
      <AIToolsPanel 
        onAction={handleAIAction} 
        isProcessing={isProcessing}
      />
    </div>
  );
}