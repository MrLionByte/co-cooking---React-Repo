import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LocalStorageManager } from "@/services/storage";
import { toast } from 'react-hot-toast';


const ProtectedRoute = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const userData = LocalStorageManager.get("user");
      
      if (userData) {
        setIsAuthorized(true);
      } 
      else {
        setIsAuthorized(false);
        toast.error("Please login using google account to achive full access."
        )
      }

      setCheckingAuth(false);
    };

    checkAuth();
  }, [checkingAuth]);

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
