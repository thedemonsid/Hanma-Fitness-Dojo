"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpCircle } from "lucide-react";

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

export default TodoItem;
