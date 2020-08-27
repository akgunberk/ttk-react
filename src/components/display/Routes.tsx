import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Login from "./Auth/Login";
import Redirection from "./Auth/Redirect";
import Saved from "./SavedUsers";
import Landing from "./Landing";
import { UserContext } from "core/store/ContextApi/Context";

const Routes: React.FC = () => {
  return (
    <UserContext.Consumer>
      {(User) => (
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/redirect" component={Redirection} />
            {!User.isLoggedIn && <Redirect push to="/login" />}

            <Route path="/test-user">
              <Saved env="Test" />
            </Route>
            <Route path="/stage-user">
              <Saved env="Stage" />
            </Route>

            <Route path="/" component={Landing} />
          </Switch>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Routes;
