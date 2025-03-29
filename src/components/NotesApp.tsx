import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { summarizeText } from '../utils/routes';

interface Note {
  id: string;
  title: string;
  content: string;
  aiResponse?: string;
  createdAt: number;
}

export default function NotesApp() {
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const [textInput, setTextInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load notes from localStorage on initial render
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleTextSubmit = async () => {
    if (!textInput.trim()) {
      alert('Please enter some text');
      return;
    }

    try {
      const response = await summarizeText(textInput);
      const newNote: Note = {
        id: Date.now().toString(),
        title: textInput.slice(0, 30) + (textInput.length > 30 ? '...' : ''),
        content: textInput,
        aiResponse: response,
        createdAt: Date.now()
      };

      setNotes(prevNotes => [newNote, ...prevNotes]);
      setSelectedNote(newNote);
      setTextInput('');
    } catch (error) {
      console.error('Error submitting text:', error);
      alert('Failed to get AI response');
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      
      if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF, JPEG, or PNG file');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleFileSubmit = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    // In a real app, you would process the file here
    // For now, we'll just create a note with the file info
    const newNote: Note = {
      id: Date.now().toString(),
      title: selectedFile.name,
      content: `File: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(2)} KB)`,
      createdAt: Date.now()
    };

    setNotes(prevNotes => [newNote, ...prevNotes]);
    setSelectedNote(newNote);
    setSelectedFile(null);
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">My Notes</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {notes.map(note => (
            <div 
              key={note.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedNote?.id === note.id ? 'bg-blue-50' : ''}`}
              onClick={() => handleNoteClick(note)}
            >
              <h3 className="font-medium truncate">{note.title}</h3>
              <p className="text-sm text-gray-500 truncate">
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
          {notes.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No notes yet. Create one!
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedNote ? (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">{selectedNote.title}</h2>
              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h3 className="font-medium mb-2">Your Note:</h3>
                <p className="whitespace-pre-wrap">{selectedNote.content}</p>
              </div>
              {selectedNote.aiResponse && (
                <div className="bg-blue-50 p-4 rounded-lg shadow">
                  <h3 className="font-medium mb-2">AI Response:</h3>
                  <p className="whitespace-pre-wrap">{selectedNote.aiResponse}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center p-6">
              <h3 className="text-lg font-medium text-gray-700">Select a note or create a new one</h3>
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="border-t border-gray-200 bg-white p-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex border rounded-lg overflow-hidden mb-6">
              <button
                className={`flex-1 py-2 px-4 font-medium transition-colors cursor-pointer ${
                  activeTab === 'text' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('text')}
              >
                Text Input
              </button>
              <button
                className={`flex-1 py-2 px-4 font-medium transition-colors cursor-pointer ${
                  activeTab === 'file' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('file')}
              >
                File Upload
              </button>
            </div>

            {activeTab === 'text' ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Create New Note</h3>
                <textarea
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={5}
                  placeholder="Type your note here..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
                <button
                  className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
                  onClick={handleTextSubmit}
                >
                  Save Note
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Upload a File</h3>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".pdf,.jpeg,.jpg,.png"
                  onChange={handleFileChange}
                />
                <div
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {selectedFile ? (
                    <p className="text-green-500">{selectedFile.name}</p>
                  ) : (
                    <p className="text-gray-500">Click to select PDF, JPEG, or PNG file</p>
                  )}
                </div>
                <p className="text-sm text-gray-500">Accepted formats: PDF, JPEG, PNG</p>
                <button
                  className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
                  onClick={handleFileSubmit}
                >
                  Save File Note
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}