import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./container/AppRouter";

// eslint-disable-next-line no-undef
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AppRouter />, div);
});
