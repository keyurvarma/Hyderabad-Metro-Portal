import axios from "axios";

export function registerUser(newUserDetails) {
  let apiUrl = "api/register";
  return axios.post(apiUrl, newUserDetails, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
