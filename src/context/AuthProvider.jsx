import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import makeRequest from '../api/useApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') || null);
  const [user, setUser] = useState(() => authToken ? jwtDecode(authToken) : null);
  const [isLoading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [successError, setSuccessError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
      const decodedToken = jwtDecode(authToken);
      localStorage.setItem('fullName', decodedToken.username);
      localStorage.setItem('email', decodedToken.email);
      setUser(jwtDecode(authToken));
    } else {
      localStorage.removeItem('authToken');
      setUser(null);
    }
  }, [authToken]);

  const handleNavigation = (decodedToken, isLogin=false) => {
    const { category, onBoardingStatus } = decodedToken;

    if (isLogin) {
      // console.log(isLogin);
      if (category === 'student') {
        navigate(onBoardingStatus ? '/recommendedCourse' : '/');
      } else if (category === 'corporate') {
        navigate(onBoardingStatus ? '/enterprise' : '/');
      } else {
        navigate('/');
      }
    } else {
      if (category === 'student') {
        navigate(onBoardingStatus ? '/recommendedCourse' : '/onboarding');
      } else if (category === 'corporate') {
        navigate(onBoardingStatus ? '/enterprise' : '/enterprise/onboarding');
      } else {
        navigate('/');
      }
    }
  };

  const login = async (token) => {
    // setIsLogin(true);
    const decodedToken = jwtDecode(token);
    setAuthToken(token);
    setUser(decodedToken);
    handleNavigation(decodedToken, true);
  };

  const register = async (token) => {
    const decodedToken = jwtDecode(token);
    setAuthToken(token);
    setUser(decodedToken);
    handleNavigation(decodedToken);
  };

  const logout = () => {
    setAuthToken(null);
    navigate('/login');
  };

  const value = useMemo(
    () => ({
      user,
      authToken,
      login,
      register,
      logout,
      isLoading,
      successError,
    }),
    [authToken, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
  return useContext(AuthContext);
};
