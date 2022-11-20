import client from "./client";

const register = (
  password,
  phone_number,
  email,
  userName,
  birthdate,
  location
) =>
  client.post(
    `/api/auth/user/register/${password}/${phone_number}/${email}/${userName}/${birthdate}/${location}`
  );

export default { register };
