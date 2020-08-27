import React, { useEffect } from "react";
import { Segment, Dimmer, Loader } from "semantic-ui-react";
import { handleAuthRedirect } from "realm-web";

const Redirection: React.FC = () => {
  useEffect(() => {
    handleAuthRedirect();
  });

  return (
    <Segment style={{ height: "100vh", width: "100vw" }}>
      <Dimmer active>
        <Loader size="huge">Please wait...</Loader>
      </Dimmer>
    </Segment>
  );
};

export default Redirection;
