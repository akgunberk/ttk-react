import React, { useState, useEffect, useRef } from "react";
import { UserContext } from "core/store/ContextApi/Context";
import { Application } from "core/initApp";
import { User } from "realm-web";

export function AuthGuard(props: any) {
  const appRef = useRef(Application);

  const [user, setAuthState] = useState<User<
    Realm.DefaultFunctionsFactory,
    any
  > | null>(Application.currentUser);

  useEffect(() => {
    setAuthState(Application.currentUser);
  }, [appRef.current.currentUser]);

  const logOut = async () => {
    if (Application.currentUser) {
      await Application.currentUser?.logOut();
      setAuthState(Application.currentUser);
    }
  };

  return (
    <UserContext.Provider value={{ user, actions: { logOut, setAuthState } }}>
      {props.children}
    </UserContext.Provider>
  );
}

/* 
export function AuthGuard(props: any) {
   const appRef = useRef(Application);
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
} */
