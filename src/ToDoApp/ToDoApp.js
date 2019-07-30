import React, { useState } from "react";
import { ThemeContext, themes } from "../theme-context.js";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import styles from "./ToDoApp.module.scss";
import ToDoPanel from "../ToDoPanel/ToDoPanel";
import { Button, Icon } from "@material-ui/core";
import { ErrorSnackbar } from "../ErrorSnackbar";

const themeTypes = Object.freeze({
  LIGHT: "light",
  DARK: "dark"
});

const lightTheme = createMuiTheme(themes.light);
const darkTheme = createMuiTheme(themes.dark);

function ToDoApp() {
  const storedTheme = localStorage.getItem("theme") || themes.light;
  const [currentTheme, setCurrentTheme] = useState(
    storedTheme === themeTypes.LIGHT ? themes.light : themes.dark
  );
  const [error, setError] = useState("");

  const handleSwitchTheme = () => {
    localStorage.setItem(
      "theme",
      currentTheme === themes.light ? themeTypes.DARK : themeTypes.LIGHT
    );
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  const handleShowError = newError => {
    setError(newError);
  };

  const ChangeThemeButton = () => (
    <Button
      className={styles.themeButton}
      variant="contained"
      color={"secondary"}
      onClick={handleSwitchTheme}
    >
      Theme
      <Icon className={styles.themeIcon}>{currentTheme.switchThemeIcon}</Icon>
    </Button>
  );

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
            <ChangeThemeButton />
            <ToDoPanel onShowError={handleShowError} />
            <ErrorSnackbar error={error} />
          </header>
        </MuiThemeProvider>
      </ThemeContext.Provider>
    </div>
  );
}

export default ToDoApp;
