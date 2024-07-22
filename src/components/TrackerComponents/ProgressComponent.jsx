"use client";
import React, { useState } from "react";
import { Utensils, Dumbbell } from "lucide-react";
import PerformanceSummary from "@/components/cards/Summarycard";
import TodoList from "@/components/cards/Todolistcard";

const PerformancePage = () => {
  const [meals, setMeals] = useState([
    { id: "m1", text: "Breakfast: Oatmeal with berries", completed: false },
    { id: "m2", text: "Lunch: Grilled chicken salad", completed: false },
    {
      id: "m3",
      text: "Dinner: Salmon with roasted vegetables",
      completed: false,
    },
    { id: "m4", text: "Snack: Greek yogurt with nuts", completed: false },
  ]);
  // use usestate and db fecthing logic here
  // or don't .. directly call db and fetch meals here

  const [workouts, setWorkouts] = useState([
    { id: "w1", text: "30 minutes cardio", completed: false },
    { id: "w2", text: "Upper body strength training", completed: false },
    { id: "w3", text: "15 minutes stretching", completed: false },
    { id: "w4", text: "10,000 steps", completed: false },
  ]);
  // Same yha bhi krdo sire.

  const toggleTodo = (id, isMeal) => {
    const updateTodos = (todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );

    isMeal ? setMeals(updateTodos) : setWorkouts(updateTodos);
  };

  return (
    <div className="max-w-6xl p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Today&apos;s Performance</h1>
      <PerformanceSummary meals={meals} workouts={workouts} />
      <div className="grid gap-6 md:grid-cols-2">
        <TodoList
          items={meals}
          onToggle={(id) => toggleTodo(id, true)}
          icon={Utensils}
        />
        <TodoList
          items={workouts}
          onToggle={(id) => toggleTodo(id, false)}
          icon={Dumbbell}
        />
      </div>
    </div>
  );
};

export default PerformancePage;
