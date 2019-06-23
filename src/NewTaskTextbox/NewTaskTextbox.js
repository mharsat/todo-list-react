import React from 'react';
import styles from './NewTaskTextbox.module.scss';
import TaskRow from '../TaskRow/TaskRow';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';


const NewTaskTextbox = ({ onNewTask }) => 
{
    const enterTask = (event) => {
        if (event.key === 'Enter' && event.target.value !== '') {
            onNewTask(event.target.value);
            event.target.value = '';
        }
    };
    return <div className={styles.textbox}>
        <TextField fullWidth
            label="Enter new task..."
            onKeyDown={enterTask}
            />
    </div>
};

NewTaskTextbox.propTypes = {
    onNewTask: PropTypes.func.isRequired
};

export default NewTaskTextbox;