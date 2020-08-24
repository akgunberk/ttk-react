import { useState } from "react";
import store from "store/index";
import { dispatchDefaultUser } from "store/actions";
import { db, client } from "api/db-actions";
import { useSelector } from "react-redux";
import { getUserElements } from "store/selectors";

interface contextType {
  jobDate?: string; // example "2020-03-06 14:00"
  businessModel?: number;
  serviceId?: number;
  proBalance?: number;
  quoteId?: number;
  countryId?: number;
}

interface jobContextType {
  operation?: string;
  commands?: Array<string | undefined>;
  commandContext?: contextType;
  proTestContext?: {};
}

const payload: {
  operation: string;
  commands: Array<string>;
  commandContext: contextType;
  jobTestContext: jobContextType;
} = {
  operation: "CREATEUSER",
  commands: ["WITHPHONECONFIRMATION", "WITHPASSWORD"],
  commandContext: {},
  jobTestContext: {},
};

export function CreateCustomUser(environment: string) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"; // to prevent SSL
  const url = `https://ttk.armut.${environment}/operate`;

  const user = useSelector(getUserElements);
  const [isLoading, setState] = useState(false);

  const loadCustomUser = () => {
    /* if (user.country) {
      payload.commands.push("WITHCOUNTRYID");
      payload.commandContext["countryId"] = user.country;
    } */
    if (user.job) {
      payload.commands.push("WITHJOB");
      payload.jobTestContext = {
        operation: "CREATEJOB",
        commands: ["WITHSERVICEID"],
        commandContext: {
          serviceId: parseInt(user.service),
        },
      };
      if (user.date) {
        payload.jobTestContext.commands?.push("WITHJOBDATE");
        payload.jobTestContext.commandContext = {
          ...payload.jobTestContext.commandContext,
          jobDate: user.date,
        };
      }
      if (user.deal === 1) {
        payload.jobTestContext.commands?.push("WITHDEAL");
        payload.jobTestContext.commandContext = {
          ...payload.jobTestContext.commandContext,
          jobDate: user.date,
        };
        payload.jobTestContext.proTestContext = {
          operation: ["CREATEPRO"],
          commands: ["WITHCREDITCARD", "WITHBALANCE"],
          commandContext: { proBalance: 10000 },
        };
      } else if (user.deal === 0) {
        payload.jobTestContext.commands?.push("WITHQUOTES");
      }
      console.log(payload);
    }

    setState(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((user) => {
        const { responseContext, error } = user;
        const { accessToken, password, model } = responseContext[0];
        const { user_id, email, first_name } = model;
        if (!error) {
          store.dispatch(
            dispatchDefaultUser({
              user_id,
              email,
              password,
              accessToken,
              name: first_name,
            })
          );
          db.collection("test")
            .insertOne({
              user_id: client.auth.user?.id,
              id: user_id,
              email,
              password,
              accessToken,
              first_name,
            })
            .then((result) =>
              console.log(
                `Successfully inserted item with _id: ${result.insertedId}`
              )
            )
            .catch((err) => console.error(`Failed to insert item: ${err}`));
        }
      })
      .finally(() => {
        setState(false);
      });
  };
  return [isLoading, loadCustomUser] as const;
}
