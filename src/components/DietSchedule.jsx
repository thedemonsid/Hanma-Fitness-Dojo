import React from 'react';

function DietSchedule() {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const meals = [
    'Oatmeal with fruits',
    'Grilled chicken salad',
    'Salmon with quinoa',
    'Vegetable stir-fry',
    'Turkey sandwich',
    'Protein shake and nuts',
    'Cheat Day'
  ];

  return (
    <div className="p-4">
      <h3 className="mb-4 text-lg font-semibold">Weekly Meal Schedule</h3>
      <ul className="space-y-2">
        {daysOfWeek.map((day, index) => (
          <li 
            key={day} 
            className="border-b pb-2 animate-slide-in"
            style={{animationDelay: `${index * 100}ms`}}
          >
            <h4 className="font-semibold">{day}</h4>
            <p className="text-sm">{meals[index]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DietSchedule;