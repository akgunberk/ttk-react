import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import { UserContext } from "core/store/ContextApi/Context";

const SideMenu: React.FC = () => {
  return (
    <UserContext.Consumer>
      {(User) => (
        <React.Fragment>
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
            <Menu.Item
              as="div"
              onClick={() => {
                if (User.isLoggedIn) User.actions.handleLogout();
              }}
            >
              <Icon name={!User.isLoggedIn ? "sign-in" : "sign-out"} />
              {!User.isLoggedIn ? "Log In" : "Log Out"}
            </Menu.Item>
          </Link>
        </React.Fragment>
      )}
    </UserContext.Consumer>
  );
};

export default SideMenu;
