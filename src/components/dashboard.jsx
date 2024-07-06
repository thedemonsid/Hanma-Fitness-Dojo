"use client"
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import GymGoalCard from '@/components/Gymgoalcard';
import StreakCard from '@/components/Streakcard';
import GymSchedule from '@/components/GymSchedule';
import DietSchedule from '@/components/DietSchedule';

function GymDashboard() {
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col p-4 space-y-4 mt-4">
        <h1 className="text-3xl font-bold text-center animate-slide-down">
          Gym Dashboard
        </h1>
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
                <TabsTrigger value="gym">Gym Schedule</TabsTrigger>
                <TabsTrigger value="diet">Diet Schedule</TabsTrigger>
              </TabsList>
              <TabsContent value="gym">
                <GymSchedule />
              </TabsContent>
              <TabsContent value="diet">
                <DietSchedule />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default GymDashboard