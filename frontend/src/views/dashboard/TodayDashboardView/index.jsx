import { Box, Button } from "@material-ui/core";
import { Container } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";

import AddNewColorDialog from "src/components/color/AddNewColorDialog";
import PersonList from "src/components/color/PersonList";
import Page from "src/components/common/Page";
import ShowResource from "src/components/common/ShowResource";

export default function TodayDashboardView() {
  // states
  const [resource] = useState("/colors");
  const [color, setColor] = useState("");

  // renders
  const render_data = (data) => {
    const colors = data.results.map((color) => (
      <Button
        key={color.id}
        style={{ backgroundColor: color.name.toLowerCase() }}
        onClick={() => setColor(color)}
      >
        {color.name}
      </Button>
    ));

    return (
      <Page title="Today">
        <Container maxWidth={false}>
          <Stack direction="row" spacing={3}>
            {colors}
            <AddNewColorDialog />
          </Stack>

          <Box mt={3}>Set color: {color.name}</Box>
          {color ? <PersonList color={color.id} /> : null}
        </Container>
      </Page>
    );
  };

  return <ShowResource {...{ resource, on_success: render_data }} />;
}
