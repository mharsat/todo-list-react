import React from "react";
import styles from "./NewTaskTextbox.module.scss";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { ThemeContext } from "../theme-context.js";

const NewTaskTextbox = props => {
  const enterTask = event => {
    if (event.key === "Enter" && event.target.value !== "") {
      props.onNewTask(event.target.value);
      event.target.value = "";
    }
  };
  return (
    <ThemeContext.Consumer>
      {theme => (
        <div className={styles.textbox}>
          <TextField
            fullWidth
            label="Enter new task..."
            onKeyDown={enterTask}
            style={{ fontWeight: 400, color: theme.text }}
          />
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

NewTaskTextbox.propTypes = {
  onNewTask: PropTypes.func.isRequired
};

export default NewTaskTextbox;
