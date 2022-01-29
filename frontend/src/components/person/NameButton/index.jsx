import { Button } from "@material-ui/core";
import React from "react";

export default function PersonNameButton(props) {
  // props
  const { who } = props;
  const { name, color } = who;

  return color ? (
    <Button style={{ backgroundColor: color.name.toLowerCase() }}>
      {name}
    </Button>
  ) : (
    <Button>{name}</Button>
  );
}
