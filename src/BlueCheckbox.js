import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";

export const BlueCheckbox = withStyles({
  root: {
    color: "#1DA1F2",
    "&$checked": {
      color: "#1DA1F2"
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);
