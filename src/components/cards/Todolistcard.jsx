"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import TodoItem from "@/components/cards/Todocard";
import { Utensils, Dumbbell } from "lucide-react";

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

export default TodoList;
