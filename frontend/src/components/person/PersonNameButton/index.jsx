import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

export default function PersonNameButton(props) {
  // props
  const { who } = props;
  const { name, color } = who;

  return (
    <Button
      variant="outlined"
      style={color ? { color: color[0].name.toLowerCase() } : null}
    >
      {name}
    </Button>
  );
}

PersonNameButton.propTypes = {
  who: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string
      })
    )
  }).isRequired
};
