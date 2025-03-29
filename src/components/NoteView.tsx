// import { Note } from './types';

// interface NoteViewProps {
//   note: Note | null;
// }

// export default function NoteView({ note }: NoteViewProps) {
//   if (!note) {
//     return (
//       <div className="flex-1 flex items-center justify-center bg-gray-50">
//         <div className="text-center p-6">
//           <h3 className="text-lg font-medium text-gray-700">Select a note or create a new one</h3>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 overflow-y-auto p-6">
//       <div className="max-w-3xl mx-auto">
//         <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
//         <div className="bg-white p-4 rounded-lg shadow mb-6">
//           <h3 className="font-medium mb-2">Your Note:</h3>
//           <p className="whitespace-pre-wrap">{note.content}</p>
//         </div>
//         {note.aiResponse && (
//           <div className="bg-blue-50 p-4 rounded-lg shadow">
//             <h3 className="font-medium mb-2">AI Response:</h3>
//             <p className="whitespace-pre-wrap">
//               {typeof note.aiResponse === 'string' ? note.aiResponse : JSON.stringify(note.aiResponse)}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }