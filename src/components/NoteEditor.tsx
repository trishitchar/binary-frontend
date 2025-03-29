import { Note } from './types';

interface NoteEditorProps {
  note: Note | undefined;
  onUpdateNote: (note: Note) => void;
  className?: string;
}

export default function NoteEditor({ note, onUpdateNote, className }: NoteEditorProps) {
  if (!note) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <div className="text-center p-6">
          <h3 className="text-lg font-medium text-gray-500">
            Select a note or create a new one
          </h3>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdateNote({
      ...note,
      [e.target.name]: e.target.value,
      updatedAt: Date.now()
    });
  };

  return (
    <div className={`${className} flex flex-col`}>
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Note title"
          className="w-full text-2xl font-semibold border-none focus:ring-0 p-0"
        />
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          placeholder="Start writing your note here..."
          className="w-full h-full resize-none border-none focus:ring-0 p-4 text-gray-700 leading-relaxed"
        />
      </div>
    </div>
  );
}