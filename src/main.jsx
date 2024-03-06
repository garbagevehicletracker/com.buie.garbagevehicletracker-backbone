import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// const theme = createTheme({ /* Your theme options */ });
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}> */}
    <App />
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
