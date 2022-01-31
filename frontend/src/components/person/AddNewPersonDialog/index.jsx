import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@mui/material/TextField";
import { map, filter } from "lodash";
import React, { useState, useContext, useEffect } from "react";
import { useMutate } from "restful-react";

import ShowResource from "src/components/common/ShowResource";
import GlobalContext from "src/context";

export default function AddNewPersonDialog() {
  // context
  const { api } = useContext(GlobalContext);

  // states
  const [open, setOpen] = useState(false);
  const [resource] = useState("/users");
  const [person, setPerson] = useState("");
  const [colors, setColors] = useState([]);
  const [groups, setGroups] = useState([]);
  const [assignedColor, setAssignedColor] = useState("");
  const [assignedGroup, setAssignedGroup] = useState("");

  // hooks
  useEffect(() => {
    fetch(`${api}/colors`)
      .then(response => response.json())
      .then(data => setColors(data));
    fetch(`${api}/groups`)
      .then(response => response.json())
      .then(data => setGroups(data));
  }, []);
  const { mutate: create } = useMutate({
    verb: "POST",
    path: `${api}${resource}/`
  });

  // helpers
  const reload = () => window.location.reload();

  // even handlers
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const on_person_change = event => {
    // symbol is always in upper case
    let tmp = event.target.value;
    setPerson(tmp.toUpperCase().trim());
  };
  const on_color_change = event => {
    let tmp = event.target.value;
    setAssignedColor(tmp.toUpperCase().trim());
  };
  const on_group_change = event => {
    let tmp = event.target.value;
    setAssignedGroup(tmp.toUpperCase().trim());
  };

  // call API and close this dialog
  const on_create = () => {
    create({ name: person, color: assignedColor, group: assignedGroup });
    setOpen(false);
    reload();
  };

  // render
  const render_data = data => {
    const persons = map(
      filter(data, s => s.name.includes(person)),
      s => <Chip key={s.id} person="primary" label={s.name} />
    );

    // person name should be unique
    const is_person_error = map(data, s => s.name.toUpperCase()).includes(
      person
    );

    // create new color & group
    const is_new_color = assignedColor
      ? !map(colors, s => s.name.toUpperCase()).includes(assignedColor)
      : false;
    const is_new_groupo = assignedGroup
      ? !map(groups, s => s.name.toUpperCase()).includes(assignedGroup)
      : false;

    let personColor = "";
    if (is_person_error) {
      const me = filter(data, s => s.name.toUpperCase() === person)[0].color;
      if (me.color) {
        personColor = me.color[0].name.toLowerCase();
      }
    }

    return (
      <>
        <Button person="secondary" onClick={handleClickOpen}>
          <AddIcon />
          Add New Person
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add New Person</DialogTitle>
          <DialogContent>
            <DialogContentText>Person name must be unique.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              value={person}
              onChange={on_person_change}
              placeholder="person name"
              fullWidth
              error={is_person_error}
              label={is_person_error ? "Error" : ""}
              helperText={is_person_error ? "Person name must be unique." : ""}
              sx={{ input: { color: personColor } }}
            />

            <TextField
              autoFocus
              margin="dense"
              value={assignedColor}
              onChange={on_color_change}
              placeholder="assign a color"
              fullWidth
              helperText={is_new_color ? "This new color will be created." : ""}
            />
            <TextField
              autoFocus
              margin="dense"
              value={assignedGroup}
              onChange={on_group_change}
              placeholder="assign a group"
              fullWidth
              helperText={
                is_new_groupo ? "This new group will be created." : ""
              }
            />

            <Box mt={2}>{persons}</Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} person="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              person="primary"
              onClick={on_create}
              disabled={is_person_error}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  // render as usual to get data
  return <ShowResource {...{ resource, on_success: render_data }} />;
}
