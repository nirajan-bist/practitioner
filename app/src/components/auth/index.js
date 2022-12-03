import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { resetLoggedInUser } from "reducers/auth";
import { getAccessToken } from "services/token";

function Auth(props) {
  const isLoggedIn = getAccessToken();
  const { resetLoggedInUser } = props;

  useEffect(() => {
    if (!isLoggedIn) {
      resetLoggedInUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (!isLoggedIn) {
    return <>{props.children}</>;
  }

  if (isLoggedIn) {
    return <Navigate to={"/practitioner"} />;
  }
}

export default connect((state) => ({ user: state.auth.user }), {
  resetLoggedInUser,
})(Auth);
