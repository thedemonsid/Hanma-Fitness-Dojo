"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Play, Clock, BarChart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const categories = ['All', 'Strength', 'Cardio', 'Flexibility', 'HIIT', 'Recovery'];

const workouts = [
  { id: 1, name: 'Full Body Strength', category: 'Strength', description: 'Complete body workout targeting all major muscle groups', duration: '45 min', difficulty: 'Intermediate' },
  { id: 2, name: '30-Minute HIIT', category: 'HIIT', description: 'High-intensity interval training for maximum calorie burn', duration: '30 min', difficulty: 'Advanced' },
  { id: 3, name: 'Yoga Flow', category: 'Flexibility', description: 'Improve flexibility and mindfulness with this yoga session', duration: '60 min', difficulty: 'Beginner' },
  { id: 4, name: '5K Run', category: 'Cardio', description: 'Outdoor or treadmill run to improve cardiovascular health', duration: '30 min', difficulty: 'Intermediate' },
  { id: 5, name: 'Active Recovery', category: 'Recovery', description: 'Light exercises and stretches for rest days', duration: '20 min', difficulty: 'Beginner' },
  // Add more workouts as needed
];

const WorkoutCard = ({ workout, onAdd, onStart }) => (
  <Card className="flex flex-col h-full">
    <CardHeader>
      <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <span className="mb-2 sm:mb-0">{workout.name}</span>
        <Badge variant="secondary">{workout.category}</Badge>
      </CardTitle>
      <CardDescription>{workout.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col justify-between flex-grow">
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center">
          <Clock className="mr-2 text-blue-500" size={18} />
          <span className="text-sm">{workout.duration}</span>
        </div>
        <div className="flex items-center">
          <BarChart className="mr-2 text-green-500" size={18} />
          <span className="text-sm">{workout.difficulty}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button onClick={() => onAdd(workout)} size="sm" variant="outline" className="flex-grow">
          <Plus className="w-4 h-4 mr-2" /> Add to Plan
        </Button>
        <Button onClick={() => onStart(workout)} size="sm" className="flex-grow">
          <Play className="w-4 h-4 mr-2" /> Start
        </Button>
      </div>
    </CardContent>
  </Card>
);

const WorkoutPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredWorkouts = selectedCategory === 'All'
    ? workouts
    : workouts.filter(workout => workout.category === selectedCategory);

  const addToPlan = (workout) => {
    console.log(`Added ${workout.name} to Plan`);
    // In a real app, you'd update state or make an API call here
  };

  const startWorkout = (workout) => {
    console.log(`Starting workout: ${workout.name}`);
    // In a real app, this would navigate to a workout session page
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