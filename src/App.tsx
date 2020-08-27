import React from "react";
import "App.scss";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { AuthGuard } from "components/AuthGuard";
import SideBarMenu from "components/display/Sidebar/SidePush";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <AuthGuard>
        <SideBarMenu />
      </AuthGuard>
    </Router>
  );
}

export default App;
