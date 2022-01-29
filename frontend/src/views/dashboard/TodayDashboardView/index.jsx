import { Box, Button, List, ListItem } from "@material-ui/core";
import { Container } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";

import AddNewColorDialog from "src/components/color/AddNewColorDialog";
import PersonListByColor from "src/components/color/PersonListByColor";
import DropdownMenu from "src/components/common/DropdownMenu";
import Page from "src/components/common/Page";
import ShowResource from "src/components/common/ShowResource";
import AddNewGroupDialog from "src/components/group/AddNewGroupDialog";
import AddNewPersonDialog from "src/components/person/AddNewPersonDialog";
import PersonList from "src/components/person/PersonList";

export default function TodayDashboardView() {
  // states
  const [resource] = useState("/colors");
  const [color, setColor] = useState("");

  const menuContent = (
    <List>
      <ListItem>
        <AddNewGroupDialog />
      </ListItem>
      <ListItem>
        <AddNewColorDialog />
      </ListItem>
      <ListItem>
        <AddNewPersonDialog />
      </ListItem>
    </List>
  );

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
            <DropdownMenu content={menuContent} />
          </Stack>

          <Box mt={3}>Set color: {color.name}</Box>
          {color ? <PersonListByColor color={color.id} /> : <PersonList />}
        </Container>
      </Page>
    );
  };

  return <ShowResource {...{ resource, on_success: render_data }} />;
}
