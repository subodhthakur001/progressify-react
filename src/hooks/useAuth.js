import { useState, useEffect } from "react";

const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      const tokenParts = token.split(".");
      const payload = JSON.parse(atob(tokenParts[1]));
      setUserId(payload?.userId);
    }
  }, []); 

  return {userId,token};
};

export default useAuth;
