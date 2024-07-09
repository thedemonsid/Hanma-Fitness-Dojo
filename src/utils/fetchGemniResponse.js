import axios from "axios";

async function fetchGeminiResponse(userId, type) {
  let data = JSON.stringify({
    userId: userId,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "/api/" + type,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
   // console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export default fetchGeminiResponse;