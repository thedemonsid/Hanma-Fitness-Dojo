import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
// import { Calendar } from "@/components/ui/calendar"
import { Flame, Target } from 'lucide-react'

const GymGoalCard = () => (
  <Card className="bg-slate-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Gym Goal</CardTitle>
      <Target className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">60%</div>
      <p className="text-xs text-muted-foreground">
        +20% from last month
      </p>
        <Progress value={60} className="mt-2 bg-zinc-500"  />
    
    </CardContent>
  </Card>
)

const StreakCard = () => (
  <Card className="bg-slate-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
      <CardTitle className="text-sm font-medium">Workout Streak</CardTitle>
      <Flame className="h-4 w-4 text-muted-foreground text-orange-400" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">14 days</div>
      <p className="text-xs text-muted-foreground">
        Keep it up!
      </p>
    </CardContent>
  </Card>
)

const GymTimetable = () => (
  <div className="p-4">
    <h3 className="mb-4 text-lg font-semibold">This Week&apos;s Schedule</h3>Protein shake
    <ul className="space-y-2">
      <li>Monday: Chest and Triceps</li>
      <li>Tuesday: Back and Biceps</li>
      <li>Wednesday: Rest Day</li>
      <li>Thursday: Legs and Shoulders</li>
      <li>Friday: Full Body HIIT</li>
      <li>Saturday: Yoga and Stretching</li>
      <li>Sunday: Rest Day</li>
    </ul>
  </div>
)

const DietTimetable = () => (
  <div className="p-4">
    <h3 className="mb-4 text-lg font-semibold">This Week&apos;s Meal Plan</h3>
    <ul className="space-y-2">
      <li>Breakfast: Bread and Scrabled eggs</li>
      <li>Snack:KFC chicken Popcorns</li>
      <li>Lunch:MacD ke Burger Daba Ke Khao</li>
      <li>Snack: Chilled black Expresso</li>
      <li>Dinner: Chiken Fried Rice</li>
    </ul>
  </div>
)

function GymDashboard() {
  return (
    <div>
    <div className="flex flex-col p-4 space-y-4 mt-4">
      <h1 className="text-3xl font-bold text-center">Gym Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2">
        <GymGoalCard />
        <StreakCard />
      </div>
      
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
          <CardDescription>Your gym and diet schedule for the week</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="gym" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="gym">Gym Timetable</TabsTrigger>
              <TabsTrigger value="diet">Diet Timetable</TabsTrigger>
            </TabsList>
            <TabsContent value="gym">
              <GymTimetable />
            </TabsContent>
            <TabsContent value="diet">
              <DietTimetable />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* <Card>
        <CardHeader>
          <CardTitle>Monthly Calendar</CardTitle>
          <CardDescription>Track your workouts</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar />
        </CardContent>
      </Card> */}
    </div>
    </div>
  );
}

export default GymDashboard;