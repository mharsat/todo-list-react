import React from 'react';

import styles from './ToDoListApp.module.scss';
import ToDoListFrame from '../ToDoListFrame/ToDoListFrame';

function ToDoListApp() {
  return (
    <div className={styles.app}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <header className={styles.header}>
        <ToDoListFrame/>
      </header>
    </div>
  );
}

export default ToDoListApp;
