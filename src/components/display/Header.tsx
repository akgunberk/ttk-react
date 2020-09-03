import React, { Fragment } from "react";
import WithSelect from "components/container/withSelect";
import { environmentOptions, userTypeOptions } from "assets/selectableOptions";
import { Message } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { getUserElements } from "core/store/selectors";
import { Application } from "core/initApp";

const Header: React.FC = () => {
  const user = useSelector(getUserElements);
  let firstName = Application.currentUser?.profile.firstName;
  let header = `Hi ${firstName}, do not forget to use sidebar hiding at the most left side of the page`;
  return (
    <Fragment>
      {user.type === "Default" ? (
        <div style={{ margin: "0 25%" }}>
          <Message
            icon="info"
            header={header}
            content="All users created are saved, don't worry"
            size="small"
            compact
          />
        </div>
      ) : null}
      <WithSelect
        name="Type"
        options={userTypeOptions}
        defaultValue="Default"
      />
      <WithSelect
        name="Environment"
        options={environmentOptions}
        defaultValue="Test"
      />
    </Fragment>
  );
};

export default Header;
