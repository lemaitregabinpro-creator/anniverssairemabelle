
import React, { useState, useEffect } from 'react';
import { AppState } from './types.ts';
import { INTRO_TEXT, PHOTOS, REUNION_DATE } from './constants.tsx';
import Typewriter from './components/Typewriter.tsx';
import Polaroid from './components/Polaroid.tsx';
import Countdown from './components/Countdown.tsx';
import Confetti from './components/Confetti.tsx';
import BeatingHeart3D from './components/BeatingHeart3D.tsx';
import { MapPin, Heart, ChevronRight, Sparkles, Tent, Star, Calendar, Lock, ArrowDown } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<AppState>(AppState.AUTH);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const hasOpened = localStorage.getItem('birthday_gift_opened');
    const isAuth = sessionStorage.getItem('is_authenticated');
    
    if (isAuth === 'true') {
      if (hasOpened === 'true') {
        setStep(AppState.REVEAL);
      } else {
        setStep(AppState.INTRO);
      }
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toUpperCase() === 'DEV') {
      setFade(true);
      setTimeout(() => {
        sessionStorage.setItem('is_authenticated', 'true');
        setStep(AppState.INTRO);
        setFade(false);
      }, 800);
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 1000);
    }
  };

  const handleOpenGift = () => {
    setFade(true);
    setTimeout(() => {
      localStorage.setItem('birthday_gift_opened', 'true');
      setStep(AppState.REVEAL);
      setFade(false);
    }, 1200);
  };

  const goToFinalGift = () => {
    setFade(true);
    setTimeout(() => {
      setStep(AppState.GIFT);
      setFade(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  // ÉTAPE 0: AUTHENTIFICATION (L'Attente)
  if (step === AppState.AUTH) {
    return (
      <div className={`min-h-screen bg-[#050505] flex flex-col items-center justify-center transition-all duration-1000 ${fade ? 'opacity-0 scale-95 blur-md' : 'opacity-100'}`}>
        <div className="relative mb-16">
          <div className={`absolute -inset-10 bg-pink-500/10 rounded-full blur-3xl transition-all duration-700 ${error ? 'bg-red-500/30' : ''}`}></div>
          <Lock className={`relative z-10 transition-all duration-500 ${error ? 'text-red-500' : 'text-white/30'}`} size={32} strokeWidth={1} />
        </div>

        <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center space-y-12 w-full max-w-lg px-6">
          <div className="text-center space-y-4">
            <h2 className="text-white/80 font-serif italic text-xl md:text-2xl leading-relaxed max-w-md mx-auto">
              Une clé pour un cœur...
            </h2>
            <p className="text-pink-500/30 font-mono text-[10px] uppercase tracking-[0.4em]">
              Seule toi peut débloquer ce message
            </p>
          </div>

          <div className="w-full max-w-xs space-y-10">
            <input
              autoFocus
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-transparent border-b border-white/10 text-center py-4 text-3xl font-mono tracking-[0.8em] transition-all outline-none uppercase ${
                error ? 'border-red-500 text-red-500 animate-shake' : 'border-white/20 text-white focus:border-pink-300'
              }`}
              placeholder="••••"
            />

            <button
              type="submit"
              className="group w-full py-4 text-white/40 hover:text-white transition-all font-mono text-[10px] uppercase tracking-[0.4em] flex items-center justify-center space-x-3"
            >
              <span>Accéder</span>
              <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </form>

        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
          }
          .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
        `}</style>
      </div>
    );
  }

  // ÉTAPE 1: INTRO (L'Aveu)
  if (step === AppState.INTRO) {
    return (
      <div className={`min-h-screen bg-[#050505] flex flex-col items-center justify-center transition-all duration-[1500ms] ${fade ? 'opacity-0 scale-105 blur-lg' : 'opacity-100'}`}>
        <div className="max-w-xl mx-auto space-y-20 flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-16 bg-pink-500/5 rounded-full blur-[100px] animate-pulse"></div>
            <Heart className="text-pink-600/60 relative z-10" size={40} strokeWidth={1} />
          </div>
          
          <Typewriter 
            text={INTRO_TEXT} 
            speed={40}
            onComplete={() => setTimeout(() => setShowButton(true), 800)} 
          />

          <div className={`transition-all duration-[1500ms] transform ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={handleOpenGift}
              className="group relative px-14 py-5 rounded-full border border-white/10 hover:border-pink-300/30 transition-all duration-700"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
              <div className="relative flex items-center space-x-4 text-white/60 group-hover:text-white font-mono text-[11px] uppercase tracking-[0.4em]">
                <span>Tout Pardonner</span>
                <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 flex flex-col items-center space-y-4 opacity-20 font-mono text-[9px] uppercase tracking-[0.5em]">
          <div className="flex items-center space-x-8">
            <span className="flex items-center gap-2"><MapPin size={10} /> Le Sud</span>
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            <span>La Bretagne</span>
          </div>
        </div>
      </div>
    );
  }

  // ÉTAPE 2: RÉVÉLATION (L'Expérience)
  if (step === AppState.REVEAL) {
    return (
      <div className={`min-h-screen mesh-gradient transition-all duration-[2000ms] ${fade ? 'opacity-0 scale-110' : 'opacity-100'}`}>
        <Confetti />
        
        <main className="relative max-w-5xl mx-auto px-6 pt-32 pb-64 flex flex-col items-center">
          {/* Header narratif */}
          <header className="text-center mb-40 space-y-10">
            <div className="inline-block px-6 py-2 rounded-full border border-pink-200 text-pink-500/80 font-mono text-[11px] uppercase tracking-[0.4em] bg-white/40 backdrop-blur-sm shadow-sm">
              Souvenirs Précieux
            </div>
            <h1 className="text-7xl md:text-9xl font-romantic text-[#3d312d] tracking-tighter text-glow">
              Bon Anniversaire ❤️
            </h1>
            <p className="text-[#6d5c56] font-serif italic text-2xl md:text-3xl max-w-2xl mx-auto leading-relaxed opacity-80">
              "La distance n'est qu'un voyage, notre destination c'est nous."
            </p>
            <div className="flex flex-col items-center space-y-2 opacity-30 pt-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Dérouler l'histoire</span>
              <ArrowDown size={14} className="animate-bounce" />
            </div>
          </header>

          {/* Flux de photos vertical - Plus élégant & narratif */}
          <section className="w-full space-y-64 mb-64">
            {PHOTOS.map((photo, index) => (
              <div key={photo.id} className={`flex flex-col items-center w-full ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                <div className="max-w-lg w-full space-y-12">
                  <div className="px-6 text-center md:text-left space-y-4">
                     <span className="font-mono text-[10px] text-pink-400/60 uppercase tracking-[0.4em]">Moment #{photo.id}</span>
                     <p className="font-serif italic text-[#4a3a35] text-xl md:text-2xl leading-relaxed">
                        {index === 0 && "Le début d'une évidence, un regard qui a tout changé pour moi."}
                        {index === 1 && "Notre petit compagnon, le témoin de notre bonheur quotidien."}
                        {index === 2 && "1000km de courage pour construire notre monde à nous."}
                        {index === 3 && "Parce qu'au final, la seule chose qui compte, c'est toi."}
                     </p>
                  </div>
                  <Polaroid photo={photo} index={index} />
                </div>
              </div>
            ))}
          </section>

          {/* Le Cœur 3D - Moment de conclusion */}
          <div className="w-full flex flex-col items-center py-40 mb-40 relative">
             <div className="absolute inset-0 bg-pink-100/30 blur-[150px] rounded-full pointer-events-none"></div>
             <div className="max-w-xl px-6 text-center mb-16 relative z-10">
                <h3 className="font-romantic text-5xl md:text-6xl text-[#3d312d] mb-6">Et pour conclure...</h3>
                <p className="font-serif italic text-[#6d5c56] text-xl md:text-2xl leading-relaxed">
                  Voici nos cœurs qui battent en rythme depuis plus d'un an maintenant.
                </p>
             </div>
             <div className="w-full max-w-md aspect-square relative cursor-pointer active:scale-95 transition-transform duration-500">
                <BeatingHeart3D />
             </div>
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-2xl">
             <Countdown targetDate={REUNION_DATE} />
             
             <button
              onClick={goToFinalGift}
              className="mt-40 group relative px-16 py-7 bg-[#2d2421] text-white rounded-full overflow-hidden transition-all duration-700 hover:scale-105 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center space-x-4">
                <Sparkles size={20} className="text-pink-300 animate-pulse" />
                <span className="font-serif italic text-2xl tracking-wide uppercase">Ouvrir ton cadeau final</span>
                <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ÉTAPE 3: CADEAU FINAL (L'Invitation de Prestige)
  return (
    <div className={`min-h-screen bg-[#0a0a0b] text-white transition-all duration-[2000ms] ${fade ? 'opacity-0 scale-105' : 'opacity-100'} flex flex-col items-center justify-center p-6 overflow-hidden relative`}>
      {/* Background Étoilé */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(229,179,163,0.1),transparent)] animate-pulse"></div>
        {[...Array(80)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white rounded-full animate-pulse" 
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 1.5 + 0.5}px`,
              height: `${Math.random() * 1.5 + 0.5}px`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>

      <main className="relative z-10 max-w-3xl w-full text-center space-y-16">
        <header className="space-y-6">
          <div className="flex justify-center mb-10">
            <div className="relative w-32 h-32 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-xl group">
               <div className="absolute inset-0 border border-pink-300/20 rounded-full animate-ping opacity-20"></div>
               <Tent size={50} className="text-pink-200 group-hover:scale-110 transition-transform duration-700" strokeWidth={0.5} />
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-romantic text-pink-100">Une parenthèse hors du temps</h2>
          <div className="w-16 h-[1px] bg-pink-200/20 mx-auto"></div>
        </header>

        <div className="glass rounded-[3rem] p-10 md:p-20 space-y-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300/20 to-transparent"></div>
          
          <div className="space-y-8">
            <p className="font-serif italic text-3xl md:text-5xl text-white/95 leading-tight">
              Ta soirée romantique en <span className="text-pink-200 underline decoration-pink-300/30 underline-offset-[12px]">Bivouac</span>
            </p>
            
            <div className="flex flex-col items-center space-y-6 pt-6">
               <div className="px-8 py-3 rounded-full border border-pink-300/20 bg-pink-300/5 flex items-center space-x-4 text-pink-100 font-mono text-sm tracking-[0.3em] uppercase">
                 <Calendar size={18} strokeWidth={1} />
                 <span>Réveillon • 31 Décembre</span>
               </div>
               <p className="text-white/50 font-sans text-sm tracking-[0.2em] uppercase max-w-md leading-relaxed">
                 Oublions le monde, les kilomètres et le reste. Juste nous deux, et le ciel étoilé du Sud pour commencer une nouvelle année ensemble.
               </p>
            </div>
          </div>

          <div className="pt-12 flex justify-center space-x-3 text-pink-300/40">
            <Star size={12} fill="currentColor" />
            <Star size={16} fill="currentColor" className="opacity-60" />
            <Star size={12} fill="currentColor" />
          </div>
        </div>

        <button 
          onClick={() => setStep(AppState.REVEAL)}
          className="group text-white/20 hover:text-white/60 transition-all font-mono text-[10px] uppercase tracking-[0.5em] flex items-center space-x-3 mx-auto"
        >
          <ChevronRight size={12} className="rotate-180 group-hover:-translate-x-2 transition-transform" />
          <span>Explorer nos souvenirs à nouveau</span>
        </button>
      </main>

      <footer className="absolute bottom-12 text-center w-full px-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.6em] text-white/10">Créé avec tout mon amour • Bretagne ↔ Sud</p>
      </footer>
    </div>
  );
}
