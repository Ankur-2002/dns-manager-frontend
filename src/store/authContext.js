import React, { useCallback, useEffect, useState } from 'react';
import Context from './createStore';
import { GET, POST } from '../api/axios';
import { toast } from 'react-toastify';

const AuthContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('dns_manage_token');
    if (token) {
      checkAuth().then(data => {
        setCurrentUser(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);
  const logOut = useCallback(async () => {
    setCurrentUser(null);
    localStorage.clear();
  }, []);

  const logIn = useCallback(async (email, password) => {
    try {
      const res = await POST('/auth/login', { email, password });
      const data = res.data;
      if (data.error) {
        toast.error('Something went wrong. Please try again later.');
        throw new Error(data.error);
      }
      console.log(data);
      if (data.token) {
        localStorage.setItem('dns_manage_token', data.token);
        toast.success('User logged in successfully');
        await checkAuth();
        return;
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
      console.error(error);
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      const res = await POST('/auth/register', { name, email, password });
      const data = await res.data;
      if (data.error) {
        toast.error('Something went wrong. Please try again later.');
        throw new Error(data.error);
      }
      console.log(data);
      if (data.token) {
        localStorage.setItem('dns_manage_token', data.token);
        await checkAuth();
        toast.success('User registered successfully');
        return;
      }

      //   setCurrentUser(data);
      //   localStorage.setItem('currentUser', JSON.stringify(data));
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
      console.error(error);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const res = await GET('/auth/me');
      const data = await res.data;
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
      setCurrentUser(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        currentUser,
        setCurrentUser,
        logIn,
        logOut,
        register,
      }}
    >
      {loading ? <h1>Loading...</h1> : children}
    </Context.Provider>
  );
};

export default AuthContext;
