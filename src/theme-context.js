import React from "react";

export const themes = {
  light: {
    background: "#e6ecf0",
    panel: "#ffffff",
    text: "#000000",
    switchThemeIcon: "brightness_3",
    clearButton: "rgb(178,34,34)",

    palette: {
      primary: {
        main: "#1DA1F2"
      },
      secondary: {
        main: "#1b3448"
      }
    },
    typography: {
      fontFamily: "Helvetica Neue"
    },
    overrides: {
      MuiFormLabel: {
        root: {
          color: "black",
          fontFamily: "Helvetica Neue",
          opacity: 0.8,
          "&$focused": {
            fontFamily: "Helvetica Neue"
          }
        },
        focused: {}
      },
      MuiInput: {
        input: {
          color: "black"
        },
        underline: {
          "&:before": {
            borderBottom: "1px solid #1DA1F2"
          },
          "&:hover:not($disabled):before": {
            borderBottom: "2px solid #1DA1F2"
          }
        }
      }
    }
  },
  dark: {
    background: "#101723",
    panel: "#1b3448",
    text: "#ffffff",
    switchThemeIcon: "wb_sunny",
    clearButton: "white",

    palette: {
      primary: {
        main: "#1DA1F2"
      },
      secondary: {
        main: "#1DA1F2"
      }
    },
    typography: {
      fontFamily: "Helvetica Neue"
    },
    overrides: {
      MuiFormLabel: {
        root: {
          color: "white",
          fontFamily: "Helvetica Neue",
          opacity: 0.8,
          "&$focused": {
            fontFamily: "Helvetica Neue",
            color: "#1DA1F2"
          }
        },
        focused: {}
      },
      MuiInput: {
        input: {
          color: "white"
        },
        underline: {
          "&:before": {
            borderBottom: "1px solid #1DA1F2"
          },
          "&:hover:not($disabled):before": {
            borderBottom: "2px solid #1DA1F2"
          }
        }
      }
    }
  }
};

export const ThemeContext = React.createContext(themes.light);
