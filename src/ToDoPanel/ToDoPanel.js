import React, { PureComponent } from "react";
import styles from "./ToDoPanel.module.scss";
import NewTaskTextbox from "../NewTaskTextbox/NewTaskTextbox";
import { Button, Fade, CircularProgress, Slide, Zoom } from "@material-ui/core";
import { ThemeContext } from "../theme-context.js";
import * as server from "../serverAPI";
import ToDoList from "../ToDoList/ToDoList";
import ToDoFooter from "../ToDoFooter/ToDoFooter";
import PropTypes from "prop-types";

export const tabs = Object.freeze({
  ALL: "All",
  DONE: "Done",
  TODO: "To Do"
});

class ToDoPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      tasksLeft: 0,
      currentTab: tabs.ALL,
      isLoading: true,
      tasksExist: false
    };
  }

  async componentDidMount() {
    const { data: tasks, error } = await server.getTasks();
    if (error) this.props.onShowError(error);
    const tasksLeft = tasks.filter(task => !task.isDone).length;
    this.setState({
      tasks,
      tasksLeft,
      isLoading: false
    });
  }

  handleNewTask = async task => {
    const [oldTasks, oldTasksLeft] = [
      [...this.state.tasks],
      this.state.tasksLeft
    ];
    const newTask = {
      title: task,
      isDone: false
    };
    const tasks = [...this.state.tasks, newTask];
    const tasksLeft = this.state.tasksLeft + 1;
    this.setState({
      tasks,
      tasksLeft
    });
    const error = await server.addTask(newTask);
    if (error) {
      this.props.onShowError(error);
      this.setState({
        tasks: oldTasks,
        tasksLeft: oldTasksLeft
      });
    }
  };

  handleClearCheckedTasks = async _ => {
    const [oldTasks, oldTasksLeft] = [
      [...this.state.tasks],
      this.state.tasksLeft
    ];
    const tasks = this.state.tasks.filter(task => !task.isDone);
    this.setState({
      tasks,
      tasksLeft: tasks.length
    });
    const error = await server.removeCompletedTasks();
    if (error) {
      this.props.onShowError(error);
      this.setState({
        tasks: oldTasks,
        tasksLeft: oldTasksLeft
      });
    }
  };

  handleCheck = async (_, isChecked, index) => {
    const id = this.state.tasks[index]._id;
    const [oldTasks, oldTasksLeft] = [
      [...this.state.tasks],
      this.state.tasksLeft
    ];
    const tasks = [...this.state.tasks];
    tasks[index].isDone = isChecked;
    this.setState({
      tasks,
      tasksLeft: isChecked ? this.state.tasksLeft - 1 : this.state.tasksLeft + 1
    });
    const error = await server.updateTask(id, { isDone: isChecked });
    if (error) {
      this.props.onShowError(`${error}: ${tasks[index].title}`);
      this.setState({
        tasks: oldTasks,
        tasksLeft: oldTasksLeft
      });
    }
  };

  handleDeleteTask = async index => {
    const id = this.state.tasks[index]._id;
    const [oldTasks, oldTasksLeft] = [
      [...this.state.tasks],
      this.state.tasksLeft
    ];
    const tasksLeft = this.state.tasks[index].isDone
      ? this.state.tasks.length
      : this.state.tasks.length - 1;
    const tasks = this.state.tasks.filter((task, i) => i !== index);
    this.setState({
      tasks,
      tasksLeft
    });
    const error = await server.removeTask(id);
    if (error) {
      this.props.onShowError(`${error}: ${tasks[index].title}`);
      this.setState({
        tasks: oldTasks,
        tasksLeft: oldTasksLeft
      });
    }
  };

  handleEditTask = async (newTask, index) => {
    const id = this.state.tasks[index]._id;
    const [oldTasks, oldTasksLeft] = [
      [...this.state.tasks],
      this.state.tasksLeft
    ];
    if (newTask === "") {
      this.handleDeleteTask(index);
    } else if (newTask !== this.state.tasks[index]) {
      const tasks = [...this.state.tasks];
      tasks[index].title = newTask;
      this.setState({ tasks });
      const error = await server.updateTask(id, { title: newTask });
      if (error) {
        this.props.onShowError(`${error}: ${tasks[index].title}`);
        this.setState({
          tasks: oldTasks,
          tasksLeft: oldTasksLeft
        });
      }
    }
  };

  generateTabButton = tab => (
    <Button
      onClick={() => this.setState({ currentTab: tab })}
      variant={this.state.currentTab === tab ? "outlined" : "text"}
      color="primary"
    >
      {tab}
    </Button>
  );

  generateFooterTabs = () => (
    <div>
      {this.generateTabButton(tabs.ALL)}
      {this.generateTabButton(tabs.DONE)}
      {this.generateTabButton(tabs.TODO)}
    </div>
  );

  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <div
            className={styles.panel}
            style={{
              backgroundColor: theme.panel
            }}
          >
            <NewTaskTextbox onNewTask={this.handleNewTask} />
            <Fade
              in={this.state.isLoading}
              onExited={_ => this.setState({ tasksExist: true })}
              unmountOnExit
            >
              <CircularProgress className={styles.loader} />
            </Fade>
            <Fade in={this.state.tasksExist} mountOnEnter>
              <ToDoList
                tasks={this.state.tasks}
                currentTab={this.state.currentTab}
                onDeleteTask={this.handleDeleteTask}
                onCheck={this.handleCheck}
                onEditTask={this.handleEditTask}
              />
            </Fade>
            <ToDoFooter
              tasksLeft={this.state.tasksLeft}
              onClearCheckedTasks={this.handleClearCheckedTasks}
              generateFooterTabs={this.generateFooterTabs}
            />
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

ToDoPanel.propTypes = {
  onShowError: PropTypes.func.isRequired
};

export default ToDoPanel;
