"use client"
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { Activity, Dumbbell, Utensils, Flame, Heart, Droplet, Scale, Award, Calendar } from 'lucide-react';

const DashboardComponent = () => {
  // Dummy data for demonstration
  const userData = { bmi: 22.5 };
  const weightData = [
    { date: 'Jan', weight: 70 },
    { date: 'Feb', weight: 69 },
    { date: 'Mar', weight: 68.5 },
    { date: 'Apr', weight: 68 },
    { date: 'May', weight: 67.5 },
    { date: 'Jun', weight: 67 },
  ];

  const [isHoveredActivity, setIsHoveredActivity] = useState(false);
  const [isHoveredWorkout, setIsHoveredWorkout] = useState(false);
  const [isHoveredBMI, setIsHoveredBMI] = useState(false);

  const BMIPieChart = ({ bmi }) => {
    const data = [
      { name: 'BMI', value: bmi },
      { name: 'Remaining', value: 40 - bmi },
    ];
    const COLORS = ['var(--color-primary)', 'var(--color-muted)'];

    return (
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold font-bona">
            {bmi}
          </text>
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 border rounded shadow bg-card border-border">
          <p className="text-sm font-bona">{`Date: ${label}`}</p>
          <p className="text-sm font-bold font-bona">{`Weight: ${payload[0].value}kg`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen p-8 bg-background font-bona">
      <style jsx global>{`
        :root {
          --color-primary: #7dd3fc;
          --color-secondary: #86efac;
          --color-accent: #c4b5fd;
          --color-muted: #e5e7eb;
          --color-background: #f0f9ff;
          --color-card: #ffffff;
          --color-border: #bae6fd;
          --color-text: #0c4a6e;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div className="mx-auto space-y-8 max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-center text-text">
          Your Refreshing Fitness Journey Dashboard
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden transition-all duration-300 rounded-lg shadow-lg bg-card hover:shadow-xl">
            <CardHeader className="flex items-center p-4 space-x-2 bg-background">
              <Activity size={24} className={`text-sky-500 transition-all duration-300 ${isHoveredActivity ? 'animate-[pulse_1s_ease-in-out_infinite]' : ''}`} />
              <CardTitle className="text-xl font-bona text-text">Daily Activity Boost</CardTitle>
            </CardHeader>
            <CardContent className="p-4" onMouseEnter={() => setIsHoveredActivity(true)} onMouseLeave={() => setIsHoveredActivity(false)}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-text">8,234 steps</p>
                  <p className="text-sm text-sky-700">Nice progress! Goal: 10,000 steps</p>
                  <p className="mt-2 text-xs text-sky-600">Keep it up! Just 1,766 steps to go.</p>
                </div>
                <Flame size={40} className={`text-orange-400 transition-all duration-300 ${isHoveredActivity ? 'animate-[bounce_0.5s_ease-in-out_infinite]' : ''}`} />
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden transition-all duration-300 rounded-lg shadow-lg bg-card hover:shadow-xl">
            <CardHeader className="flex items-center p-4 space-x-2 bg-background">
              <Dumbbell size={24} className={`text-emerald-500 transition-all duration-300 ${isHoveredWorkout ? 'animate-[spin_2s_linear_infinite]' : ''}`} />
              <CardTitle className="text-xl font-bona text-text">Workout Winning Streak</CardTitle>
            </CardHeader>
            <CardContent className="p-4" onMouseEnter={() => setIsHoveredWorkout(true)} onMouseLeave={() => setIsHoveredWorkout(false)}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-text">7 days strong!</p>
                  <p className="text-sm text-emerald-700">You&apos;re doing great! Keep it up!</p>
                  <p className="mt-2 text-xs text-emerald-600">Fun fact: You&apos;ve burned about 3,500 calories this week!</p>
                </div>
                <Award size={40} className={`text-yellow-400 transition-all duration-300 ${isHoveredWorkout ? 'animate-[pulse_1s_ease-in-out_infinite]' : ''}`} />
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden transition-all duration-300 rounded-lg shadow-lg bg-card hover:shadow-xl">
            <CardHeader className="flex items-center p-4 space-x-2 bg-background">
              <Heart size={24} className={`text-rose-400 transition-all duration-300 ${isHoveredBMI ? 'animate-[pulse_1s_ease-in-out_infinite]' : ''}`} />
              <CardTitle className="text-xl font-bona text-text">BMI Health Indicator</CardTitle>
            </CardHeader>
            <CardContent className="p-4" onMouseEnter={() => setIsHoveredBMI(true)} onMouseLeave={() => setIsHoveredBMI(false)}>
              {userData && <BMIPieChart bmi={userData.bmi} />}
              <p className="mt-2 text-sm text-center text-rose-700">Your BMI of 22.5 is in the healthy range. Well done!</p>
            </CardContent>
          </Card>
        </div>
        <Card className="overflow-hidden transition-all duration-300 rounded-lg shadow-lg bg-card hover:shadow-xl">
          <CardHeader className="flex items-center p-4 space-x-2 bg-background">
            <Scale size={24} className="text-indigo-400" />
            <CardTitle className="text-xl font-bona text-text">Your Steady Weight Progress</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text)' }} />
                <YAxis axisLine={false} tickLine={false} width={30} tick={{ fill: 'var(--color-text)' }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="weight" stroke="var(--color-accent)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-4 text-sm text-center text-indigo-700">Look at that consistent progress! Keep up the good work!</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden transition-all duration-300 rounded-lg shadow-lg bg-card hover:shadow-xl">
          <CardHeader className="flex items-center p-4 space-x-2 bg-background">
            <Calendar size={24} className="text-fuchsia-400" />
            <CardTitle className="text-xl font-bona text-text">Your Weekly Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <Tabs defaultValue="gym" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="gym" className="font-bona">
                  <Dumbbell size={16} className="mr-2 text-emerald-500" />
                  Gym Schedule
                </TabsTrigger>
                <TabsTrigger value="diet" className="font-bona">
                  <Utensils size={16} className="mr-2 text-amber-500" />
                  Balanced Diet Plan
                </TabsTrigger>
              </TabsList>
              <TabsContent value="gym">
                <p className="flex items-center mb-2 text-muted-foreground"><Dumbbell size={16} className="mr-2 text-emerald-500" /> Monday: Upper Body (You&apos;ve got this!)</p>
                <p className="flex items-center mb-2 text-muted-foreground"><Dumbbell size={16} className="mr-2 text-emerald-500" /> Wednesday: Lower Body (Feel the strength!)</p>
                <p className="flex items-center mb-2 text-muted-foreground"><Dumbbell size={16} className="mr-2 text-emerald-500" /> Friday: Full Body (Embrace the challenge!)</p>
                <p className="mt-4 text-sm text-emerald-700">Remember, every workout brings you closer to your goals.</p>
              </TabsContent>
              <TabsContent value="diet">
                <p className="flex items-center mb-2 text-muted-foreground"><Utensils size={16} className="mr-2 text-amber-500" /> Breakfast: Oatmeal with fruits (A nutritious start!)</p>
                <p className="flex items-center mb-2 text-muted-foreground"><Utensils size={16} className="mr-2 text-amber-500" /> Lunch: Grilled chicken salad (Fresh and tasty!)</p>
                <p className="flex items-center mb-2 text-muted-foreground"><Utensils size={16} className="mr-2 text-amber-500" /> Dinner: Salmon with vegetables (Delicious and healthy!)</p>
                <p className="mt-4 text-sm text-amber-700">Nourish your body with these balanced meals!</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardComponent;