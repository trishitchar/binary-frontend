import { useState } from 'react';

interface AIQuizPopupProps {
  onClose: () => void;
}

export default function AIQuizPopup({ onClose }: AIQuizPopupProps) {
  const [quiz, setQuiz] = useState<Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    userAnswer?: number;
  }> | null>(null);

  const generateQuiz = () => {
    // Simulate quiz generation
    setQuiz([
      {
        question: "What is the main concept discussed in this note?",
        options: ["Advanced Calculus", "Machine Learning", "Data Structures", "Human Psychology"],
        correctAnswer: 1
      },
      {
        question: "Which of these is NOT mentioned?",
        options: ["Neural Networks", "Random Forests", "Support Vector Machines", "K-means Clustering"],
        correctAnswer: 3
      }
    ]);
  };

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    if (!quiz) return;
    const newQuiz = [...quiz];
    newQuiz[questionIndex].userAnswer = optionIndex;
    setQuiz(newQuiz);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-medium">AI Generated Quiz</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {!quiz ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Generate a quiz based on your note content</p>
              <button
                onClick={generateQuiz}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Generate Quiz
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {quiz.map((q, qIndex) => (
                <div key={qIndex} className="border-b pb-4">
                  <h4 className="font-medium mb-2">{q.question}</h4>
                  <div className="space-y-2">
                    {q.options.map((opt, optIndex) => (
                      <button
                        key={optIndex}
                        onClick={() => handleAnswer(qIndex, optIndex)}
                        className={`w-full text-left p-2 rounded border ${
                          q.userAnswer === optIndex 
                            ? optIndex === q.correctAnswer 
                              ? 'bg-green-100 border-green-500' 
                              : 'bg-red-100 border-red-500'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {opt}
                        {q.userAnswer !== undefined && optIndex === q.correctAnswer && (
                          <span className="ml-2 text-green-500">✓ Correct</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}