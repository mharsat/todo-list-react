import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import { BlueCheckbox } from "../BlueCheckbox";
import InputBase from "@material-ui/core/InputBase";
import { ThemeContext } from "../theme-context.js";
import styles from "./ToDoTask.module.scss";
import PropTypes from "prop-types";

function ToDoTask(props) {
  const generateDeleteIcon = theme => {
    if (props.isChosen)
      return (
        <Icon
          className={styles.clearIcon}
          onClick={event => props.handleDeleteTask(props.index)}
          style={{
            color: theme.clearButton
          }}
        >
          clear
        </Icon>
      );
  };

  return (
    <ThemeContext.Consumer key={`theme-${props.task.title}_${props.index}`}>
      {theme => (
        <div key={`div-${props.task.title}_${props.index}`}>
          <ListItem
            className={styles.listItem}
            key={`${props.task.title}_${props.index}`}
            onMouseEnter={() => props.handleMouseEnter(props.index)}
            onMouseLeave={() => props.handleMouseLeave()}
          >
            <BlueCheckbox
              onChange={(event, isChecked) =>
                props.handleCheck(event, isChecked, props.index)
              }
              checked={props.task.isDone}
            />
            <InputBase
              className={styles.inputBase}
              fullWidth
              defaultValue={props.task.title}
              onBlur={event => props.handleEditTask(event, props.index)}
              onKeyPress={event => props.handleEnteredTask(event, props.index)}
              style={{
                fontSize: "x-large",
                textDecoration: props.task.isDone ? "line-through" : "none",
                color: props.task.isDone ? "gray" : theme.text
              }}
            />
            {generateDeleteIcon(theme)}
          </ListItem>
          <Divider light variant={props.isLast ? "fullWidth" : "middle"} />
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

ToDoTask.propTypes = {
  handleNewTask: PropTypes.func.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
  handleEnteredTask: PropTypes.func.isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  isChosen: PropTypes.bool.isRequired
};

export default ToDoTask;
