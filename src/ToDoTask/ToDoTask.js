import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import { BlueCheckbox } from "../BlueCheckbox";
import InputBase from "@material-ui/core/InputBase";
import { ThemeContext } from "../theme-context.js";
import styles from "./ToDoTask.module.scss";
import PropTypes from "prop-types";
import _ from "lodash";

function ToDoTask(props) {
  const renderDeleteIcon = theme => {
    if (props.isChosen)
      return (
        <Icon
          className={styles.clearIcon}
          onClick={event => props.onDeleteTask(props.index)}
          style={{
            color: theme.clearButton
          }}
        >
          clear
        </Icon>
      );
  };

  const onEditTask = _.debounce(props.onEditTask, 200);

  return (
    <ThemeContext.Consumer key={`theme-${props.task.title}_${props.index}`}>
      {theme => (
        <div key={`div-${props.task.title}_${props.index}`}>
          <ListItem
            className={styles.listItem}
            key={`${props.task.title}_${props.index}`}
            onMouseEnter={() => props.onMouseEnter(props.index)}
            onMouseLeave={() => props.onMouseLeave()}
          >
            <BlueCheckbox
              onChange={(event, isChecked) =>
                props.onCheck(event, isChecked, props.index)
              }
              checked={props.task.isDone}
            />
            <InputBase
              className={styles.inputBase}
              fullWidth
              defaultValue={props.task.title}
              onChange={event => onEditTask(event.target.value, props.index)}
              style={{
                fontSize: "x-large",
                textDecoration: props.task.isDone ? "line-through" : "none",
                color: props.task.isDone ? "gray" : theme.text
              }}
            />
            {renderDeleteIcon(theme)}
          </ListItem>
          <Divider light variant={props.isLast ? "fullWidth" : "middle"} />
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

const ToDoTaskMemo = React.memo(ToDoTask);

ToDoTask.propTypes = {
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  isChosen: PropTypes.bool.isRequired
};

export default ToDoTaskMemo;
