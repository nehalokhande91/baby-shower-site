
import React from 'react';
import { Participant } from '../types';

interface ScoreboardProps {
  participants: Participant[];
  onAddPoint: (id: string) => void;
  onRemovePoint: (id: string) => void;
  onRemoveParticipant: (id: string) => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ 
  participants, 
  onAddPoint, 
  onRemovePoint,
  onRemoveParticipant 
}) => {
  const sorted = [...participants].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-pink-100/30 p-8 border border-pink-50 flex flex-col max-h-[600px]">
      <div className="flex items-center justify-between mb-8 flex-shrink-0">
        <h2 className="text-3xl font-bold text-pink-500 font-pacifico leading-none">Leaderboard</h2>
        <span className="text-[10px] text-pink-300 font-black uppercase tracking-[0.2em] bg-pink-50/50 px-3 py-1.5 rounded-xl">Top Players</span>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-3 custom-scrollbar">
        {participants.length === 0 ? (
          <div className="text-center py-24 text-gray-300 italic flex flex-col items-center">
            <span className="text-5xl mb-4 opacity-30">🎈</span>
            <p className="font-bold text-sm tracking-widest uppercase">No one here yet!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sorted.map((p, index) => (
              <div 
                key={p.id} 
                className={`group flex items-center justify-between p-4 rounded-3xl transition-all border-2 ${
                  index === 0 ? 'bg-pink-50 border-pink-200' : 
                  index === 1 ? 'bg-orange-50/50 border-orange-100' :
                  index === 2 ? 'bg-blue-50/50 border-blue-100' :
                  'bg-gray-50/50 border-transparent hover:border-gray-100'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-base shadow-md transform group-hover:rotate-12 transition-transform ${
                    index === 0 ? 'bg-pink-500' : 
                    index === 1 ? 'bg-orange-400' : 
                    index === 2 ? 'bg-blue-400' : 
                    'bg-gray-400'
                  }`}>
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-black text-gray-800 text-sm tracking-tight">{p.name}</p>
                    <p className="text-[10px] text-pink-400 font-black uppercase tracking-widest">{p.score} points</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex bg-white rounded-xl shadow-sm border border-pink-50 overflow-hidden">
                    <button 
                      onClick={() => onRemovePoint(p.id)}
                      className="w-10 h-10 text-pink-300 hover:text-pink-500 hover:bg-pink-50 flex items-center justify-center transition-colors text-xl font-bold border-r border-pink-50"
                    >
                      -
                    </button>
                    <button 
                      onClick={() => onAddPoint(p.id)}
                      className="w-10 h-10 text-pink-500 hover:bg-pink-50 flex items-center justify-center transition-colors text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => onRemoveParticipant(p.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-200 hover:text-red-400 hover:bg-red-50 transition-all ml-1"
                    title="Remove"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #fff5f7;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fbcfe8;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f9a8d4;
        }
      `}</style>
    </div>
  );
};

export default Scoreboard;
