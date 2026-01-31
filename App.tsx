
import React, { useState, useEffect } from 'react';
import { Participant, GameType, Game } from './types';
import { GAMES } from './constants';
import Scoreboard from './components/Scoreboard';
import GameControl from './components/GameControl';

const App: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newParticipantName, setNewParticipantName] = useState('');
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [celebration, setCelebration] = useState(false);
  const [showWinnerReveal, setShowWinnerReveal] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('baby-shower-participants');
    if (saved) setParticipants(JSON.parse(saved));
  }, []);

  useEffect(() => {
    sessionStorage.setItem('baby-shower-participants', JSON.stringify(participants));
  }, [participants]);

  const addParticipant = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newParticipantName.trim()) return;
    const newP: Participant = {
      id: Math.random().toString(36).substr(2, 9),
      name: newParticipantName.trim(),
      score: 0
    };
    setParticipants(prev => [...prev, newP]);
    setNewParticipantName('');
  };

  const removeParticipant = (id: string) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
  };

  const updateScore = (id: string, delta: number) => {
    setParticipants(prev => prev.map(p => 
      p.id === id ? { ...p, score: Math.max(0, p.score + delta) } : p
    ));
    if (delta > 0) {
      setCelebration(true);
      setTimeout(() => setCelebration(false), 1500);
    }
  };

  const startGame = (gameId: GameType) => {
    const game = GAMES.find(g => g.id === gameId);
    if (game) setActiveGame(game);
  };

  const resetScores = () => {
    if (window.confirm("Are you sure you want to reset all scores?")) {
      setParticipants(prev => prev.map(p => ({ ...p, score: 0 })));
    }
  };

  const sortedParticipants = [...participants].sort((a, b) => b.score - a.score);
  const winners = sortedParticipants.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fffafa] pb-12 relative overflow-x-hidden font-quicksand">
      {/* Soft Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-pink-100 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-pink-50 rounded-full blur-[100px]"></div>
      </div>

      <header className="relative z-10 pt-12 pb-8 text-center px-4">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 mb-4 animate-pulse-slow">
             <div className="text-7xl drop-shadow-md">🧿</div>
          </div>
          <h1 className="text-6xl md:text-8xl font-pacifico text-pink-500 drop-shadow-sm mb-3">
            Pyaari Bitiya!
          </h1>
          <div className="inline-flex items-center space-x-3 bg-pink-50 px-6 py-2 rounded-full border border-pink-100">
             <span className="text-pink-400 font-black tracking-[0.2em] uppercase text-[10px] md:text-xs">
               Baby Girl Celebration
             </span>
             <span className="text-pink-200">•</span>
             <span className="text-pink-400 font-black tracking-[0.2em] uppercase text-[10px] md:text-xs flex items-center">
               India 🇮🇳 Remote Fun
             </span>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content: Games or Active Game */}
          <div className="lg:col-span-8">
            {!activeGame ? (
              <div className="space-y-8">
                {/* Welcome Card */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-pink-100/50 border border-pink-50">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                    <div>
                      <h2 className="text-4xl font-black text-gray-800 mb-2">Game Lobby</h2>
                      <p className="text-gray-400 font-medium">Select a game to start playing with the family!</p>
                    </div>
                    <div className="flex shrink-0 gap-3">
                      <button 
                        onClick={resetScores}
                        className="px-6 py-3 text-xs font-black text-gray-400 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                      >
                        RESET SCORES
                      </button>
                      <button 
                        onClick={() => setShowWinnerReveal(true)}
                        className="px-8 py-3 text-sm font-black text-white bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl hover:scale-105 transition-all shadow-lg shadow-orange-100"
                      >
                        REVEAL WINNERS! 🏆
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {GAMES.map(game => (
                      <div 
                        key={game.id}
                        className="group relative bg-pink-50/50 rounded-[2rem] p-8 border-2 border-transparent hover:border-pink-200 transition-all cursor-pointer transform hover:-translate-y-2 overflow-hidden"
                        onClick={() => startGame(game.id)}
                      >
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl transform rotate-12 group-hover:rotate-0 transition-transform">
                          {game.id === 'FEUD' ? '🎀' : game.id === 'TRIVIA' ? '🧸' : '👣'}
                        </div>
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
                          {game.id === 'FEUD' ? '👨‍👩‍👧' : game.id === 'TRIVIA' ? '❓' : '👶'}
                        </div>
                        <h3 className="text-xl font-black text-gray-800 mb-2">{game.title}</h3>
                        <p className="text-gray-400 text-xs mb-6 font-medium leading-relaxed">{game.description}</p>
                        <div className="text-pink-500 font-black text-xs uppercase tracking-[0.15em] flex items-center">
                          START GAME <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Culture Footer Card */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-lg shadow-pink-100/20 border border-pink-50 flex items-center gap-8">
                  <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center text-5xl flex-shrink-0 animate-pulse-slow">🪔</div>
                  <div>
                    <h3 className="text-xl font-black text-gray-800 mb-2">Blessings from Home</h3>
                    <p className="text-gray-500 text-sm leading-relaxed italic font-medium">
                      Even across the miles, the love of family knows no distance. Namaste to all our elders in India joining today's Godh Bharai!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <GameControl 
                game={activeGame} 
                onExit={() => setActiveGame(null)} 
                participants={participants}
                onAwardPoint={(id, pts) => updateScore(id, pts || 1)}
              />
            )}
          </div>

          {/* Right Sidebar: Leaderboard & Add Member */}
          <div className="lg:col-span-4 space-y-8 sticky top-6">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-pink-100/30 p-8 border border-pink-50">
              <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-sm mr-3">➕</span>
                Add Family Member
              </h3>
              <form onSubmit={addParticipant} className="space-y-3">
                <input 
                  type="text" 
                  value={newParticipantName}
                  onChange={(e) => setNewParticipantName(e.target.value)}
                  placeholder="Dadi, Chacha, Sonu..."
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pink-300 focus:bg-white focus:outline-none transition-all text-gray-800 font-bold text-sm"
                />
                <button type="submit" className="w-full bg-pink-500 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-pink-100 hover:bg-pink-600 active:scale-[0.98] transition-all">
                  ADD TO GAME
                </button>
              </form>
            </div>

            <Scoreboard 
              participants={participants}
              onAddPoint={(id) => updateScore(id, 1)}
              onRemovePoint={(id) => updateScore(id, -1)}
              onRemoveParticipant={removeParticipant}
            />
          </div>
        </div>
      </main>

      {/* WINNER REVEAL MODAL */}
      {showWinnerReveal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-pink-900/60 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white rounded-[3.5rem] p-12 max-w-xl w-full text-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-[12px] border-yellow-100 animate-in zoom-in-90 duration-500 relative overflow-hidden">
            {/* Confetti Animation Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                {[...Array(15)].map((_, i) => (
                    <div key={i} className={`absolute w-4 h-4 rounded-full animate-bounce`} 
                         style={{ 
                            left: `${Math.random() * 100}%`, 
                            top: `${Math.random() * 100}%`, 
                            backgroundColor: ['#f472b6', '#fbbf24', '#60a5fa', '#34d399'][i%4],
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                         }} 
                    />
                ))}
            </div>

            <button onClick={() => setShowWinnerReveal(false)} className="absolute top-8 right-8 text-gray-300 hover:text-gray-500 text-3xl font-light transition-colors">&times;</button>
            <h2 className="text-6xl font-pacifico text-pink-500 mb-4">Shabaash!</h2>
            <p className="text-gray-400 uppercase tracking-[0.3em] font-black text-[10px] mb-10">THE TOP CHAMPIONS</p>
            
            <div className="space-y-5 mb-12">
              {winners.map((p, i) => (
                <div key={p.id} className={`p-6 rounded-[2rem] flex items-center justify-between transform transition-all hover:scale-[1.02] ${
                  i === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-4 border-yellow-200 scale-110 shadow-xl' : 
                  i === 1 ? 'bg-gray-50 border-2 border-gray-200' : 
                  'bg-orange-50/50 border-2 border-orange-100'
                }`}>
                  <div className="flex items-center gap-5">
                    <span className="text-4xl">{i === 0 ? '🏆' : i === 1 ? '🥈' : '🥉'}</span>
                    <div className="text-left">
                      <p className={`font-black uppercase tracking-wider ${i === 0 ? 'text-yellow-800 text-2xl' : 'text-gray-700 text-lg'}`}>{p.name}</p>
                      <p className="text-xs text-pink-400 font-bold uppercase tracking-widest">{p.score} Points Won</p>
                    </div>
                  </div>
                  {i === 0 && <span className="bg-yellow-500 text-white text-[10px] px-3 py-1.5 rounded-full font-black shadow-sm">WINNER</span>}
                </div>
              ))}
              {participants.length === 0 && <p className="text-gray-400 font-bold py-10 italic">No family members joined yet!</p>}
            </div>
            
            <button 
              onClick={() => setShowWinnerReveal(false)}
              className="w-full py-5 bg-pink-500 text-white rounded-[1.5rem] font-black text-xl shadow-xl shadow-pink-100 hover:bg-pink-600 transition-all hover:scale-105"
            >
              KEEP CELEBRATING! 🎊
            </button>
          </div>
        </div>
      )}

      {/* Floating Global Celebration Popups */}
      {celebration && (
        <div className="fixed top-[15%] left-1/2 transform -translate-x-1/2 pointer-events-none z-[100] animate-in slide-in-from-top-10 duration-500">
          <div className="bg-white border-4 border-pink-400 px-10 py-5 rounded-full shadow-[0_20px_50px_rgba(244,114,182,0.3)] animate-bounce">
            <p className="text-3xl font-black text-pink-500 font-pacifico">Balle Balle! 🎉</p>
          </div>
        </div>
      )}

      <footer className="mt-20 text-center">
        <div className="inline-block px-6 py-2 bg-white rounded-full border border-pink-50 shadow-sm">
          <p className="text-pink-300 text-[10px] font-black uppercase tracking-[0.4em]">
            Made with Love for our Baby Girl • 2024
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default App;
