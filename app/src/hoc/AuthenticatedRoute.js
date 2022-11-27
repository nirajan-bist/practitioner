import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoginStatus } from 'reducers/auth';
import { Navigate } from "react-router-dom";

export default function AuthRoute(props) {
  const user = useSelector(state=>state.auth.user);
  const loading = useSelector(state=>state.auth.loading);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!user){
      dispatch(checkLoginStatus())
    }
  },[])

  if (loading=='re-direct') {
    return <Navigate to="/login"/>
  }

  return <>
  {loading === 'in-progress' && 'Loading...'}
  {loading === 'idle' && user && props.children}
  </>
  
}