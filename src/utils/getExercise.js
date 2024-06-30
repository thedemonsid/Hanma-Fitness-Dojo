import axios from "axios";

async function getExercise(workoutInfo) {
  let data = JSON.stringify({
    workoutInfo: workoutInfo,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "/api/exercise",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export default getExercise;
