import { useState } from 'react';
import AIChatPopup from './AIChatPopup';
import AIQuizPopup from './AIQuizPopup';

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
];

const extraActions = [
  { id: 'doubt-solver', label: 'AI Doubt Solver', icon: '💬', isPopup: true },
  { id: 'quiz', label: 'Generate Quiz', icon: '🧠', isPopup: true },
];

export default function AIToolsPanel({ onAction, isProcessing }: AIToolsPanelProps) {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [language, setLanguage] = useState('spanish');

  const handleAction = (actionId: string) => {
    if (actionId === 'translate') {
      onAction('translate', { language });
    } else {
      onAction(actionId);
    }
  };

  return (
    <div className="w-72 bg-gray-50 p-4 flex flex-col border-l border-gray-200 h-full">
      <h3 className="font-medium text-lg mb-4 text-gray-700 flex items-center">
        <span className="mr-2">✨</span> AI Assistant
      </h3>

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
    </div>
  );
}