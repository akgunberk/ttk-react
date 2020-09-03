import React, { useState } from "react";
import { Button, Icon, Popup } from "semantic-ui-react";

const ClipBoardButton: React.FC<{ name: string; copy: string }> = ({
  name,
  copy,
}) => {
  const [pop, setPop] = useState(false);
  const handleOpen = () => {
    setPop(true);
    setTimeout(() => {
      setPop(false);
    }, 3000);
  };
  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = copy;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return (
    <div style={{ margin: "5px" }}>
      <Popup
        on="click"
        open={pop}
        onOpen={handleOpen}
        content="Copied To Clipboard"
        position="top center"
        trigger={
          <Button
            basic
            type="button"
            style={{ width: "125px" }}
            animated="fade"
            size="medium"
            onClick={() => copyToClipboard()}
          >
            <Button.Content visible>{name}</Button.Content>
            <Button.Content hidden>
              Copy
              <Icon style={{ marginLeft: "4px" }} name="clipboard" />
            </Button.Content>
          </Button>
        }
      />
    </div>
  );
};

export default ClipBoardButton;
