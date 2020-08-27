import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@material-ui/core/styles";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";
// eslint-disable-next-line no-extend-native
Object.defineProperty(String.prototype, "gblen", {
  get: function () {
    let len = 0;
    for (let i = 0; i < this.length; i++) {
      if (this.charCodeAt(i) > 127 || this.charCodeAt(i) === 94) {
        len += 2;
      } else {
        len++;
      }
    }

    return len;
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
