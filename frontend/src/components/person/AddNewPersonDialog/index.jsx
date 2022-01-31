import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import { map, filter } from "lodash";
import React, { useState, useContext } from "react";
import { useMutate } from "restful-react";

import ShowResource from "src/components/common/ShowResource";
import GlobalContext from "src/context";

export default function AddNewPersonDialog() {
  const { api } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [resource] = useState("/users");
  const [person, setPerson] = useState("");

  const { mutate: create } = useMutate({
    verb: "POST",
    path: `${api}${resource}/`
  });

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const on_person_change = event => {
    // symbol is always in upper case
    let tmp = event.target.value;
    setPerson(tmp.toUpperCase().trim());
  };

  // call API and close this dialog
  const on_create = () => {
    create({ name: person });
    setOpen(false);
  };

  const render_data = data => {
    const persons = map(
      filter(data, s => s.name.includes(person)),
      s => <Chip key={s.id} person="primary" label={s.name} />
    );

    const is_error = map(data, s => s.name.toUpperCase()).includes(person);

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
              error={is_error}
              label={is_error ? "Error" : ""}
              helperText={is_error ? "Person name must be unique." : ""}
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
              disabled={is_error}
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
