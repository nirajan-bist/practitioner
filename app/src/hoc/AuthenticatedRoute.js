import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

export default function AuthRoute(props) {
  const user = useSelector(state=>state.auth.user);
  if (!user) {
    return <Navigate to="/login"/>
  }
  return <>{props.children}</>
  
}