"use client";
// components/OpeningSequenceComponent.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Apple } from 'lucide-react';

const CustomPerson = ({ height = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={height} height={height} className={className}>
    <path fill="currentColor" d="M12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM6 14a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v7H6v-7z" />
    <path fill="currentColor" d="M6 21v1h12v-1a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3z" />
  </svg>
);

const questions = [
  {
    title: "Set Your Age",
    field: "age",
    min: 18,
    max: 80,
    icon: <CustomPerson className="w-24 h-24 text-blue-500" />,
    description: "Drag the slider to set your age. The younger you are, the more stars you'll earn!",
  },
  {
    title: "Reach Your Height",
    field: "height",
    min: 140,
    max: 220,
    icon: (height) => (
      <div className="relative">
        <CustomPerson height={height / 1.5} className="outline-blue-100" />
        <div
          className="absolute bottom-0 left-0 right-0 outline-blue-600"
          style={{ height: `${(height - 140) / (220 - 140) * 100}%`, transition: 'height 0.3s' }}
        />
      </div>
    ),
    unit: "cm",
    description: "Stretch the person to match your height. Taller people get more power-ups!",
  },
  {
    title: "Balance Your Weight",
    field: "weight",
    min: 40,
    max: 150,
    icon: <Scale className="w-24 h-24 text-yellow-500" />,
    unit: "kg",
    description: "Find your perfect balance! The closer you are to your ideal weight, the more points you score.",
  },
  {
    title: "Choose Your Diet Quest",
    field: "mealPreference",
    options: ["Vegetarian", "Vegan", "Keto", "Balanced"],
    icon: <Apple className="w-24 h-24 text-red-500" />,
    description: "Pick your nutritional adventure. Each choice unlocks unique benefits!",
  },
];

const calculateScore = (field, value) => {
  switch (field) {
    case 'age':
      return Math.max(5 - Math.floor((value - 18) / 10), 1);
    case 'height':
      return Math.min(Math.max(Math.floor((value - 140) / 10), 1), 5);
    case 'weight':
      const idealWeight = 22 * Math.pow(value / 100, 2); // BMI of 22
      const difference = Math.abs(value - idealWeight);
      return Math.max(5 - Math.floor(difference / 5), 1);
    default:
      return 3;
  }
};

const OpeningSequenceComponent = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState({
    age: 25,
    height: 170,
    weight: 70,
    mealPreference: '',
  });
  const [score, setScore] = useState(0);
  const [questComplete, setQuestComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.inOut' } });

    tl.to(containerRef.current, { opacity: 1, duration: 1 })
      .to(textRef.current, { scale: 2, opacity: 0, transformOrigin: 'center', duration: 2 }, "+=0.5")
      .to(containerRef.current, { opacity: 0, duration: 0.5 }, "+=0.5")
      .fromTo('.content', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 })
      .call(() => setShowForm(true));
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: parseFloat(value) }));
    const questionScore = calculateScore(name, parseFloat(value));
    setScore((prevScore) => prevScore + questionScore);
  };

  const handleMealPreference = (preference) => {
    setFormData((prevData) => ({ ...prevData, mealPreference: preference }));
    setScore((prevScore) => prevScore + 3);  // Fixed score for meal preference
    goToNextQuestion();
  };

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuestComplete(true);
    }
  }, [currentQuestionIndex]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      goToNextQuestion();
    }
  }, [goToNextQuestion]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="bg-background text-foreground">
      <div ref={containerRef} className="fixed inset-0 flex items-center justify-center text-white bg-black">
        <h1 ref={textRef} className="text-4xl font-bold">
          Hanma Fitness Dojo
        </h1>
      </div>
      {showForm ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-primary via-secondary to-accent">
          <div className="w-full max-w-md overflow-hidden rounded-lg shadow-xl bg-card">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Fitness Quest</h2>
                <div className="flex items-center">
                  <span className="text-xl font-bold">🏋️‍♂️ {score}</span>
                </div>
              </div>
              {questComplete ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="text-center"
                >
                  <span className="text-6xl">🏋️‍♂️</span>
                  <h3 className="mt-4 text-2xl font-bold">Quest Complete!</h3>
                  <p className="mt-2">You&apos;ve earned {score} points. Time to start your fitness journey!</p>
                </motion.div>
              ) : (
                <AnimatePresence initial={false} custom={currentQuestionIndex}>
                  <motion.div
                    key={currentQuestionIndex}
                    custom={currentQuestionIndex}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                  >
                    <h3 className="mb-4 text-xl font-semibold text-center">{currentQuestion.title}</h3>
                    <div className="flex justify-center mb-6">
                      {typeof currentQuestion.icon === 'function'
                        ? currentQuestion.icon(formData[currentQuestion.field])
                        : currentQuestion.icon
                      }
                    </div>
                    <p className="mb-4 text-sm text-center text-muted-foreground">{currentQuestion.description}</p>
                    {currentQuestion.field !== 'mealPreference' ? (
                      <>
                        <input
                          type="range"
                          name={currentQuestion.field}
                          min={currentQuestion.min}
                          max={currentQuestion.max}
                          value={formData[currentQuestion.field]}
                          onChange={handleInputChange}
                          className="w-full mb-4 accent-primary"
                        />
                        <p className="text-4xl font-bold text-center">
                          {formData[currentQuestion.field]} {currentQuestion.unit}
                        </p>
                      </>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {currentQuestion.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleMealPreference(option)}
                            className="w-full h-16 text-lg font-semibold transition-all duration-200 border-2 rounded-lg bg-card border-border hover:scale-105 hover:bg-accent hover:text-accent-foreground"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
            {!questComplete && (
              <div className="px-8 py-4 bg-muted">
                <p className="text-center text-muted-foreground">
                  Press <span className="font-semibold">Enter</span> to continue your quest!
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-8 content bg-background">
          <h2 className="mb-4 text-3xl font-bold">Welcome to Hanma Fitness Dojo!</h2>
          <p className="mb-4 text-lg">
            This is a place where you can learn about the art of yoga, meditation, and physical fitness. We have various classes, workshops, and group activities to help you grow and improve your well-being.
          </p>
          <p className="text-lg">
            Get ready to embark on a personalized fitness journey tailored just for you!
          </p>
        </div>
      )}
    </div>
  );
};

export default OpeningSequenceComponent;
