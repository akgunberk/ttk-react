import React from "react";
import { Button, Icon } from "semantic-ui-react";
import CopyToClipboard from "react-copy-to-clipboard";

const ClipBoardButton: React.FC<{ name: string; copy: string }> = ({
  name,
  copy,
}) => {
  return (
    <div style={{ margin: "5px" }}>
      <CopyToClipboard text={copy}>
        <Button
          basic
          type="button"
          style={{ width: "125px" }}
          animated="fade"
          size="medium"
        >
          <Button.Content visible>{name}</Button.Content>
          <Button.Content hidden>
            Copy <Icon style={{ marginLeft: "4px" }} name="clipboard" />
          </Button.Content>
        </Button>
      </CopyToClipboard>
    </div>
  );
};

export default ClipBoardButton;
