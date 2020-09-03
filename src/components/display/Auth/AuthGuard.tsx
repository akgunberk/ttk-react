import React, { useState } from "react";
import { UserContext } from "core/store/ContextApi/Context";
import { Application } from "core/initApp";

export function AuthGuard(props: any) {
  const [authState, setAuthState] = useState({
    isLoggedIn: Application.currentUser?.state === "active",
    currentUser: Application.currentUser,
  });
  // eslint-disable-next-line

  const handleLogout = () => {
    Application.currentUser?.logOut();
    setAuthState({ isLoggedIn: false, currentUser: null });
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
