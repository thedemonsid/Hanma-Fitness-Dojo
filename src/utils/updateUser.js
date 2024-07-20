const axios = require("axios");
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function UpdateUser(userDetails) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();
  if (!isUserAuthenticated) {
    console.error("User not logged in");
    return null;
  }
  userDetails.email = user?.email;
  userDetails.flagfilled = true;
  if (userDetails.age) {
    userDetails.age = parseInt(userDetails.age);
  }
  if (userDetails.weight) {
    userDetails.weight = parseFloat(userDetails.weight);
  }
  if (userDetails.height) {
    userDetails.height = parseFloat(userDetails.height);
  }
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
