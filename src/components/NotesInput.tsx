import { useState } from "react";

interface NotesInputProps {
    onSubmit: (content: string) => void;
    isLoading: boolean;
  }
  
  export default function NotesInput({ onSubmit, isLoading }: NotesInputProps) {
    const [content, setContent] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(content);
      setContent('');
    };
  
    return (
      <div className="border-t border-gray-200 bg-white p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your note..."
              className="w-full p-4 pr-16 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              rows={3}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!content.trim() || isLoading}
              className="absolute right-3 bottom-3 p-2 text-blue-500 hover:text-blue-600 disabled:text-gray-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    );
  }