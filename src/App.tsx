import React, { useState } from "react";
import "App.scss";
import { Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { Login } from "components/display/Login";
import { Confirmation } from "components/display/ConfirmEmail";
import Saved from "components/display/SavedUsers";
import { Sidebar, Segment, Menu, Icon } from "semantic-ui-react";
import Landing from "components/display/Landing";
import { UserContext } from "store/ContextApi/UserContext";
import { createBrowserHistory } from "history";
import { client } from "api/db-actions";

export const history = createBrowserHistory();

function App() {
  const [visible, setVisibility] = useState(false);
  const [logged, setLogged] = useState(client.auth.isLoggedIn);

  client.auth.addAuthListener({
    onUserLoggedIn: () => setLogged(true),
    onUserLoggedOut: () => setLogged(false),
  });

  return (
    <Router history={history}>
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          onMouseLeave={() => setVisibility(false)}
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={() => setVisibility(false)}
          vertical
          visible={visible}
          width="thin"
        >
          <Link to="/">
            <Menu.Item as="div">
              <Icon name="home" />
              Home
            </Menu.Item>
          </Link>
          <Link to="/test-user">
            <Menu.Item as="div">
              <Icon name="folder" />
              Test - Saved
            </Menu.Item>
          </Link>
          <Link to="/stage-user">
            <Menu.Item as="div">
              <Icon name="folder outline" />
              Stage - Saved
            </Menu.Item>
          </Link>
          <Link to="/login">
            <Menu.Item as="div" onClick={() => client.auth.logout()}>
              <Icon name={!logged ? "sign-in" : "sign-out"} />
              {!logged ? "Log In" : "Log Out"}
            </Menu.Item>
          </Link>
        </Sidebar>
        <Sidebar.Pusher dimmed={visible}>
          <div className="App">
            <UserContext.Provider value={{ logged, setLogged }}>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/confirm">
                  <Confirmation />
                </Route>
                {!logged && <Redirect push to="/login" />}
                <Route path="/test-user">
                  <Saved env="Test" />
                </Route>
                <Route path="/stage-user">
                  <Saved env="Stage" />
                </Route>
                <Route path="/">
                  <Landing />
                </Route>
              </Switch>
            </UserContext.Provider>
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      <div
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          width: "3%",
          height: "100%",
        }}
        onMouseEnter={() => setVisibility(true)}
      />
    </Router>
  );
}

export default App;
