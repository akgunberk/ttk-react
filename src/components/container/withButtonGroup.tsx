import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { connect, useSelector } from "react-redux";
import { dispatchDeal } from "store/actions";
import { getUserElements } from "store/selectors";

type PropTypes = { left: string; right: string; dispatchDeal: any };

const WithButtonGroup: React.FC<PropTypes> = (props) => {
  let [deal, setDeal] = useState<number | undefined>(undefined);

  const handleClick = (click: number): void => {
    if (deal !== click) setDeal(click);
    props.dispatchDeal(click);
  };

  const user = useSelector(getUserElements);

  return user.job ? (
    <React.Fragment>
      <Grid.Column textAlign="center" className="selectable">
        <Button.Group size="medium" style={{ marginTop: "30px" }}>
          with
          <Button
            type="button"
            positive={deal === 0}
            onClick={() => handleClick(0)}
          >
            {props.left}
          </Button>
          <Button.Or />
          <Button
            type="button"
            positive={deal === 1}
            onClick={() => handleClick(1)}
          >
            {props.right}
          </Button>
        </Button.Group>
      </Grid.Column>
    </React.Fragment>
  ) : null;
};

export default connect(null, { dispatchDeal })(WithButtonGroup);
