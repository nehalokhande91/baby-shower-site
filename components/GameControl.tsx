
import React, { useState } from 'react';
import { Game, Participant } from '../types';

interface GameControlProps {
  game: Game;
  onExit: () => void;
  participants: Participant[];
  onAwardPoint: (id: string, points?: number) => void;
}

const GameControl: React.FC<GameControlProps> = ({ game, onExit, participants, onAwardPoint }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [contestantAnswers, setContestantAnswers] = useState<{ [key: string]: string }>({});
  const [currentGuess, setCurrentGuess] = useState("");
  const [selectedContestant, setSelectedContestant] = useState("");
  // Track which participants have already been awarded points for the current question
  const [awardedParticipantIds, setAwardedParticipantIds] = useState<string[]>([]);

  const currentQuestion = game.questions[currentIdx];

  const nextQuestion = () => {
    if (currentIdx < game.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      resetQuestionState();
    }
  };

  const prevQuestion = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      resetQuestionState();
    }
  };

  const resetQuestionState = () => {
    setShowAnswer(false);
    setCurrentGuess("");
    setContestantAnswers({});
    setAwardedParticipantIds([]);
  };

  const recordGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContestant || !currentGuess) return;
    setContestantAnswers(prev => ({ ...prev, [selectedContestant]: currentGuess }));
    setCurrentGuess("");
  };

  const handleAward = (participantId: string, points: number) => {
    onAwardPoint(participantId, points);
    // Mark the participant as awarded so their sidebar guess is crossed out
    setAwardedParticipantIds(prev => [...new Set([...prev, participantId])]);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-pink-50 min-h-[750px]">
      {/* Game Header */}
      <div className="bg-pink-500 p-8 text-white flex justify-between items-center flex-shrink-0">
        <div>
          <h2 className="text-2xl font-black font-pacifico leading-none">{game.title}</h2>
          <div className="flex items-center mt-2 space-x-3">
             <span className="text-pink-100 text-[10px] font-black uppercase tracking-[0.2em] bg-pink-600/50 px-3 py-1 rounded-full">
               Question {currentIdx + 1} / {game.questions.length}
             </span>
             <span className="text-white/40">|</span>
             <span className="text-pink-100 text-[10px] font-black uppercase tracking-[0.2em]">
               Remote Family Edition
             </span>
          </div>
        </div>
        <button 
          onClick={onExit}
          className="bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-2xl text-[10px] font-black tracking-widest transition-all border border-white/20 backdrop-blur-sm"
        >
          QUIT GAME
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#fafafa]">
        {/* Main Stage Area */}
        <div className="flex-1 p-8 md:p-12 flex flex-col items-center justify-start text-center overflow-y-auto custom-scrollbar bg-white">
          <div className="w-full max-w-2xl">
            <div className="mb-10">
               <span className="inline-block px-5 py-2 rounded-full bg-pink-50 text-pink-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-pink-100 shadow-sm">
                {game.id === 'FEUD' ? 'Family Feud Stage' : game.id === 'TRIVIA' ? 'Trivia Stage' : 'Fact Stage'}
              </span>
              <h3 className="text-4xl md:text-5xl font-black text-gray-800 leading-[1.15] tracking-tight">
                {currentQuestion.question}
              </h3>
            </div>

            <div className="mb-10 w-full">
              {!showAnswer ? (
                <div className="py-12">
                   <button 
                    onClick={() => setShowAnswer(true)}
                    className="group relative px-16 py-6 font-black text-xl text-white bg-pink-500 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(244,114,182,0.4)] hover:bg-pink-600 transform transition active:scale-95 hover:-translate-y-1"
                  >
                    <span className="flex items-center">
                      REVEAL BOARD <span className="ml-3 group-hover:rotate-12 transition-transform">✨</span>
                    </span>
                  </button>
                </div>
              ) : (
                <div className="animate-in fade-in zoom-in-95 duration-500 w-full space-y-4">
                  {Array.isArray(currentQuestion.answer) ? (
                    <div className="grid grid-cols-1 gap-4 text-left w-full max-w-lg mx-auto">
                      {currentQuestion.answer.map((ans, i) => {
                        const scoreMatch = ans.match(/\((\d+)\)/);
                        const points = scoreMatch ? parseInt(scoreMatch[1]) : 0;
                        
                        return (
                          <div key={i} className="group relative p-5 rounded-[1.5rem] border-2 bg-pink-50/30 border-pink-100 shadow-sm flex justify-between items-center hover:border-pink-300 transition-all overflow-hidden">
                            <div className="flex items-center gap-4 relative z-10">
                              <span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-pink-500 text-sm font-black shadow-sm group-hover:bg-pink-500 group-hover:text-white transition-all">
                                {i + 1}
                              </span>
                              <span className="font-black text-gray-700 text-lg">{ans}</span>
                            </div>
                            
                            {participants.length > 0 && (
                              <div className="relative z-10">
                                <select 
                                  onChange={(e) => {
                                    if (e.target.value) handleAward(e.target.value, points);
                                    e.target.value = "";
                                  }}
                                  className="text-[10px] bg-white border-2 border-pink-100 rounded-xl px-3 py-2 outline-none font-black text-pink-500 cursor-pointer hover:border-pink-400 shadow-sm transition-all focus:ring-2 focus:ring-pink-200"
                                >
                                  <option value="">Award Points to...</option>
                                  {participants.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-pink-50 to-white p-12 rounded-[3rem] border-4 border-dashed border-pink-200 inline-block w-full max-w-lg relative overflow-hidden shadow-inner">
                      <div className="absolute -top-6 -right-6 p-8 opacity-10 text-7xl transform rotate-12">🍼</div>
                      <p className="text-3xl font-black text-pink-600 mb-8 leading-tight">{currentQuestion.answer}</p>
                      {participants.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-3">
                           {participants.map(p => {
                              const isAwarded = awardedParticipantIds.includes(p.id);
                              return (
                                <button
                                  key={p.id}
                                  onClick={() => !isAwarded && handleAward(p.id, 1)}
                                  className={`text-[11px] px-5 py-2.5 rounded-full font-black transition-all border-2 shadow-sm ${
                                    isAwarded
                                    ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-default grayscale line-through'
                                    : 'bg-white text-pink-500 border-pink-100 hover:border-pink-400 hover:scale-105 active:scale-95'
                                  }`}
                                >
                                  {isAwarded ? '✓ Points Added' : `+1 ${p.name}`}
                                </button>
                              );
                           })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Game Sidebar: Contestant Answers */}
        <div className="w-full md:w-[360px] bg-[#fdfdfd] border-l border-gray-100 p-8 flex flex-col flex-shrink-0">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-black text-gray-800 flex items-center text-sm uppercase tracking-widest">
              <span className="mr-3 text-xl">📝</span> Recorded Answers
            </h4>
          </div>
          
          <form onSubmit={recordGuess} className="mb-8 p-5 bg-white rounded-[1.5rem] shadow-xl shadow-pink-100/30 border border-pink-50 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-pink-300 uppercase tracking-[0.2em] px-1">Choose Person</label>
              <select 
                value={selectedContestant}
                onChange={(e) => setSelectedContestant(e.target.value)}
                className="w-full text-sm bg-gray-50 border-2 border-transparent rounded-xl px-4 py-3 outline-none font-bold text-gray-800 focus:border-pink-200 transition-all"
              >
                <option value="">Select family member...</option>
                {participants.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-pink-300 uppercase tracking-[0.2em] px-1">Their Guess</label>
              <input 
                type="text"
                placeholder="What did they guess?"
                value={currentGuess}
                onChange={(e) => setCurrentGuess(e.target.value)}
                className="w-full text-sm bg-gray-50 border-2 border-transparent rounded-xl px-4 py-3 outline-none text-gray-800 font-bold focus:bg-white focus:border-pink-200 transition-all placeholder:text-gray-300"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-pink-500 text-white text-[11px] font-black py-4 rounded-xl hover:bg-pink-600 transition-all shadow-lg shadow-pink-100 active:scale-95"
            >
              RECORD GUESS
            </button>
          </form>

          <div className="flex-1 overflow-y-auto space-y-4 pr-3 custom-scrollbar">
            {Object.entries(contestantAnswers).map(([name, guess]) => {
              const participant = participants.find(p => p.name === name);
              const isAwarded = participant && awardedParticipantIds.includes(participant.id);

              return (
                <div 
                  key={name} 
                  className={`p-5 rounded-[1.5rem] border shadow-sm animate-in slide-in-from-right duration-300 transition-all relative group overflow-hidden ${
                    isAwarded 
                    ? 'bg-gray-50 border-gray-100 opacity-60' 
                    : 'bg-white border-pink-50 hover:border-pink-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${isAwarded ? 'text-gray-400' : 'text-pink-500'}`}>
                        {name} {isAwarded ? 'WAS CORRECT!' : 'SAID:'}
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        const newAnswers = {...contestantAnswers};
                        delete newAnswers[name];
                        setContestantAnswers(newAnswers);
                      }}
                      className="text-gray-200 hover:text-red-400 transition-colors p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className={`text-base font-black italic ${isAwarded ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    "{guess}"
                  </p>
                  {isAwarded && (
                    <div className="mt-3 flex items-center text-[10px] font-black text-green-500 bg-green-50 px-3 py-1 rounded-full w-fit">
                      <span className="mr-2">🏆</span> POINTS AWARDED
                    </div>
                  )}
                </div>
              );
            })}
            {Object.keys(contestantAnswers).length === 0 && (
              <div className="text-center py-16 opacity-30 grayscale">
                <span className="text-4xl block mb-4">🤐</span>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Silence in the court!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-between items-center flex-shrink-0">
        <button 
          onClick={prevQuestion}
          disabled={currentIdx === 0}
          className={`flex items-center space-x-3 px-10 py-4 rounded-[1.5rem] font-black text-xs transition-all ${
            currentIdx === 0 ? 'opacity-20 cursor-not-allowed grayscale' : 'bg-white text-pink-500 border-2 border-pink-100 hover:border-pink-300 shadow-sm'
          }`}
        >
          <span>← PREVIOUS QUESTION</span>
        </button>

        <button 
          onClick={nextQuestion}
          disabled={currentIdx === game.questions.length - 1}
          className={`flex items-center space-x-3 px-10 py-4 rounded-[1.5rem] font-black text-xs transition-all ${
            currentIdx === game.questions.length - 1 ? 'opacity-20 cursor-not-allowed grayscale' : 'bg-pink-500 text-white hover:bg-pink-600 shadow-lg shadow-pink-100'
          }`}
        >
          <span>{currentIdx === game.questions.length - 1 ? 'GAME OVER' : 'NEXT QUESTION →'}</span>
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fce4ec;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f8bbd0;
        }
      `}</style>
    </div>
  );
};

export default GameControl;
