import React, { useState, useEffect } from 'react';
import styles from './ToDoListFrame.module.scss';
import NewTaskTextbox from '../NewTaskTextbox/NewTaskTextbox';
import TaskList from '../TaskList/TaskList';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import { TextField, FormControl, Input, InputLabel, InputBase } from '@material-ui/core';

const ToDoListFrame = () => {
    const tasksString = localStorage.getItem('tasks');
    const [tasks, setTasks] = useState(tasksString ? JSON.parse(localStorage.getItem('tasks')) : []);
    useEffect(() => localStorage.setItem('tasks', JSON.stringify(tasks)));
    const [isDone, setDone] = useState({});
    const noChosenElement = -1;
    const [chosenElement, setChosenElement] = useState(noChosenElement);

    const handleNewTask = task => {
        setTasks([...tasks, task]);
        setDone({...isDone, [task]: false});
    };

    const generateTaskItems = () => tasks.map((task, index) =>
        {
            const handleCheck = (event, isChecked) => setDone({...isDone, [task]: isChecked});
            const handleDeleteTask = () => {
                const newTasks = [...tasks];
                console.log(newTasks);
                newTasks.splice(index, 1);
                console.log(newTasks);
                setTasks(newTasks);
                console.log(newTasks);
                setDone({...isDone, [task]: false});
            };
            const handleMouseEnter = event => setChosenElement(index);
            const handleMouseLeave = event => setChosenElement(noChosenElement);
            const handleEditTask = event => {
                const newTasks = [...tasks];
                const newTask = event.target.value;
                console.log(newTask);
                if (newTask === '')
                    newTasks.splice(index, 1);
                else
                    newTasks.splice(index, 1, event.target.value);
                setTasks(newTasks);
            };
            const generateIcon = () => {
                {/* Color should be in CSS */}
                if (chosenElement === index)
                    return <Icon onClick={handleDeleteTask} style={{color: 'rgba(178,34,34,0.5)'}}>clear</Icon>
            };
            return <div key={`div-${index}`}>
                <ListItem className={styles.listItem} key={index} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <Checkbox onChange={handleCheck}/>
                    {/* <ListItemText primary={task} style={{textDecoration: isDone[task] ? 'line-through' : 'none', color: isDone[task] ? 'gray' : 'black'}}/> */}
                    <InputBase fullWidth defaultValue={task} onChange={handleEditTask} style={{textDecoration: isDone[task] ? 'line-through' : 'none', color: isDone[task] ? 'gray' : 'black'}}/>
                    {generateIcon()}
                </ListItem>
                {/* <Divider variant="inset" component="li" /> */}
            </div>
        });

    return <div className={styles.frame}>
        <NewTaskTextbox onNewTask={handleNewTask}/>
        <List className={styles.list}>
            {generateTaskItems()}
        </List>
    </div>
};

export default ToDoListFrame;