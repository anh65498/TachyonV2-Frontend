import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import {
  Grid,
  Table,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";

const url = "https://hyo-backend.herokuapp.com/test";

/**
 *
 * @param {String} name
 */
const makeTitleReadable = (name) => {
  return name === "_id"
    ? "Id"
    : name
        .split("_")
        .map((word) => {
          // console.log(word);
          if (word) return word[0].toUpperCase() + word.substring(1);
          return "";
        })
        .join(" ");
};

/**
 *
 * @param {Object} obj
 * @param {string[]} keyOrder
 */
const orderKey = (obj, keyOrder) => {
  keyOrder.forEach((k) => {
    const v = obj[k];
    // eslint-disable-next-line
    delete obj[k];
    // eslint-disable-next-line
    obj[k] = v;
  });
};

const CreateTeam = () => {
  // eslint-disable-next-line
  const [data, setData] = useState([]);
  const [orderedData, setOrderedData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const fetchData = async (url) => {
      const response = await fetch(url);
      const responseData = await response.json();
      return responseData;
    };
    fetchData(url)
      // eslint-disable-next-line no-shadow
      .then((fetchedData) => {
        setData(fetchedData);
        const order = Array.from(
          new Set([
            "email",
            "discord",
            "name",
            "start_date",
            "end_date",
            "track",
            ...Object.keys(fetchedData[0]),
            "goals",
            "createdAt",
            "updatedAt",
            "rules_agreement",
            "__v",
          ])
        );
        const newData = [...fetchedData];
        newData.forEach((d) => {
          orderKey(d, order);
          // eslint-disable-next-line
          delete d["_id"];
        });
        setOrderedData(newData);
        const cols = Object.keys(newData[0]).map((item) => ({
          name: item,
          title: makeTitleReadable(item),
        }));
        setColumns(cols);
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="">
      <Button color="primary" variant="contained">
        Create Team
      </Button>
      <Button color="primary" variant="contained">
        Add User to Team
      </Button>
      <Grid rows={orderedData} columns={columns}>
        <Table />
        <TableHeaderRow />
      </Grid>
    </div>
  );
};

export default CreateTeam;