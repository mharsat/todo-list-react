import React, { useState } from "react";
import { ThemeContext, themes } from "../theme-context.js";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import styles from "./ToDoApp.module.scss";
import ToDoPanel from "../ToDoPanel/ToDoPanel";
import { Button, Icon } from "@material-ui/core";

const themeTypes = Object.freeze({
  LIGHT: "light",
  DARK: "dark"
});

const lightTheme = createMuiTheme(themes.light);
const darkTheme = createMuiTheme(themes.dark);

function ToDoApp() {
  const storedTheme = localStorage.getItem("theme");
  const [currentTheme, setCurrentTheme] = useState(
    storedTheme
      ? storedTheme === themeTypes.LIGHT
        ? themes.light
        : themes.dark
      : themes.light
  );
  const handleSwitchTheme = _ => {
    localStorage.setItem(
      "theme",
      currentTheme === themes.light ? themeTypes.DARK : themeTypes.LIGHT
    );
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <div className={styles.app}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <ThemeContext.Provider value={currentTheme}>
        <MuiThemeProvider
          theme={currentTheme === themes.light ? lightTheme : darkTheme}
        >
          <header
            className={styles.header}
            style={{ backgroundColor: currentTheme.background }}
          >
            <Button
              className={styles.themeButton}
              variant="contained"
              color={"secondary"}
              onClick={handleSwitchTheme}
            >
              Theme
              <Icon className={styles.themeIcon}>
                {currentTheme.switchThemeIcon}
              </Icon>
            </Button>
            <ToDoPanel />
          </header>
        </MuiThemeProvider>
      </ThemeContext.Provider>
    </div>
  );
}

export default ToDoApp;
