import React from "react";
import { Header, Modal } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

const WithModal: React.FC<{
  open: any;
  header: string;
  content: string;
  icon?: SemanticICONS;
}> = ({ open, header, content, icon }) => {
  return (
    <Modal
      open={open.status}
      closeIcon
      closeOnEscape
      closeOnDimmerClick
      onClose={() => open.setStatus({ type: "modal", payload: false })}
    >
      <Header icon={icon} content={header} />
      <Modal.Content>
        <p>{content}</p>
      </Modal.Content>
    </Modal>
  );
};

export default WithModal;
