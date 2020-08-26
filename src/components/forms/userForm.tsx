import React, { useState, useEffect } from "react";
import { Grid, Form } from "semantic-ui-react";
import {
  countryOptions,
  businessModelOptions,
  jobOptionsBM2,
  jobOptionsBM1,
} from "assets/selectableOptions";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import WithSelect from "components/container/withSelect";
import WithButtonGroup from "components/container/withButtonGroup";
import { useSelector, useDispatch } from "react-redux";
import { getUserElements } from "core/store/selectors";
import moment from "moment";
import { USER } from "core/store/actionTypes";

const UserForm: React.FC = () => {
  const user = useSelector(getUserElements);
  const [date, setDate] = useState<moment.Moment | null>(null);
  const [focused, setFocused] = useState<boolean | null>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let jobDate = date?.format("YYYY-MM-DD HH:MM");
    dispatch({ type: USER.DATE, payload: jobDate });
  }, [date, dispatch]);
  return (
    <React.Fragment>
      <Form>
        <Grid columns="equal" divided="vertically">
          <Grid.Row centered>
            <WithSelect name="Country" options={countryOptions} />
          </Grid.Row>
          <Grid.Row centered>
            <WithSelect name="Business Model" options={businessModelOptions} />

            <WithSelect
              name="Job"
              options={user.bm === "1" ? jobOptionsBM1 : jobOptionsBM2}
            />
          </Grid.Row>
          {user.job ? (
            <Grid.Row centered>
              <Grid.Column textAlign="center">
                <SingleDatePicker
                  noBorder
                  numberOfMonths={1}
                  date={date}
                  onDateChange={(date) => setDate(date)}
                  focused={focused}
                  onFocusChange={({ focused }) => setFocused(focused)}
                  id="jobDate"
                  isOutsideRange={() => false}
                />
                <WithButtonGroup left="Quote" right="Deal" />
              </Grid.Column>
            </Grid.Row>
          ) : null}
        </Grid>
      </Form>
    </React.Fragment>
  );
};

export default UserForm;
