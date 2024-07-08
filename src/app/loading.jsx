"use client";
import React, { useEffect, useState } from 'react';

const FitnessLoader = () => {
  const [activeEmoji, setActiveEmoji] = useState(0);
  const [loadingText, setLoadingText] = useState('');

  const fitnessEmojis = ['🏋️', '🏃', '🧘', '🚴', '🤸'];
  const loadingTexts = [
    'Asking AI for fitness tips...',
    'Brewing pre-workout coffee...',
    'Warming up the algorithms...',
    'Calculating optimal rep ranges...',
    'Stretching the servers...',
    'Loading your personal trainer...',
    'Preparing your virtual gym...'
  ];

  useEffect(() => {
    const emojiInterval = setInterval(() => {
      setActiveEmoji((prev) => (prev + 1) % fitnessEmojis.length);
    }, 500);

    const textInterval = setInterval(() => {
      setLoadingText(loadingTexts[Math.floor(Math.random() * loadingTexts.length)]);
    }, 2000);

    return () => {
      clearInterval(emojiInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="flex space-x-4 mb-8">
        {fitnessEmojis.map((emoji, index) => (
          <div
            key={index}
            className={`text-4xl transform transition-transform duration-200 ${
              index === activeEmoji ? 'scale-150 translate-y--2' : 'scale-100'
            }`}
          >
            {emoji}
          </div>
        ))}
      </div>
      <div className="text-white text-xl font-semibold animate-pulse">
        {loadingText}
      </div>
    </div>
  );
};

export default FitnessLoader;