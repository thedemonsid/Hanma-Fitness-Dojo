"use client"
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dumbbell, Utensils, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    date: "2023-07-20",
    type: "Workout",
    description: "Upper body strength training",
    duration: "45 minutes",
    calories: 300,
  },
  {
    id: 2,
    date: "2023-07-20",
    type: "Meal",
    description: "Grilled chicken salad",
    calories: 350,
    macros: { protein: 30, carbs: 15, fat: 12 },
  },
  {
    id: 3,
    date: "2023-07-19",
    type: "Workout",
    description: "Cardio - Running",
    duration: "30 minutes",
    calories: 250,
  },
  {
    id: 4,
    date: "2023-07-19",
    type: "Meal",
    description: "Protein smoothie",
    calories: 250,
    macros: { protein: 25, carbs: 30, fat: 5 },
  },
  {
    id: 5,
    date: "2023-07-18",
    type: "Workout",
    description: "Yoga session",
    duration: "60 minutes",
    calories: 180,
  },
 // use usestate and db fecthing logic here
 // TODO: Modularize this component for better reusability
];

const ActivityIcon = ({ type }) => {
  if (type === "Workout")
    return <Dumbbell className="text-blue-500" size={18} />;
  if (type === "Meal") return <Utensils className="text-green-500" size={18} />;
  return null;
};

const HistoryPage = () => {
  const [filter, setFilter] = useState("All");

  const filteredActivities =
    filter === "All"
      ? activities
      : activities.filter((activity) => activity.type === filter);

  return (
    <div className="max-w-6xl p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Activity History</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Activity Log</span>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter activities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Activities</SelectItem>
                <SelectItem value="Workout">Workouts</SelectItem>
                <SelectItem value="Meal">Meals</SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-250px)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 text-gray-500" size={18} />
                        {activity.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="flex items-center w-fit"
                      >
                        <ActivityIcon type={activity.type} />
                        <span className="ml-1">{activity.type}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>{activity.description}</TableCell>
                    <TableCell>
                      {activity.type === "Workout" ? (
                        <span>
                          {activity.duration} • {activity.calories} cal burned
                        </span>
                      ) : (
                        <span>
                          {activity.calories} cal • P: {activity.macros.protein}
                          g C: {activity.macros.carbs}g F: {activity.macros.fat}
                          g
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryPage;
