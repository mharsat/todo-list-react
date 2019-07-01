import React, { Component } from "react";
import ToDoTask from "../ToDoTask/ToDoTask";
import { tabs } from "../ToDoPanel/ToDoPanel";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";

const noChosenElement = -1;

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenElement: noChosenElement
    };
  }

  handleMouseEnter = index => this.setState({ chosenElement: index });

  handleMouseLeave = () => this.setState({ chosenElement: noChosenElement });

  generateTaskItems = () => {
    const { tasks, currentTab, ...props } = this.props;
    // eslint-disable-next-line array-callback-return
    return this.props.tasks.map((task, index) => {
      const item = (
        <ToDoTask
          key={`div-${task.title}_${index}`}
          task={task}
          index={index}
          isLast={index === tasks.length - 1}
          isChosen={this.state.chosenElement === index}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          {...props}
        />
      );

      switch (currentTab) {
        case tabs.DONE:
          if (task.isDone) return item;
          break;

        case tabs.TODO:
          if (!task.isDone) return item;
          break;

        default:
          return item;
      }
    });
  };

  render() {
    return <List>{this.generateTaskItems()}</List>;
  }
}

ToDoList.propTypes = {
  tasks: PropTypes.array.isRequired,
  currentTab: PropTypes.string.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired
};

export default ToDoList;
