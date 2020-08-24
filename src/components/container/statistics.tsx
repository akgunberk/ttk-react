import React from "react";
import { Statistic } from "semantic-ui-react";
import fetch from "node-fetch";

const items = [
  { key: "1", label: "Visits", value: "" },
  { key: "2", label: "Test Users", value: "" },
  { key: "3", label: "Stage Users", value: "" },
  { key: "4", label: "Active Members", value: "" },
];

async function getStats() {
  const url =
    "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/ttk-ui-cvkwt/service/userCount/incoming_webhook/statsWebHook";
  const stats = await fetch(url, {
    method: "GET",
  }).then((res) => res.json());

  items.forEach((el, index) => {
    el.value = Object.values<string>(stats[index])[0];
  });
  return items;
}

class Statistics extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      items: {},
    };
  }
  async componentDidMount() {
    getStats().then((items) => this.setState({ items }));
  }
  render() {
    return items[0].value ? (
      <div style={{ position: "absolute", bottom: "15%" }}>
        <Statistic.Group items={items} />
      </div>
    ) : null;
  }
}

export default Statistics;
