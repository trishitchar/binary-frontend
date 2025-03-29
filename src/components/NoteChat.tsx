// import { Note } from './types';

// interface NoteChatProps {
//   note: Note | undefined;
//   isLoading: boolean;
// }

// export default function NoteChat({ note, isLoading }: NoteChatProps) {
//   if (!note) {
//     return (
//       <div className="flex-1 flex items-center justify-center p-6">
//         <div className="text-center">
//           <h3 className="text-xl font-medium text-gray-500">
//             Select a note or create a new one
//           </h3>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 overflow-y-auto p-6 space-y-6">
//       <div className="max-w-3xl mx-auto space-y-6">
//         {/* User Message */}
//         <div className="flex justify-end">
//           <div className="bg-blue-500 text-white rounded-2xl px-4 py-3 max-w-[80%]">
//             <p className="whitespace-pre-wrap">{note.content}</p>
//           </div>
//         </div>

//         {/* AI Response */}
//         <div className="flex justify-start">
//           <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-[80%]">
//             {isLoading ? (
//               <div className="flex space-x-2">
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
//               </div>
//             ) : (
//               <p className="whitespace-pre-wrap">{note.aiResponse}</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// } 