import { useState, useRef } from 'react';
import AIChatPopup from './AIChatPopup';
import AIQuizPopup from './AIQuizPopup';
import { uploadPdf } from '../utils/routes';

interface AIToolsPanelProps {
  onAction: (action: string, options?: any) => void;
  isProcessing: boolean;
}

const aiActions = [
  { id: 'summarize', label: 'Summarize', icon: '📝', description: 'Generate concise summary' },
  { id: 'revise', label: 'Revise Note', icon: '✍️', description: 'Detailed explanation' },
  { id: 'cheatsheet', label: 'Create Cheatsheet', icon: '📋', description: 'Short crisp points' },
  { id: 'reading-time', label: 'Estimate Reading Time', icon: '⏱️', description: 'Time to read this note' },
  { id: 'translate', label: 'Translate', icon: '🌐', description: 'Convert to another language' },
  { id: 'uploadPdf', label: 'Upload PDF', icon: '📥', description: 'Upload a PDF file' },
];

const extraActions = [
  { id: 'doubt-solver', label: 'AI Doubt Solver', icon: '💬', isPopup: true },
  { id: 'quiz', label: 'Generate Quiz', icon: '🧠', isPopup: true },
];

export default function AIToolsPanel({ onAction, isProcessing }: AIToolsPanelProps) {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [language, setLanguage] = useState('spanish');
  const [pdfResponse, setPdfResponse] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAction = (actionId: string) => {
    if (actionId === 'translate') {
      onAction('translate', { language });
    } else if (actionId === 'uploadPdf') {
      // Trigger file input click when upload PDF button is clicked
      fileInputRef.current?.click();
    } else {
      onAction(actionId);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const response = await uploadPdf(file);
      setPdfResponse(response);
      setActivePopup('pdfResponse');
    } catch (error) {
      console.error('Error uploading PDF:', error);
      // You might want to show an error message to the user here
    } finally {
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="w-72 bg-gray-50 p-4 flex flex-col border-l border-gray-200 h-full">
      <h3 className="font-medium text-lg mb-4 text-gray-700 flex items-center">
        <span className="mr-2">✨</span> AI Assistant
      </h3>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
        className="hidden"
      />

      <div className="space-y-3 mb-6">
        {aiActions.map(action => (
          <div key={action.id} className="group">
            <button
              onClick={() => handleAction(action.id)}
              disabled={isProcessing}
              className="w-full flex items-start p-3 rounded-lg bg-white hover:bg-gray-100 border border-gray-200 transition-colors disabled:opacity-50 text-left"
            >
              <span className="text-xl mr-3 mt-0.5">{action.icon}</span>
              <div>
                <div className="font-medium">{action.label}</div>
                <div className="text-xs text-gray-500">{action.description}</div>
              </div>
            </button>
            {action.id === 'translate' && (
              <div className="mt-1 ml-11">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="text-xs p-1 border rounded"
                >
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="hindi">Hindi</option>
                </select>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium mb-3 text-gray-500">Interactive Tools</h4>
        <div className="grid grid-cols-2 gap-2">
          {extraActions.map(action => (
            <button
              key={action.id}
              onClick={() => setActivePopup(action.id)}
              className="flex flex-col items-center p-3 rounded-lg bg-white hover:bg-gray-100 border border-gray-200 transition-colors"
            >
              <span className="text-xl mb-1">{action.icon}</span>
              <span className="text-xs">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {isProcessing && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg flex items-center text-sm">
          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing your request...
        </div>
      )}

      {/* Popups */}
      {activePopup === 'doubt-solver' && (
        <AIChatPopup onClose={() => setActivePopup(null)} />
      )}
      {activePopup === 'quiz' && (
        <AIQuizPopup onClose={() => setActivePopup(null)} />
      )}
      {activePopup === 'pdfResponse' && pdfResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">PDF Upload Result</h3>
              <button 
                onClick={() => {
                  setActivePopup(null);
                  setPdfResponse(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(pdfResponse, null, 2)}</pre>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setActivePopup(null);
                  setPdfResponse(null);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}