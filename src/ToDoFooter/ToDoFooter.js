import React from "react";
import styles from "./ToDoFooter.module.scss";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { ThemeContext } from "../theme-context.js";

const ToDoFooter = props => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <div className={styles.footer}>
          <div
            className={styles.tasksLeft}
            style={{
              display: "flex",
              alignItems: "center",
              color: theme.text
            }}
          >
            {props.tasksLeft} {props.tasksLeft === 1 ? "task" : "tasks"} left
          </div>
          {props.generateFooterTabs()}
          <Button
            className={styles.clearCheckedButton}
            onClick={props.onClearCheckedTasks}
            style={{
              color: theme.text
            }}
          >
            Clear Checked
          </Button>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

ToDoFooter.propTypes = {
  tasksLeft: PropTypes.number.isRequired,
  onClearCheckedTasks: PropTypes.func.isRequired,
  generateFooterTabs: PropTypes.func.isRequired
};

export default ToDoFooter;
