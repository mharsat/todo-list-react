import React, { Component } from "react";
import styles from "./ToDoPanel.module.scss";
import NewTaskTextbox from "../NewTaskTextbox/NewTaskTextbox";
import { Button } from "@material-ui/core";
import { ThemeContext } from "../theme-context.js";
import * as server from "../serverAPI";
import ToDoList from "../ToDoList/ToDoList";
import ToDoFooter from "../ToDoFooter/ToDoFooter";

export const tabs = Object.freeze({
  ALL: "All",
  DONE: "Done",
  TODO: "To Do"
});

class ToDoPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      tasksLeft: 0,
      currentTab: tabs.ALL
    };
  }

  async componentDidMount() {
    const tasks = await server.getTasks();
    const tasksLeft = tasks.filter(task => !task.isDone).length;
    this.setState({
      tasks,
      tasksLeft
    });
  }

  handleNewTask = async task => {
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
    server.addTask(newTask);
  };

  handleClearCheckedTasks = async _ => {
    const tasks = this.state.tasks.filter(task => !task.isDone);
    this.setState({
      tasks,
      tasksLeft: tasks.length
    });
    await server.removeCompletedTasks();
  };

  handleCheck = async (event, isChecked, index) => {
    const id = this.state.tasks[index]._id;
    const tasks = [...this.state.tasks];
    tasks[index].isDone = isChecked;
    this.setState({
      tasks,
      tasksLeft: isChecked ? this.state.tasksLeft - 1 : this.state.tasksLeft + 1
    });
    await server.updateTask(id, {
      isDone: isChecked
    });
  };

  handleDeleteTask = async index => {
    const id = this.state.tasks[index]._id;
    const tasksLeft = this.state.tasks[index].isDone
      ? this.state.tasks.length
      : this.state.tasks.length - 1;
    const tasks = this.state.tasks.filter((task, i) => i !== index);
    this.setState({
      tasks,
      tasksLeft
    });
    await server.removeTask(id);
  };

  handleEditTask = async (newTask, index) => {
    console.log(newTask);
    const id = this.state.tasks[index]._id;

    if (newTask === "") {
      this.handleDeleteTask(index);
    } else if (newTask !== this.state.tasks[index]) {
      const tasks = [...this.state.tasks];
      tasks[index].title = newTask;
      this.setState({ tasks });
      await server.updateTask(id, {
        title: newTask
      });
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
            <ToDoList
              tasks={this.state.tasks}
              currentTab={this.state.currentTab}
              onDeleteTask={this.handleDeleteTask}
              onCheck={this.handleCheck}
              onEditTask={this.handleEditTask}
            />
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

export default ToDoPanel;
