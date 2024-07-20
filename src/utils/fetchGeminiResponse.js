import axios from "axios";

async function fetchGeminiResponse(userEmail, type) {
  let data = JSON.stringify({
    userEmail: userEmail,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: process.env.KINDE_SITE_URL + "/api/" + type, //need to think why the dynamic urls were not working
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}
export default fetchGeminiResponse;
