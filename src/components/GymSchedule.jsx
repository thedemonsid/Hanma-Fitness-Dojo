import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GymSchedule() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3000/api/workout");
        if (response.data && response.data.data) {
          setWorkouts(response.data.data.map(workout => workout.title));
        } else {
          throw new Error("Unexpected data structure");
        }
      } catch (error) {
        console.error("Error fetching workout data:", error);
        setError("Failed to fetch workout data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if (isLoading) return <p>Loading workouts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h3 className="mb-4 text-lg font-semibold">Weekly Workout Schedule</h3>
      <ul className="space-y-2">
        {daysOfWeek.map((day, index) => (
          <li 
            key={day} 
            className="border-b pb-2 animate-slide-in"
            style={{animationDelay: `${index * 100}ms`}}
          >
            <h4 className="font-semibold">{day}</h4>
            <p className="text-sm">
              {day !== 'Sunday' ? workouts[index] || 'Rest day' : 'Rest day'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GymSchedule;