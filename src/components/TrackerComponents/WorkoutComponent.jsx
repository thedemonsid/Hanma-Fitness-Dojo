"use client"
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import WorkoutCard from '@/components/cards/Workoutcard';

const categories = ['All', 'Strength', 'Cardio', 'Flexibility', 'HIIT', 'Recovery'];

const workouts = [
  { id: 1, name: 'Full Body Strength', category: 'Strength', description: 'Complete body workout targeting all major muscle groups', duration: '45 min', difficulty: 'Intermediate' },
  { id: 2, name: '30-Minute HIIT', category: 'HIIT', description: 'High-intensity interval training for maximum calorie burn', duration: '30 min', difficulty: 'Advanced' },
  { id: 3, name: 'Yoga Flow', category: 'Flexibility', description: 'Improve flexibility and mindfulness with this yoga session', duration: '60 min', difficulty: 'Beginner' },
  { id: 4, name: '5K Run', category: 'Cardio', description: 'Outdoor or treadmill run to improve cardiovascular health', duration: '30 min', difficulty: 'Intermediate' },
  { id: 5, name: 'Active Recovery', category: 'Recovery', description: 'Light exercises and stretches for rest days', duration: '20 min', difficulty: 'Beginner' },
];
// Replace with usestate("id ","name","Category","Description","Duration","Difficulty") and db fecthing

const WorkoutPage = ({ onAddWorkout }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { toast } = useToast();

  const filteredWorkouts = selectedCategory === 'All'
    ? workouts
    : workouts.filter(workout => workout.category === selectedCategory);

  const addToPlan = (workout) => {
    onAddWorkout({
      id: `w${Date.now()}`,
      text: `${workout.name} (${workout.duration})`,
      completed: false
    });
    toast({
      title: "Workout Added",
      description: `${workout.name} has been added to your plan.`,
    });
  };

  const startWorkout = (workout) => {
    toast({
      title: "Workout Started",
      description: `You've started ${workout.name}. Good luck!`,
    });

  };

  return (
    <div className="p-4 md:p-6 max-w-[calc(100vw-80px)] md:max-w-full">
      <h1 className="mb-4 text-2xl font-bold md:text-3xl md:mb-6">Workout Library</h1>
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="flex flex-wrap mb-4">
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="flex-grow md:flex-grow-0">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredWorkouts.filter(w => category === 'All' || w.category === category).map(workout => (
                  <WorkoutCard key={workout.id} workout={workout} onAdd={addToPlan} onStart={startWorkout} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default WorkoutPage;
