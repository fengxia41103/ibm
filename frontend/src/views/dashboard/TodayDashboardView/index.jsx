import { Box, List, ListItem } from "@material-ui/core";
import { Container } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";

import AddNewColorDialog from "src/components/color/AddNewColorDialog";
import PersonListByColor from "src/components/color/PersonListByColor";
import DropdownMenu from "src/components/common/DropdownMenu";
import Page from "src/components/common/Page";
import ShowResource from "src/components/common/ShowResource";
import AddNewGroupDialog from "src/components/group/AddNewGroupDialog";
import AddNewPersonDialog from "src/components/person/AddNewPersonDialog";

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
  const render_data = data => {
    const selectColor = (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select a color</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={color}
          label="Select a color"
          onChange={event => setColor(event.target.value)}
        >
          <MenuItem value="">---</MenuItem>
          {data.map(color => (
            <MenuItem key={color.id} value={color.name}>
              {color.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );

    return (
      <Page title="Today">
        <Container maxWidth={false}>
          <Stack direction="row" spacing={3}>
            {selectColor}
            <DropdownMenu content={menuContent} />
          </Stack>
          <Box mt={3}>
            <PersonListByColor color={color} />
          </Box>
        </Container>
      </Page>
    );
  };

  return <ShowResource {...{ resource, on_success: render_data }} />;
}
