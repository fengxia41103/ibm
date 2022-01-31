import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { map, groupBy, isNull } from "lodash";
import React, { useState, useEffect } from "react";

import ShowResource from "src/components/common/ShowResource";
import PersonNameButton from "src/components/person/PersonNameButton";

export default function PersonListByColor(props) {
  // props
  const { color } = props;
  console.log(color);

  // states
  const [resource, setResource] = useState("");

  // effect
  useEffect(() => {
    setResource(`/users?color=${color}`);
  }, [color]);

  // renders
  const render_data = data => {
    const persons = data;
    console.log(persons);
    const groupByGroup = groupBy(persons, p =>
      isNull(p.group) ? "None" : p.group[0].name
    );

    const groupCards = map(groupByGroup, (persons, group) => {
      console.log(group);

      const names = map(persons, p => (
        <PersonNameButton key={p.name} who={p} />
      ));

      return (
        <Grid item key={group} lg={4} md={6} xs={12}>
          <Card>
            <CardHeader
              title={<Typography variant="h3">GROUP: {group}</Typography>}
            />
            <CardContent>
              <Stack direction="row" spacing={1}>
                {names}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      );
    });

    return (
      <Grid container spacing={3}>
        {groupCards}
      </Grid>
    );
  };

  return <ShowResource {...{ resource, on_success: render_data }} />;
}
