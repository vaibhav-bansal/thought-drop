
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

interface ConfirmationScreenProps {
  onReset: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ onReset }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const confettiElements = Array.from({ length: 6 }, (_, i) => (
    <div
      key={i}
      className={`absolute text-2xl ${showConfetti ? 'confetti-animation' : 'opacity-0'}`}
      style={{
        left: `${20 + (i * 12)}%`,
        top: `${30 + (i % 2) * 20}%`,
        animationDelay: `${i * 0.1}s`
      }}
    >
      {['💕', '✨', '🌟', '💖', '🤗', '🥰'][i]}
    </div>
  ));

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {confettiElements}
      
      <div className="max-w-md mx-auto space-y-8 relative z-10">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-soft-pink/20 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-12 h-12 text-soft-pink fill-current" />
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-warm-text dark:text-warm-text">
            Sent! ✨
          </h1>
          <p className="text-lg text-warm-text/80 dark:text-warm-text/80 leading-relaxed">
            Got it. I'm here for you ♥
          </p>
          <p className="text-sm text-warm-text/60 dark:text-warm-text/60">
            Your thoughts are safe with me, and I'll be thinking of you too.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-4 my-8">
          <Sparkles className="w-6 h-6 text-lavender animate-pulse" />
          <Heart className="w-6 h-6 text-soft-pink animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Sparkles className="w-6 h-6 text-sage animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={onReset}
            variant="outline"
            className="w-full py-3 text-white border-warm-text/20 hover:bg-white/20 dark:hover:bg-white/10"
          >
            Send Another Thought
          </Button>
          
          <p className="text-xs text-warm-text/50 dark:text-warm-text/50">
            Take care of yourself today 🤗
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
