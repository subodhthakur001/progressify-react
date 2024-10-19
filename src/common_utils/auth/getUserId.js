import { getToken } from "./getToken";

export const getUserId = () => {
  const token = getToken();
  
  if (!token) {
    return null;
  }

  const tokenParts = token.split(".");

  try {
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload?.userId || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
