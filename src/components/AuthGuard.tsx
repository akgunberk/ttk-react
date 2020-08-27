import React, { useState, useReducer } from "react";
import { UserContext } from "core/store/ContextApi/Context";
import { Application } from "core/db";
import { reducer, AppState } from "./hooks/loginReducer";

export function AuthGuard(props: any) {
  const [authState, setAuthState] = useState({
    isLoggedIn: Application.currentUser?.state === "active",
    currentUser: Application.currentUser,
  });
  // eslint-disable-next-line
  const [state, dispatch] = useReducer(reducer, AppState);

  const handleLogout = () => {
    Application.currentUser?.logOut();
    dispatch({ type: "userId", payload: "" });
  };

  const authInfo = React.useMemo(() => {
    const { isLoggedIn, currentUser } = authState;
    const value = {
      isLoggedIn,
      currentUser,
      actions: { handleLogout, setAuthState },
    };
    return value;
  }, [authState]);

  return (
    <UserContext.Provider value={authInfo}>
      {props.children}
    </UserContext.Provider>
  );
}
