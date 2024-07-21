"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpCircle, Utensils, Dumbbell } from "lucide-react";

const TodoItem = ({ item, onToggle }) => (
  <div className="flex items-center px-2 py-2 space-x-2 transition-colors rounded-lg hover:bg-accent">
    <Checkbox
      id={item.id}
      checked={item.completed}
      onCheckedChange={() => onToggle(item.id)}
    />
    <label
      htmlFor={item.id}
      className={`flex-grow text-sm ${item.completed ? "line-through text-muted-foreground" : ""}`}
    >
      {item.text}
    </label>
    {item.completed && <ArrowUpCircle className="text-green-500" size={18} />}
  </div>
);

const TodoList = ({ items, onToggle, icon: Icon }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <Icon className="mr-2" />
        {Icon === Utensils ? "Meals" : "Workouts"}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[300px] pr-4">
        {items.map((item) => (
          <TodoItem key={item.id} item={item} onToggle={onToggle} />
        ))}
      </ScrollArea>
    </CardContent>
  </Card>
);

const PerformanceSummary = ({ meals, workouts }) => {
  const totalTasks = meals.length + workouts.length;
  const completedTasks =
    meals.filter((m) => m.completed).length +
    workouts.filter((w) => w.completed).length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Today&apos;s Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progressPercentage} className="h-2 mb-2" />
        <p className="text-sm text-muted-foreground">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </CardContent>
    </Card>
  );
};

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

  const [workouts, setWorkouts] = useState([
    { id: "w1", text: "30 minutes cardio", completed: false },
    { id: "w2", text: "Upper body strength training", completed: false },
    { id: "w3", text: "15 minutes stretching", completed: false },
    { id: "w4", text: "10,000 steps", completed: false },
  ]);

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
