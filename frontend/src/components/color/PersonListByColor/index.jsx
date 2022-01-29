import Stack from "@mui/material/Stack";
import React, { useState, useEffect } from "react";

import ShowResource from "src/components/common/ShowResource";
import PersonNameButton from "src/components/person/PersonNameButton";

export default function PersonListByColor(props) {
  // props
  const { color } = props;

  // states
  const [resource, setResource] = useState("");

  // effect
  useEffect(() => {
    setResource(`/colors/${color}/persons`);
  }, [color]);

  // renders
  const render_data = (data) => {
    const { persons = [] } = data;

    // no person is assigned to this color
    if (persons.length === 0) return "No person has this color";

    const names = persons.map((name) => (
      <PersonNameButton key={name} who={{ name: name }} />
    ));

    return (
      <Stack direction="row" spacing={3}>
        {names}
      </Stack>
    );
  };

  return <ShowResource {...{ resource, on_success: render_data }} />;
}
