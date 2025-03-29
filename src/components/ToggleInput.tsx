import { useState, useRef, ChangeEvent } from 'react';
import {summarizeText} from '../utils/routes';

export default function ToggleInput() {
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const [textInput, setTextInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextSubmit = async () => {
    if (!textInput.trim()) {
      alert('Please enter some text');
      return;
    }
    const response = await summarizeText(textInput);
    console.log('Text submitted:', textInput);
    console.log('Response:', response);
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

  const handleFileSubmit = () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }
    console.log('File submitted:', selectedFile.name);
    // Add your file upload logic here
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
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
          <h3 className="text-lg font-medium">Send a Message</h3>
          <textarea
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows={5}
            placeholder="Type your message here..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <button
            className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
            onClick={handleTextSubmit}
          >
            Send
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
            Upload
          </button>
        </div>
      )}
    </div>
  );
}