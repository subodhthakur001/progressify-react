
import { useEffect, useState } from 'react';
import * as jwtDecode from 'jwt-decode'; 

const useAuth = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId); 
    }
  }, []);

  return userId;
};

export default useAuth;
