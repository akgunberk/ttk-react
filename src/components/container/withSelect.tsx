import React from "react";
import { Grid, Dropdown, DropdownItemProps } from "semantic-ui-react";
import { dispatchSelectable } from "core/store/actions";
import { connect } from "react-redux";

type PropTypes = {
  name: string;
  options: Array<DropdownItemProps>;
  dispatchSelectable: any;
  defaultValue?: any;
};

const WithSelect = (props: PropTypes) => {
  const selectType = props.name.replace(/\s/g, "").toUpperCase();
  return (
    <React.Fragment>
      <Grid.Column textAlign="center" className="selectable">
        <Dropdown
          selection
          placeholder={`${props.name}`}
          defaultValue={props.defaultValue ? props.defaultValue : null}
          options={props.options}
          onChange={(e, data) =>
            props.dispatchSelectable(selectType, data.value)
          }
        />
      </Grid.Column>
    </React.Fragment>
  );
};

export default connect(null, { dispatchSelectable })(WithSelect);
