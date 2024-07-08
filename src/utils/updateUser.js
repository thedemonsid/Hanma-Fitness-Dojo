const axios = require("axios");
import { getSession } from "next-auth/react";
async function UpdateUser(userDetails) {
  const session = await getSession();
  if (!session) {
    console.error("User not logged in");
    return;
  }
  userDetails.id = session?.user?.id;
  userDetails.age = parseInt(userDetails.age);
  userDetails.weight = parseFloat(userDetails.weight);
  userDetails.height = parseFloat(userDetails.height);
  console.log("User details:", userDetails);
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: "/api/user",
    headers: {
      "Content-Type": "application/json",
    },
    data: userDetails,
  };
  try {
    const response = await axios.request(config);
    // console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default UpdateUser;
