import React from "react";
import { Button, Icon, Dimmer, Loader } from "semantic-ui-react";
import { CreateDefaultUser } from "../../services/createDefaultUser";
import { useSelector } from "react-redux";
import { getUserElements } from "core/store/selectors";
import { CreateCustomUser } from "services/createCustomUser";

const Submit: React.FC = () => {
  const user = useSelector(getUserElements);

  const [isLoadingDefault, loadDefault] = CreateDefaultUser(user.environment);
  const [isLoadingCustom, loadCustom] = CreateCustomUser(user.environment);

  const loadUser = user.type === "Default" ? loadDefault : loadCustom;
  let isLoading = user.type === "Default" ? isLoadingDefault : isLoadingCustom;
  return (
    <React.Fragment>
      <Dimmer active={isLoading}>
        <Loader />
      </Dimmer>
      <Button
        icon
        labelPosition="left"
        id="saveUser"
        size="medium"
        color="instagram"
        type="button"
        style={{
          display: "inline-block",
          margin: "10px auto 10px 5px",
        }}
        onClick={() => loadUser()}
      >
        <Icon name="plus" />
        Create User
      </Button>
    </React.Fragment>
  );
};

export default Submit;
