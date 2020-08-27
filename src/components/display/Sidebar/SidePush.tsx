import React, { useState } from "react";
import { Sidebar, Segment, Menu } from "semantic-ui-react";
import SideMenu from "./SideMenu";
import Routes from "../Routes";

const SideBarMenu: React.FC = () => {
  const [visible, setVisibility] = useState(false);

  return (
    <React.Fragment>
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
          <SideMenu />
        </Sidebar>
        <Sidebar.Pusher dimmed={visible}>
          <Routes />
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
    </React.Fragment>
  );
};

export default SideBarMenu;
